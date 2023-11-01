import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';

async function deleteTask(taskId, callback) {
  if (window.confirm('Are you sure you want to delete this task?')) {
    try {
      await axios.delete(`http://localhost:8080/task/${taskId}`);
      // You can add code here to update the UI after successful deletion.
      callback(); // Callback to refresh the task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }
}

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const userId = useParams().id; // Assuming you're using React Router for the userId
  const [loading, setLoading] = useState(true); // Add a loading state
  const [deleteStatus, setDeleteStatus] = useState(null); // State for delete status message

  useEffect(() => {
    // Fetch user's tasks from the server
    axios
      .get(`http://localhost:8080/task/usertask/${userId}`)
      .then((response) => {
        const tasksData = response.data;
        console.log('Tasks data:', tasksData); // Add this line for debugging
        setTasks(tasksData);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [userId]);

  const handleDelete = (taskId) => {
    deleteTask(taskId, () => {
      // Callback function to refresh the task list after deletion
      // You can add code here to update the UI after deletion
      setDeleteStatus('Task deleted successfully');

      
    });
  };

  

  return (
    <div>
      <h2>Tasks</h2>
      <Link to={`/tasks/create`} className="btn btn-primary">
        Create New Task
      </Link>
      {loading ? (
        <p>Loading...</p> // Display a loading message while fetching data
      ) : tasks.length > 0 ? (
        <div>
          {deleteStatus && (
            <div
              className={
                deleteStatus === 'Task deleted successfully'
                  ? 'alert alert-success'
                  : 'alert alert-danger'
              }
            >
              {deleteStatus}
            </div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                  <td>{task.category}</td>
                  <td>{task.description}</td>
                  <td>
                    <Link
                      to={`/tasks/update/${task.id}`}
                      className="btn btn-primary"
                    >
                      Update Task
                    </Link>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="btn btn-danger"
                    >
                      Delete Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
}

export default TaskList;
