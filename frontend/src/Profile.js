import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch profile data when the component mounts
    fetchProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProfile = async () => {
    try {
      // Get username from local storage
      const username = localStorage.getItem('username');
      console.log(username);
        axios.post('http://localhost:8081/Profile',{username})
        .then((res) => {
            console.log(res.data);
            if (res.data) {
                setProfile(res.data);
            } else {
              alert("Profile error");
            }
          })
          .catch((err) => console.log(err));
      // Set the profile state with the fetched data
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-info">
        <div className="info-item">
          <span className="label">ID No:</span>
          <span>{profile.id}</span>
        </div>
        <div className="info-item">
          <span className="label">Name:</span>
          <span>{profile.name}</span>
        </div>
        <div className="info-item">
          <span className="label">Email:</span>
          <span>{profile.email}</span>
        </div>
        <div className="info-item">
          <span className="label">KYC Status:</span>
          <span className={profile.kycStatus ? 'kyc-status-approved' : 'kyc-status-pending'}>
            {profile.kycStatus ? 'Approved' : 'Pending'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
