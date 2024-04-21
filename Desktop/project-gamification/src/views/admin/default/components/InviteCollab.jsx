import React, { useState, useEffect } from 'react'; // Import useEffect for user data fetching
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from 'lib/firebase';
import auth from 'lib/firebase';

const InviteCollaborator = ({taskId}) => {
  const [inviteValue, setInviteValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showForm, setShowForm] = useState(false); // State for form visibility
  const usersCollectionRef = collection(db, "Users");
  const [senderUsername, setSenderUsername] = useState(''); // State for sender username

  // Fetch current user data on component mount (assuming username is a field)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(usersCollectionRef, user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setSenderUsername(userDocSnap.data().username); // Set username from user data
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleInviteClick = () => {
    setInviteValue(''); // Clear previous invite value
    setError(''); // Clear previous errors
    setShowForm(!showForm); // Toggle form visibility on click
  };

  const checkUserExistsByUsername = async (username) => {
    const q = query(usersCollectionRef, where('username', '==', username));
    const userSnap = await getDocs(q);
    return userSnap.empty ? null : userSnap.docs[0].id; // Return invited user's id ( the document id )
  };

  const checkUserExistsById = async (userId) => {
    const userDocRef = doc(usersCollectionRef, userId);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.exists() ? userDocSnap.data() : null; // Return user data or null
  };

  const handleInviteSubmit = async (event) => {
    event.preventDefault();

    if (!inviteValue) {
      setError('Please enter a user ID or username.');
      return;
    }

    setIsLoading(true);

    try {
      let userId;

      // Check by username first
      const userByUserName = await checkUserExistsByUsername(inviteValue);

      if (userByUserName) {
        userId = userByUserName; // Use ID from username check if found
      } else {
        // Check by ID if username check fails
        const userById = await checkUserExistsById(inviteValue);
        userId = userById ? inviteValue : null; // Set userId based on ID check
      }

      if (!userId) {
        throw new Error('User does not exist.');
      }

      // Check if inviting yourself
      if (userId === auth.currentUser?.uid) {
        throw new Error('You cannot invite yourself.');
      }

      // Check for existing invitations
      const notificationsRef = collection(db, 'Notifications');
      const q = query(
        notificationsRef,
        where('taskId', '==', taskId),
        where('receiver', '==', userId)
      );
      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        throw new Error('User already invited for this task.');
      }

      // Invitation logic for existing user (excluding existing collaborators)
      await addDoc(notificationsRef, {
        sender: auth.currentUser?.uid,
        senderUsername, // Use senderUsername from state
        receiver: userId,
        taskId,
      });

      setInviteValue(''); // Clear input field
      setError('Invitation Sent!'); // Display success message
    } catch (error) {
      setError(error.message); // Display specific error messages
    } finally {
      setIsLoading(false); // Ensure loading state is cleared
    }
  };

  return (
    <div className="mt-4">
  <button className="btn-sm    font-bold py-2 px-4 rounded" onClick={handleInviteClick} disabled={isLoading}>
    {isLoading ? 'Checking...' : 'Invite Collaborator'}
  </button>
  {showForm && (
    <form onSubmit={handleInviteSubmit} className="mt-4">
      <div className="flex items-center mb-2">
        <label htmlFor="inviteValue" style={{fontSize: "15px",fontWeight: 'bold'}} className="mr-2 bold">User ID or Username</label>
        <input
          type="text"
          id="inviteValue"
          value={inviteValue}
          onChange={(e) => setInviteValue(e.target.value)}
          style={{width: "56%"}}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        />
        <button type="submit" className="btn-primary w-[15%] bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2" disabled={isLoading}>
          {isLoading ? 'Checking...' : 'Invite'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  )}
</div>

  );
};

export default InviteCollaborator;
