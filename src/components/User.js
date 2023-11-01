import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './Users.css';

function User() {
  const [users, setUsers] = useState([]);
  const { id } = useParams(); // Extract 'id' from the route parameters

  useEffect(() => {
    axios
      .get('http://localhost:8080/restuser')
      .then((res) => {
        const usersData = res.data;
        setUsers(usersData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // Delete the user using axios
        await axios.delete(`http://localhost:8080/restuser/${userId}`);

        // User deleted successfully, update the UI as needed
        console.log('User deleted successfully');

        // Refresh the user list
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="user-container">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h4 className="text-center">User List</h4>
                <table className="table table-striped table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nickname</th>
                      <th scope="col">Name</th>
                      <th scope="col">Surname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Age</th>
                      <th scope="col">Password</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <Link to={`/user/${user.id}`}>{user.id}</Link>
                        </td>
                        <td>{user.nickname}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.password}</td>
                        <td>
                          <Link
                            to={`/user/${user.id}/usertasks`}
                            className="btn btn-sm btn-warning mr-2"
                          >
                            Tasks
                          </Link>
                          <Link
                            to={`/user/${user.id}/edit`}
                            className="btn btn-sm btn-primary mr-2"
                          >
                            Edit User
                          </Link>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete User
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-left">
                  <Link to="/user/create" className="btn btn-sm btn-primary">
                    Create new user
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
