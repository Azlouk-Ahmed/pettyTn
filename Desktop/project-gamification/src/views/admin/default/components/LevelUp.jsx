import React, { useState, useEffect, useContext } from 'react';
import { PointsContext } from './PointsContext.jsx';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LevelUp = () => {
  const { /*totalPoints, expToNextLevel, */level } = useContext(PointsContext);
    const [alertShown, setAlertShown] = useState(false);


  // Function to trigger the alert (assuming level up logic is in PointsContext)
  const triggerAlert = (level) => {
    toast.success(`Congratulations! You have reached level ${level}!`, {
      position: 'bottom-center',
      autoClose: 6000,
    });
  };

  useEffect(() => {
    const storedLevel = localStorage.getItem('currentLevel');
    const parsedLevel = storedLevel ? parseInt(storedLevel, 10) : 1; // Default to 1

    // Check if level has increased compared to stored level
    if (level > parsedLevel) {
      triggerAlert(level);
      // Update stored level for next session (optional)
      localStorage.setItem('currentLevel', level);
      console.log('Level increased:', level);
    }

    // Dependency array: Only run when level or PointsContext changes
  }, [level, PointsContext]);

  return (
    <div className="flex  items-center">
      <ToastContainer />
      <p className="text-sm font-medium mr-4 w-88">Level: {level}</p>
    </div>


);
};

export default LevelUp;
