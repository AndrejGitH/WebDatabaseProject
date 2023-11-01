import React, { useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo.png';

function Navbar() {
  const [click, setClick] = useState(false);
  const location = useLocation();
  const closeMobileMenu = () => setClick(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-brand' onClick={closeMobileMenu}>
            <img
              src={Logo} 
              alt='Logo'
              width='90'
              height='80'
              className='d-inline-block align-top navbar-logo-img'
            />
          </Link>

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fa fa-times' : 'fa fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/users' className='nav-links' onClick={closeMobileMenu}>
                Users
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
