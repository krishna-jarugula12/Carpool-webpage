import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './YourRides.css'; // Import the CSS file

function YourRides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchBookedRides();
  }, []);

  const fetchBookedRides = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await axios.post('http://localhost:8081/Yourride', { username });
      setRides(response.data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  return (
    <div className="your-rides-container">
      <h2>Your Rides</h2>
      <div className="rides-list">
        {rides.length > 0 ? (
          rides.map((ride, index) => (
            <div key={index} className="ride-details">
              <div className="ride-info">
                <p>Ride ID: {ride.rideid}</p>
                <p>Departure: {new Date(ride.departuredate).toLocaleDateString()}</p>
                <p>Departure Time: {ride.departure_time}</p>
                <p>Starting Point: {ride.starting_point}</p>
                <p>Ending Point: {ride.ending_point}</p>
                <p>Driver Username: {ride.username}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No rides booked</p>
        )}
      </div>
    </div>
  );
}

export default YourRides;
