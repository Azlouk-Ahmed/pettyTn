import React, { useContext } from 'react';
import Card from 'components/card';
import Checkbox from 'components/checkbox';
import { TasksContext } from 'contexts/TasksContext';
import { Timestamp } from 'firebase/firestore';
import InviteCollaborator from './InviteCollab';

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TasksContext); // Access context values

  const handleMarkComplete = async () => {
    updateTask(task.id, { 
      isComplete: true,
      completedAt: Timestamp.now(),
    }); // Use updateTask from context
  };

  const handleDeleteTask = async () => {
    deleteTask(task.id); // Use deleteTask from context
  };

  const handleSubtaskCheck = async (subtaskName) => {
    try {
      // Update subtask completion in Firestore
      const updatedSubtasks = {
        ...task.subtasks,
        [subtaskName]: {
          ...task.subtasks[subtaskName],
          isComplete: !task.subtasks[subtaskName].isComplete, // Toggle completion
        },
      };

      await updateTask(task.id, { subtasks: updatedSubtasks }); // Update task with modified subtasks
    } catch (err) {
      console.error('Error updating subtask:', err);
    }
  };

  return (
    <Card style={{ padding: '1%', margin: '1%', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <li key={task.id} className="m-3">
        <h3 className="font-bold text-lg mb-2 mt-2">{task.title}</h3>
        <p className="text-gray-700 mb-2">{task.description}</p>
        {task.Task_exp > 0 && (
          <p className="font-medium text-gray-500">
            <b>Experience Points:</b> {task.Task_exp}
          </p>
        )}
        <p className="text-gray-500 text-sm">
          <b>Created At:</b> {task.createdAt.toDate().toLocaleString()}
        </p>
        {task.isComplete ? (
          <>
            <ul className="list-none mt-4">
              {/* Disable subtask checkboxes for completed tasks */}
              {Object.entries(task.subtasks).map(([subtaskName, subtaskObj]) => (
                <li key={subtaskName} className="flex items-center mb-2">
                  <Checkbox
                    type="checkbox"
                    id={subtaskName}
                    checked={subtaskObj.isComplete} // Always show checked for completed tasks
                    className="mr-2 h-5 w-5 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none focus:ring-primary-500 disabled:opacity-50 cursor-not-allowed" // Disable checkbox interaction
                    disabled={true} // Set checkbox as disabled
                  />
                  <label htmlFor={subtaskName} className="text-gray-700 line-through"> {/* Add line-through for completed subtasks */}
                    {subtaskName}
                  </label>
                </li>
              ))}
            </ul>
            <p className="text-green-500 text-sm mt-2">
              <b>Completed At:</b> {task.completedAt?.toDate().toLocaleString() || '-'} {/* Show CompletedAt if available */}
            </p>
          </>
        ) : (
          <>
            <InviteCollaborator taskId={task.id} />
            <ul className="list-none mt-4">
              {Object.entries(task.subtasks).map(([subtaskName, subtaskObj]) => (
                <li key={subtaskName} className="flex items-center mb-2">
                  <Checkbox
                    type="checkbox"
                    id={subtaskName}
                    checked={subtaskObj.isComplete}
                    className="mr-2 h-5 w-5 rounded focus:ring-0 focus:ring-offset-0 focus:outline-none focus:ring-primary-500"
                    onChange={() => handleSubtaskCheck(subtaskName)} // Enable for incomplete tasks
                  />
                  <label htmlFor={subtaskName} className="text-gray-700">
                    {subtaskName}
                  </label>
                </li>
              ))}
            </ul>
            <button style={{ background:"linear-gradient(90deg, rgba(56,68,244,1) 0%, rgba(56,78,244,1) 39%, rgba(184,0,255,1) 100%)", color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 16px', cursor: 'pointer', marginLeft: '56%' }}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-2" onClick={handleMarkComplete} disabled={task.isComplete}>
              Complete Task
            </button>
            <button onClick={handleDeleteTask} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </>
        )}
      </li>
    </Card>
  );
};

export default TaskCard;
