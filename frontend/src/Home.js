import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Menu from './Navigationbar'; // Import the Menu component

function Home() {
    return (
        <div className="top-right-menu">
                <Menu />
        <div className="container">
           \
            <div className='container2'>
            </div>
            <div className="container1">
                <Link to="/Registerride" className="button">Registerride</Link>
                <Link to="/Bookride" className="button">Book Ride</Link>
            </div>
        </div>
        </div>
    );
}

export default Home;
