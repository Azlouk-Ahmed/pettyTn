import React, { createContext, useState, useEffect, useContext } from 'react';
import { GlobalContext } from 'contexts/GlobalContext';
import { getDoc, doc, updateDoc} from "firebase/firestore"; // Import Firestore functions
import { db } from 'lib/firebase';
import auth from 'lib/firebase';

// Contexte pour les données et les fonctions du système de points
export const PointsContext = createContext({
  totalPoints: 0,
  expToNextLevel: 100,
  level: 1,
  setTotalPoints: () => {},

});

export const usePoints = () => useContext(PointsContext);

export const PointsProvider = ({ children }) => {
  const { user } = useContext(GlobalContext);
  const [totalPoints, setTotalPoints] = useState(user ? user.experience : 0);
  const [expToNextLevel, setExpToNextLevel] = useState(user ? user.req_experience : 100);
  const [level, setLevel] = useState(user ? user.level : 1);
  
  

  useEffect(() => {
    if (user) {
      setTotalPoints(user.experience);
      setExpToNextLevel(user.req_experience);
      setLevel(user.level);
    }
  }, [user]);

const updatePoints = async (collaborators, pointsToAdd) => {
  try {
    // Iterate over each collaborator (including the current user)
    collaborators.forEach(async (collaboratorId) => {
      const userDocRef = doc(db, 'Users', collaboratorId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userPoints = userData.experience ;
        let newTotalPoints = userPoints + pointsToAdd;
        let newExpToNextLevel = userData.req_experience;
        let newLevel = userData.level || 1;

        // Update level and experience to next level (if needed)
        if (newTotalPoints >= newExpToNextLevel) {
          newTotalPoints -= newExpToNextLevel;
          newExpToNextLevel += 100;
          newLevel++;
        }

        // Update Firestore document
        await updateDoc(userDocRef, {
          experience: newTotalPoints,
          req_experience: newExpToNextLevel,
          level: newLevel,
        });

       // Ensure that local state is updated only for the current user who triggered the action
       if (collaboratorId === auth.currentUser?.uid) {
        setTotalPoints(newTotalPoints);
        setExpToNextLevel(newExpToNextLevel);
        setLevel(newLevel);
      }
      }
    });
  } catch (error) {
    console.error('Error updating points for all users:', error);
  }
};


  const value = {
    totalPoints,
    setTotalPoints ,
    expToNextLevel,
    level,
    updatePoints,
  };

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
};
