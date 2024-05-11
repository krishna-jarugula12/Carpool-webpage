import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';


function Payementpage() {
    const location = useLocation();
    const ride = location.state.rideId;
    console.log(ride);
    const  usermail=localStorage.getItem('username');
    const navigate = useNavigate();

    const sendEmail =  async () => {
      try {
        await axios.post('http://localhost:8081/Payementpage', { usermail, ride })
        .then(res=>{
          console.log(res.data.success);
          if(res.data.success){
            navigate('/Home');
          }
        })
        

        
        console.log('Email sent successfully!');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };
  return (
    <div className='container3'>
    <h2>Payement Page:</h2>
    <button onClick={sendEmail}>paynow</button>

    <p>check email for details of the ride</p>
    </div>
  
  )
};
export default Payementpage;