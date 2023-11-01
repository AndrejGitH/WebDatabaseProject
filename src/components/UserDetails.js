import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/restuser/${id}`)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-8 mx-auto">
          <div className="card">
            <div className="card-header bg-primary text-white">
              User Details
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">ID</th>
                    <td>{user.id}</td>
                  </tr>
                  <tr>
                    <th scope="row">Nickname</th>
                    <td>{user.nickname}</td>
                  </tr>
                  <tr>
                    <th scope="row">Name</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Surname</th>
                    <td>{user.surname}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th scope="row">Age</th>
                    <td>{user.age}</td>
                    <tr>
                    <th scope="row">Password</th>
                    <td>{user.password}</td>
                  </tr>
                  </tr>
                  {/* Include other user details here */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
