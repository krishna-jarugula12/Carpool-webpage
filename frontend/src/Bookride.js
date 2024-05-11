import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Bookride.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import Menu from './Navigationbar'


const BookRide = () => {
  const [values, setValues] = useState({
    source: '',
    destination: ''
  });
  const [trackingId, setTrackingId] = useState('');
  const [rides, setRides] = useState([]);
  const [bookedRideIds, setBookedRideIds] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch booked ride IDs when the component mounts
    handleDuplicate();
  }, []);
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSearch = async () => {
    axios.post('http://localhost:8081/Bookride', values)
      .then((res) => {
        if (res.data.length > 0) {
          setRides(res.data);
        } else {
          alert("No available rides");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDuplicate = async () => {
    try {
      // Fetch booked ride IDs from the backend
      const username = localStorage.getItem('username');
      axios.post('http://localhost:8081/Book', { username })
      .then((res) => {
        setBookedRideIds(res.data);}) 
    } catch (error) {
      console.error('Error fetching booked rides:', error);
    }
  
};


const bookRide = (rideId) => {
  const rideIds = bookedRideIds && Array.isArray(bookedRideIds.rideIds) ? bookedRideIds.rideIds : [];

  // Check if the selected ride ID is already booked
  const isRideBooked = rideIds.includes(rideId.rideid);
  console.log(rideIds)
  console.log(isRideBooked)
  if (isRideBooked) {
    // If the selected ride ID is already booked, show an alert
    alert('You have already booked this ride');
  } else {
    // If the ride is not already booked, navigate to the payment page
    navigate('/Payementpage', { state: { rideId } });
  }
};

  const trackRide = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/TrackRide/${trackingId}`);
      if (res.data) {
        setRides([res.data]);
        
      } else {
        setRides([]);
        alert("No ride found with this ID");
      }
    } catch (err) {
      console.error("Error while tracking ride:", err);
    }
  };

  return (
    <div className="top-right-menu">
    <Menu />
    <div>
      <h1>Book a Ride</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Source"
          name="source"
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Enter Destination"
          name="destination"
          onChange={handleInput}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-bartrack">
        <input
          type="text"
          placeholder="Enter Ride ID to track"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button onClick={trackRide}>Track</button>
      </div>
      <div className="available-rides">
        {rides.length > 0 ? (
          rides.map((ride, index) => (
            <li key={index}>
              <p>Driver: {ride.username}</p>
              <p>Departure: {ride.departuredate}</p>
              <p>Time: {ride.departuretime}</p>
              <p>Starting Point: {ride.startingpoint}</p>
              <p>Destination: {ride.endpoint}</p>
              <p>Available Seats: {ride.vacancies}</p>
              <p>Vehicle Number: {ride.vehiclenumber}</p>
              <p>Price: {ride.fare}</p>
              <button onClick={() => bookRide(ride)}>Book</button>
            </li>
          ))
        ) : (
          <p>No rides available</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default BookRide;
