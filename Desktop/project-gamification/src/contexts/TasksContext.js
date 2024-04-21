import React, { createContext, useState, useEffect , useContext } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from 'lib/firebase';

const TasksContext = createContext({
  tasks: [],
  setTasks: () => {},
  createTask: () => {},
  getTasks: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  currentTask: null, // Add currentTask state
  setCurrentTask: () => {}, // Add setCurrentTask function
});
export const useTasks = () => useContext(TasksContext);


const tasksCollectionRef = collection(db, "Tasks");
const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null); // Initialize currentTask state


  useEffect(() => {
    const unsubscribe = onSnapshot(tasksCollectionRef, (querySnapshot) => {
      const newTasks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(newTasks);
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe on unmount
  }, []);

  // CRUD functions

  const createTask = async (task) => {
    try {
      if (!task.createdBy) {
        throw new Error('Missing createdBy field in task data.');
      }
      task.exp_to_gain = Number(task.exp_to_gain) || 0;
      await addDoc(tasksCollectionRef, task);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const getTasks = async (filterField, filterValue) => { // Added filter functionality
    try {
      const tasksCollectionRef = collection(db, "Tasks");
      let querySnapshot;

      if (filterField && filterValue) {
        const q = query(tasksCollectionRef, where(filterField, '==', filterValue));
        querySnapshot = await getDocs(q);
      } else {
        querySnapshot = await getDocs(tasksCollectionRef);
      }

      const newTasks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(newTasks);
    } catch (err) {
      console.error("Error getting tasks:", err);
      return []; // Return empty array on error
    }
  };

  const updateTask = async (taskId, updatedFields) => {
    try {
      const taskDocRef = doc(tasksCollectionRef, taskId);
      await updateDoc(taskDocRef, updatedFields);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const taskDocRef = doc(tasksCollectionRef, taskId);
      await deleteDoc(taskDocRef);
      console.log("deleted")
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, setTasks, createTask, getTasks, updateTask, deleteTask ,currentTask , setCurrentTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };
