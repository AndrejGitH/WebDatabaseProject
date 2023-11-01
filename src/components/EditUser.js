import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nickname: '',
    name: '',
    surname: '',
    email: '',
    age: 0,
    password: '',
  });
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/restuser/${id}`)
      .then((res) => {
        const userData = res.data;
        setUser(userData);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  const handleUpdateUser = async () => {
    try {
      await axios.patch(`http://localhost:8080/restuser/${id}`, user);
      setUpdateStatus('User updated successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <h2>Edit User</h2>
      {updateStatus && (
        <div
          className={
            updateStatus === 'User updated successfully'
              ? 'alert alert-success'
              : 'alert alert-danger'
          }
        >
          {updateStatus}
        </div>
      )}
      <form>
        <div className="form-group row">
          <label htmlFor="nickname" className="col-sm-1 col-form-label">Nickname:</label>
          <div className="col-sm-3">
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={user.nickname}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-1 col-form-label">Name:</label>
          <div className="col-sm-3">
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="surname" className="col-sm-1 col-form-label">Surname:</label>
          <div className="col-sm-3">
            <input
              type="text"
              id="surname"
              name="surname"
              value={user.surname}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-sm-1 col-form-label">Email:</label>
          <div className="col-sm-3">
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="age" className="col-sm-1 col-form-label">Age:</label>
          <div className="col-sm-3">
            <input
              type="number"
              id="age"
              name="age"
              value={user.age}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-sm-1 col-form-label">Password:</label>
          <div className="col-sm-3">
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10 offset-sm-1">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateUser}
            >
              Update User
            </button>
            <Link to={`/user/${id}`} className="btn btn-secondary ml-2">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
  
  
}

export default EditUser;
