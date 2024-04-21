import React, { useState} from 'react';
import Card from 'components/card';
import auth from 'lib/firebase';
import { Timestamp,collection,addDoc } from 'firebase/firestore';
import { db } from 'lib/firebase';


const TaskComponent = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    exp_to_gain: 1,
    isComplete: false,
    subtasks: {}, // Map to store subtasks with completion state
    createdBy: auth.currentUser?.uid,
    createdAt: Timestamp.now(), // Use Firebase v9 Timestamp
    isCollab: false,
    collaborators: [auth.currentUser?.uid],
  });

  const [newSubtask, setNewSubtask] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setTaskData({
      ...taskData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return; // Ignore empty subtasks

    setTaskData({
      ...taskData,
      subtasks: {
        ...taskData.subtasks,
        [newSubtask]: { name: newSubtask, isComplete: false }, // Add subtask with initial false
      },
    });
    setNewSubtask(''); // Clear input after adding
  };

  const toggleSubtaskCompletion = (subtaskName) => {
    setTaskData({
      ...taskData,
      subtasks: {
        ...taskData.subtasks,
        [subtaskName]: {
          ...taskData.subtasks[subtaskName],
          isComplete: !taskData.subtasks[subtaskName].isComplete,
        },
      },
    });
  };

  const handleCreateTask = async () => {
    if (!taskData.title.trim()) {
      alert('Please enter a task title.');
      return;
    }

    const newTask = {
      title: taskData.title,
      description: taskData.description,
      exp_to_gain: taskData.exp_to_gain,
      isComplete: taskData.isComplete,
      subtasks: Object.fromEntries( // Convert map to object for Firestore
        Object.entries(taskData.subtasks).map(([subtaskName, subtaskObj]) => [
          subtaskName,
          subtaskObj,
        ])
      ),
      createdBy: auth.currentUser?.uid,
      createdAt: Timestamp.now(),
      isCollab: false,
      collaborators: [auth.currentUser?.uid],
    };

    try {
      const tasksRef = collection(db, 'Tasks');
      const taskDocRef = await addDoc(tasksRef, newTask); // Add task and get document reference
      newTask.id = taskDocRef.id; // Assign auto-generated ID to task object

      console.log('Task created successfully! ID:', newTask.id);

      // Clear form fields and set newTask with ID (optional for form reset or state management)
      setTaskData({
        title: '',
        description: '',
        exp_to_gain: 1,
        isComplete: false,
        subtasks: {},
        createdBy: auth.currentUser?.uid,
        createdAt: Timestamp.now(),
        isCollab: false,
        collaborators: [auth.currentUser?.uid],
      });

      setNewSubtask('');
    } catch (err) {
      console.error('Error creating task:', err);
      alert('An error occurred while creating the task. Please try again.');
    }
  };


  return (
    <Card style={{marginTop: '2%', padding: '2%', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',width:'45%', margin: '0 auto' }}>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
  <h1 style={{ fontSize: '24px', fontWeight: 'bold',   color: '#1b254b', borderBottom: '2px solid #ccc', paddingBottom: '5px' }}>Add Task</h1>
</div>
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
      <label htmlFor="taskTitle" style={{ marginBottom: '5px' }}>
        Title
      </label>
      <input
        type="text"
        id="taskTitle"
        value={taskData.title}
        onChange={handleChange}
        placeholder="Enter task title"
        name="title"
        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', width: '100%' }}
      />
    </div>
  
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
      <label htmlFor="taskDescription" style={{ marginBottom: '5px' }}>
        Description (optional)
      </label>
      <textarea
        id="taskDescription"
        value={taskData.description}
        onChange={handleChange}
        placeholder="Enter task description"
        name="description"
        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', width: '100%' }}
      />
    </div>
  
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
      <label htmlFor="expToGain" style={{ marginBottom: '5px' }}>
        Experience Points
      </label>
      <input
        type="number"
        id="expToGain"
        value={taskData.exp_to_gain}
        onChange={handleChange}
        placeholder="Enter experience points to gain"
        name="exp_to_gain"
        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', width: '100%' }}
      />
    </div>
    <label htmlFor="newSubtask" style={{ marginRight: '10px' }}>
        Subtask
      </label>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
     
      <input
        type="text"
        id="newSubtask"
        value={newSubtask}
        onChange={(e) => setNewSubtask(e.target.value)}
        placeholder="Enter subtask"
        name="newSubtask"
        style={{ flex: '1', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px', }}
      />
      <button style={{ background:"linear-gradient(90deg, rgba(56,68,244,1) 0%, rgba(56,78,244,1) 39%, rgba(184,0,255,1) 100%)", color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 16px', cursor: 'pointer' }} onClick={handleAddSubtask}>Add Subtask</button>
    </div>
  
    
    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
      {Object.entries(taskData.subtasks).map(([subtaskName, subtaskObj]) => (
        <li key={subtaskName} style={{ marginBottom: '5px' }}>
          <input
            type="checkbox"
            id={subtaskName}
            checked={subtaskObj.iscomplete}
            onChange={() => toggleSubtaskCompletion(subtaskName)}
          />
          <label htmlFor={subtaskName}>{subtaskName}</label>
        </li>
      ))}
    </ul>
  
    <button type="button" onClick={handleCreateTask} style={{ background:"linear-gradient(90deg, rgba(56,68,244,1) 0%, rgba(56,78,244,1) 39%, rgba(184,0,255,1) 100%)", color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', marginTop: '10px', cursor: 'pointer' }}>
      Create Task
    </button>
  </Card>
  );
};

export default TaskComponent;