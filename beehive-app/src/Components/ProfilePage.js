import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { GetProfile, UpdateProfile } from '../Service';

const ProfilePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [hiveCount, setHiveCount] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetProfile();
        setFirstName(data[0].FirstName);
        setLastName(data[0].LastName);
        setEmail(data[0].Email);
        setHiveCount(data[0].Hive_Count);
        setDonationAmount(data[0].Donation_Amount);
        setProfilePic(data[0].Profile_Pic);
        console.log(profilePic);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchData();
  }, []); 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    }
    reader.readAsDataURL(file);
  }

  

  const handleUpload = async () => {
    try {
      console.log('Uploading profile picture...');
      const update = await UpdateProfile(email, firstName, lastName, donationAmount, profilePic);
      console.log(update);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  }

  const handleRemove = async () => {
    try {
      console.log('Removing profile picture...');
      const update = await UpdateProfile(email, firstName, lastName, donationAmount, '');
      console.log(update);
      setProfilePic('');
    } catch (error) {
      console.error('Error removing profile picture:', error);
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontSize: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        {(
          <img src={profilePic} alt="Profile" onChange={handleFileChange} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
        )}
        {console.log(profilePic)}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>{firstName} {lastName}</div>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button onClick={handleUpload}>Upload</button>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
      <div style={{ marginBottom: '10px', border: '1px solid #ddd', backgroundColor: '#e5bcff', borderRadius: '8px', padding: '20px', fontSize: '22px', fontWeight: 'normal' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
          Personal Information
        </div>
        <div className='profile-name' style={{ marginTop: '15px' }}>Full Name: {firstName} {lastName}</div>
        <div className='email' style={{ marginTop: '25px' }}>Email Address: {email}</div>
        <div className='hives' style={{ marginTop: '15px' }}>Number of Hives: {hiveCount}</div>
        <div className='donations' style={{ marginTop: '15px' }}>Total Donation Amount: ${donationAmount}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
