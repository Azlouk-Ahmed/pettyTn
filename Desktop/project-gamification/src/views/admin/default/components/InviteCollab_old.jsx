import React, { useState, useContext } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore'; // Import v9 functions
import { db } from 'lib/firebase'; // Assuming database reference
import { GlobalContext } from 'contexts/GlobalContext'; // Assuming GlobalContext path

const InviteCollaboratore = ({ taskId, onInviteSuccess }) => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showForm, setShowForm] = useState(false); // State for form visibility
  const { checkUserExists } = useContext(GlobalContext);

  const handleInviteClick = () => {
    setUserId(''); // Clear previous user ID
    setError(''); // Clear previous errors
    setShowForm(!showForm); // Toggle form visibility on click
  };

  const handleInviteSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      setError('Please enter a user ID.');
      return;
    }

    setIsLoading(true);

    try {
      // Check user existence
      const userExists = await checkUserExists(userId);
      setIsLoading(false); // Clear loading state after check

      if (!userExists) {
        throw new Error('User does not exist.');
      }

      // Get the task document data
      const taskRef = doc(db, 'Tasks', taskId);
      const taskSnap = await getDoc(taskRef);

      if (!taskSnap.exists) {
        throw new Error('Task document does not exist.'); // Handle non-existent task
      }

      const taskData = taskSnap.data();

      // Check if user ID is already in collaborators list
      if (taskData.collaborators && taskData.collaborators.includes(userId)) {
        throw new Error('User already invited.'); // Throw custom error
      }

      // Invitation logic for existing user (excluding existing collaborators)
      await updateDoc(taskRef, {
        collaborators: [...(taskData.collaborators || []), userId],
        isCollab: true, // Set isCollab to true on invite
      });

      setUserId(''); // Clear input field
      setError('Invitation Successful!'); // Display success message
      onInviteSuccess?.(); // Optional callback if provided
    } catch (error) {
      setError(error.message); // Display specific error messages
    } finally {
      setIsLoading(false); // Ensure loading state is cleared
    }
  };

  return (
    <div className="mt-4">
      <button className="btn-sm" onClick={handleInviteClick} disabled={isLoading}>
        {isLoading ? 'Checking...' : 'Invite Collaborator'}
      </button>
      {showForm && (
      <form onSubmit={handleInviteSubmit}>
        <div className="flex items-center mb-2">
          <label htmlFor="userId" className="mr-2 text-sm">
            User ID:
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
          <button type="submit" className="btn-primary ml-2" disabled={isLoading}>
            {isLoading ? 'Checking...' : 'Invite'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      )}
    </div>
  );
};

export default InviteCollaboratore;
