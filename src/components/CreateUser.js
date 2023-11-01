import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [user, setUser] = useState({
    nickname: '',
    name: '',
    surname: '',
    email: '',
    age: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create the user
      const response = await axios.post('http://localhost:8080/restuser', user);

      // Handle successful creation
      setSuccessMessage('User created successfully');

      // Clear the form fields by resetting the user object
      setUser({
        nickname: '',
        name: '',
        surname: '',
        email: '',
        age: '',
        password: '',
      });
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div>
      <h2>Create New User</h2>
      {successMessage && <p className="text-success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="nickname" className="col-sm-1 col-form-label">
            Nickname:
          </label>
          <div className="col-sm-2">
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={user.nickname}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-1 col-form-label">
            Name:
          </label>
          <div className="col-sm-2">
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="surname" className="col-sm-1 col-form-label">
            Surname:
          </label>
          <div className="col-sm-2">
            <input
              type="text"
              id="surname"
              name="surname"
              value={user.surname}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-sm-1 col-form-label">
            Email:
          </label>
          <div className="col-sm-2">
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="age" className="col-sm-1 col-form-label">
            Age:
          </label>
          <div className="col-sm-2">
            <input
              type="number"
              id="age"
              name="age"
              value={user.age}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-sm-1 col-form-label">
            Password:
          </label>
          <div className="col-sm-2">
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-1 offset-sm-1">
            <button type="submit" className="btn btn-primary">
              Create User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;