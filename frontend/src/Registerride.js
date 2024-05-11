import React, { useState } from 'react';
import './Registerride.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Menu from './Navigationbar'

function RegistrationForm() {
  const username1=localStorage.getItem('username');
  const [formData, setFormData] = useState({
    Username: username1,
    name: '',
    mobileNumber: '',
    startPoint: '',
    endPoint: '',
    departureDate: '',
    departureTime: '',
    vacancies: null,
    fare: null,
    vehicleNumber: '' // Added vehicleNumber field
  });
  const [bookingStatus, setBookingStatus] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const submitBookingRequest = (event) => {
    try {
      console.log(formData);
      axios.post('http://localhost:8081/Registerride', formData)
        .then(res => {
          if (res.data.success) {
            alert("Registered successfully");
            navigate('/home'); // Redirect to home page on successful login
          } else {
            alert("PLEASE DO YOUR KYC!!!"); // Alert user if login fails
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.error('Error submitting booking request:', error);
      setBookingStatus('error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitBookingRequest();
  };

  return (
    <div className="top-right-menu">
    <Menu />
    <div className='container3'>
      <div>
        <h2>Booking Form</h2>
        <form onSubmit={handleSubmit}>
       
          <div className='form-group'>
            <label>Name :</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Mobile Number  :</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Starting Point :</label>
            <input
              type="text"
              name="startPoint"
              value={formData.startPoint}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Ending Point :</label>
            <input
              type="text"
              name="endPoint"
              value={formData.endPoint}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Departure Date :</label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Departure Time :</label>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Vacancies : </label>
            <input
              type="number"
              name="vacancies"
              value={formData.vacancies}
              onChange={handleChange}
              required
              min="1"
              max="99"
              pattern="[0-9]*"
              onkeypress={(e) => e.preventDefault()}
            />
          </div>
          <div className='form-group'>
            <label>Fare For Trip  :</label>
            <input
              type="number"
              name="fare"
              value={formData.fare}
              onChange={handleChange}
              pattern="[0-9]*"
              required
            />
          </div>
          <div className='form-group'>
            <label>Vehicle Number  :</label> {/* New field for vehicle number */}
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className='submit-button'>
            <button type="submit">Book Ride</button>
          </div>
        </form>
        {bookingStatus === 'success' && <p>Booking request submitted successfully!</p>}
        {bookingStatus === 'error' && <p>Error submitting booking request. Please try again later.</p>}
      </div>
    </div>
    </div>
  );
}

export default RegistrationForm;
