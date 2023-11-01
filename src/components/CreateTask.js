import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const [task, setTask] = useState({
    name: '',
    status: 0,
    category: '',
    description: '',
    userId: 0, // Add userId
    id: null, // Add id if needed
  });

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert 'userId' and 'status' to numbers if they are not empty strings
    const parsedValue = name === 'userId' || name === 'status' ? parseInt(value, 10) : value;

    setTask({ ...task, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send a POST request to create the task
      const response = await axios.post('http://localhost:8080/task', task);
  
      if (response.status >= 200 && response.status < 300) {
        // Task created successfully
        setSuccessMessage('Task created successfully');
        setErrorMessage('');
        
        setTask({
        name: '',
        status: 0,
        category: '',
        description: '',
        userId: 0, // Add userId
        id: null, // Add id if needed
      });
      } else {
        // Handle other status codes (e.g., non-2xx) as errors
        setErrorMessage('Error creating task. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error creating task:', error);
  
      // Set the error message and clear the success message
      setErrorMessage('Error creating task. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Create New Task</h2>
      {successMessage && (
        <p className="text-success">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-danger">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-1 col-form-label">
            Name:
          </label>
          <div className="col-sm-2">
            <input
              type="text"
              id="name"
              name="name"
              value={task.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="status" className="col-sm-1 col-form-label">
            Status:
          </label>
          <div className="col-sm-2">
            <input
              type="number"
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="category" className="col-sm-1 col-form-label">
            Category:
          </label>
          <div className="col-sm-2">
            <input
              type="text"
              id="category"
              name="category"
              value={task.category}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="description" className="col-sm-1 col-form-label">
            Description:
          </label>
          <div className="col-sm-2">
            <input
              type="text"
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="userId" className="col-sm-1 col-form-label">
            User ID:
          </label>
          <div className="col-sm-2">
            <input
              type="number"
              id="userId"
              name="userId"
              value={task.userId}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          {/* Add any other fields as needed */}
        </div>
        <div className="form-group row">
          <div className="col-sm-1 offset-sm-1">
            <button type="submit" className="btn btn-primary">
              Create Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
