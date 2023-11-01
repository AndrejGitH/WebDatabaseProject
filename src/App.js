
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'; 
import About from './components/About';
import User from './components/User';
import UserDetails from './components/UserDetails';
import CreateUser from './components/CreateUser';
import TaskList from './components/TaskList';
import UpdateTask from './components/UpdateTask';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTask from './components/CreateTask';
import EditUser from './components/EditUser';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Add this route for the Home component */}
        <Route path="/users" element={<User />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/tasks/update/:taskId" element={<UpdateTask />} />
        <Route path="/user/:id/usertasks" element={<TaskList />} />
        <Route path="/tasks/create" element={<CreateTask />} />
        <Route path="/user/:id/edit" element={<EditUser />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

