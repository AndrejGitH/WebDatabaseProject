import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'; // Import your CSS file for styling

function About() {
  return (
    <div className="about-container">
      <div className="about-text">
        <h1>Database project</h1>
        <p>
          The backend of the application was developed using Java with Spring Boot, while all data is stored in a MySQL database connected to the Java backend. The frontend was built using React.
          When you navigate to the Users page, you can explore the entire user database. From there, you have complete control over your database, allowing you to perform CRUD (Create, Read, Update, Delete) operations.
          The primary focus is on the user database, where each user has specific attributes and assigned tasks. You can manage all these parameters through the web interface.
        </p>
      </div>
      <div className="explore-button">
        <Link to="/Users">
          <button className="btn btn-primary">Explore</button>
        </Link>
      </div>
    </div>
  );
}

export default About;