import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Navigationbar.css';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    try {
      // Clear local storage
      localStorage.clear();
      // Redirect to login page
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
 

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={toggleMenu}><span className="hamburger">&#9776;</span></button>
      {isOpen && (
        <div className="dropdown-menu">
          <Link to="/Profile">Profile</Link>
          <Link to="/Yourrides">Your Rides</Link> {/* New link */}
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Menu;
