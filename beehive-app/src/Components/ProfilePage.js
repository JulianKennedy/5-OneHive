import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Grid, Typography, Button, Input, Avatar, Paper, TextField, IconButton, CircularProgress } from '@material-ui/core';
import { GetProfile, UpdateProfile } from '../Service';
import { Footer } from './Footer';
import MemberHeader from './MemberHeader';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    hiveCount: '',
    donationAmount: ''
  });

  const [profilePic, setProfilePic] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetProfile();
        if (data[0].Donation_Amount == null) {
          data[0].Donation_Amount = 0;
        }
        const { FirstName, LastName, Email, Hive_Count, Donation_Amount } = data[0];
        setProfileData({ firstName: FirstName, lastName: LastName, email: Email, hiveCount: Hive_Count, donationAmount: Donation_Amount });
        
        const storedProfilePic = localStorage.getItem('profilePic');
        if (storedProfilePic) {
          setProfilePic(storedProfilePic);
        } else {
          setProfilePic(data[0].Profile_Pic ? bufferToBase64(data[0].Profile_Pic.data) : null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  

  const bufferToBase64 = (buffer) => {
    const binary = Buffer.from(buffer).toString('base64');
    return `data:image/jpeg;base64,${binary}`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      console.log('Uploading profile picture...');
      const update = await UpdateProfile(profileData.email, profileData.firstName, profileData.lastName, profileData.donationAmount, profilePic);
      console.log(update);
      localStorage.setItem('profilePic', profilePic);
      setSelectedFile(null);
      setUploading(false);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setUploadError('Failed to upload image. Please try again.');
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    try {
      console.log('Removing profile picture...');
      const update = await UpdateProfile(profileData.email, profileData.firstName, profileData.lastName, profileData.donationAmount, '');
      console.log(update);
      setProfilePic(null);
      localStorage.removeItem('profilePic');
    } catch (error) {
      console.error('Error removing profile picture:', error);
    }
  };

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async () => {
    try {
      console.log('Saving profile data...');
      const update = await UpdateProfile(profileData.email, profileData.firstName, profileData.lastName, profileData.donationAmount, profilePic);
      console.log(update);
      setEditing(false);
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MemberHeader style={{ marginBottom: '200px' }} />
      <Grid container justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {editing ? (
                <>
                  <TextField
                    name="firstName"
                    label="First Name"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>{profileData.firstName} {profileData.lastName}</Typography>
                  <IconButton onClick={handleEditClick} style={{ color: '#ff7bb0' }}>
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </>
              )}
            </Typography>
            <Avatar src={profilePic} style={{ width: '150px', height: '150px', margin: '0 auto 20px' }}>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '150px', color: '#9e9e9e' }} />
            </Avatar>
            <Input
              type="file"
              onChange={handleFileChange}
              inputProps={{ style: { display: 'none' } }}
              accept="image/*"
              id="contained-button-file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" style={{ backgroundColor: '#ff7bb0', color: "white" }} component="span">
                {uploading ? <CircularProgress size={24} /> : (selectedFile ? selectedFile.name : 'Choose File')}
              </Button>
            </label>
            <Button variant="contained" style={{ backgroundColor: selectedFile ? '#ff7bb0' : 'inherit',  color: selectedFile ? "white": 'grey'}} onClick={handleUpload} disabled={!selectedFile || uploading}>
              Upload
            </Button>
            <Button variant="contained" color="secondary" onClick={handleRemove} style={{ backgroundColor: '#ff7bb0' }}>
              <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
              Remove
            </Button>
            {uploadError && <Typography color="error">{uploadError}</Typography>}
          </Paper>
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>Personal Information</Typography>
            <TextField
              name="email"
              label="Email Address"
              value={profileData.email}
              disabled
              type="email"
              fullWidth
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Number of Hives"
              value={profileData.hiveCount}
              disabled
              fullWidth
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Total Donation Amount"
              value={`$${profileData.donationAmount}`}
              disabled
              fullWidth
              style={{ marginBottom: '10px' }}
            />
            {editing && (
              <Button variant="contained" color="primary" type="submit" onClick={handleSave} style={{ backgroundColor: '#ff7bb0' }}>
                <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                Save
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default ProfilePage;
