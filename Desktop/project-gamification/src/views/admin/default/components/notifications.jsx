import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'; // Import v9 functions
import { db } from 'lib/firebase'; // Assuming database reference
import auth from 'lib/firebase'; // Assuming auth provider
import { default as Dropdown } from "components/dropdown"; // Assuming Dropdown component import
import { BsArrowBarUp } from "react-icons/bs"; // Assuming react-icons imports
import { IoMdNotificationsOutline } from 'react-icons/io';
import { arrayUnion } from 'firebase/firestore';
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [Error, setError] = useState(null);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'Notifications'), where('receiver', '==', auth.currentUser?.uid)),
      (querySnapshot) => {
        const notificationData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationData);
        setIsLoading(false);
      }
    );

    return unsubscribe; 
  }, []);

  const handleAcceptInvitation = async (notificationId) => {
    setIsLoading(true); 

    try {
      const notificationDocRef = doc(collection(db, 'Notifications'), notificationId);
      const notificationDocSnap = await getDoc(notificationDocRef);
      const notificationData = notificationDocSnap.data();
      if (!notificationData) {
        throw new Error('Notification not found.'); 
      }

      const { taskId, receiver } = notificationData;

      if (receiver !== auth.currentUser?.uid) {
        throw new Error('You cannot accept an invitation for another user.');
      }

      // Update task document directly (assuming a "Collaborators" array exists)
      const taskDocRef = doc(collection(db, 'Tasks'), taskId);
      await updateDoc(taskDocRef, {
        isCollab: true, // Set collaboration flag (if applicable)
        collaborators: arrayUnion(auth.currentUser?.uid), // Use arrayUnion for adding to array
      });

      // Optionally, delete the notification after successful acceptance
      await deleteDoc(notificationDocRef);
      setNotifications(notifications.filter((notification) => notification.id !== notificationId)); // Update local state
      setError('Invitation Accepted!'); // Display success message (optional)
    } catch (error) {
      setError(error.message); // Display error message (optional)
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  const handleDeclineInvitation = async (notificationId) => {
    setIsLoading(true); // Show loading state

    try {
      await deleteDoc(doc(collection(db, 'Notifications'), notificationId));
      setNotifications(notifications.filter((notification) => notification.id !== notificationId)); // Update local state
      setError('Invitation Declined!'); // Display success message (optional)
    } catch (error) {
      setError(error.message); // Display error message (optional)
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <Dropdown
      button={
        <p className="cursor-pointer">
          <IoMdNotificationsOutline className="h-4 w-4 text-gray-600 dark:text-white" />
        </p>
      }
      animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
      children={
        <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-navy-700 dark:text-white">
              Notification
            </p>
          </div>
          {isLoading ? (
            <p className="text-center text-gray-500">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-500">No notifications yet.</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between">
                <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                  <BsArrowBarUp />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                  <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                    New Invite from {notification.senderUsername} !
                  </p>
                  <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                    Click to accept or decline invite
                  </p>
                  <div className="flex justify-between mt-2">
                    <button
                      className="btn-primary text-xs py-1 px-2 rounded"
                      onClick={() => handleAcceptInvitation(notification.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn-outline text-xs py-1 px-2 rounded"
                      onClick={() => handleDeclineInvitation(notification.id)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      }
          classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
        />)}
export default Notification