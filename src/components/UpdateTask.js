import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateTask() {
  const { taskId, id } = useParams();
  const userIdAsInt = parseInt(id, 10);
  console.log('taskId:', taskId);
  console.log('id:', id);
  console.log('userIdAsInt:', userIdAsInt);
  const [task, setTask] = useState({
    name: '',
    status: 0,
    category: '',
    description: '',
  });
  const [updateStatus, setUpdateStatus] = useState(null); // State for update status
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the task data for editing
    axios
      .get(`http://localhost:8080/task/${taskId}`)
      .then((response) => {
        const taskData = response.data;
        setTask(taskData);
      })
      .catch((error) => {
        console.error('Error fetching task:', error);
      });
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        // Send a PATCH request to update the task
        await axios.patch(`http://localhost:8080/task/${taskId}`, task);
    
        // Set the update status to display a success message
        setUpdateStatus('Task updated');

        setTask({
          name: '',
          status: 0,
          category: '',
          description: '',
          
        });
    
        
      } catch (error) {
        console.error('Error updating task:', error);
        // Set the update status to display an error message
        setUpdateStatus('Error updating task');
      }
    };
    
  return (
    <div>
      <h2>Edit Task</h2>
      {updateStatus && (
        <div className={updateStatus === 'Task updated' ? 'alert alert-success' : 'alert alert-danger'}>
          {updateStatus}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-1 col-form-label">
            Name:
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={task.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="status" className="col-sm-1 col-form-label">
            Status:
          </label>
          <div className="col-sm-5">
            <input
              type="number"
              className="form-control"
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="category" className="col-sm-1 col-form-label">
            Category:
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={task.category}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="description" className="col-sm-1 col-form-label">
            Description:
          </label>
          <div className="col-sm-5">
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10 offset-sm-3">
            <button type="submit" className="btn btn-primary">
              Update Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateTask;
