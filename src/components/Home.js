import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Home.css'; // Import your CSS file

function Home() {
  return (
    <div className="home-container">
      <Link to="/about">
        <button className="btn btn-primary">Learn More</button>
      </Link>
    </div>
  );
}

export default Home;