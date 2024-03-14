
import { pink } from '@material-ui/core/colors';
import './profilepagestyle.css';
import React, { useState } from 'react';
import { Checkbox } from '@material-ui/core';
import checked from '@material-ui/core/Checkbox';
import { GetUserProfile } from '../Service';

const ProfilePage = () => {
  const [expandedField, setExpandedField] = useState('');
  const [username, setUsername] = useState('');

  const handleExpand = (fieldName) => {
    if (expandedField === fieldName) {
      setExpandedField('');
    } else {
      setExpandedField(fieldName);
    }
  };

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        setExpandedField('Preferences');
    };

    // useEffect(() => {
    // //     const fetchData = async () => {
    // //       console.log("fetching data");
    // //       const data = await GetUserProfile();
    // //       console.log(data);
    // //       setUsername(data.User_Name);
    // //       setHumidityData(formattedData);
    // //     };
    // //     fetchData();
    //   }, [hiveName]); 


  const renderArrow = (fieldName) => {
    return expandedField === fieldName ? '↑' : '↓'; // Upwards arrow when expanded, downwards when not
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontSize: '18px' }}> {/* Increased base font size */}
      {['PersonalInformation', 'Security', 'Location', 'Preferences'].map((field) => (
        <div
          key={field}
          style={{
            marginBottom: '10px',
            border: '1px solid #ddd', // Consider lightening this if you want a lighter grey
            backgroundColor: '#e5bcff', // Light grey background
            borderRadius: '8px',
            padding: '20px', // Increase padding for bigger text
            cursor: 'pointer',
            fontSize: '22px', // Bigger text inside each box
            fontWeight: 'normal', // Bold text
          }}
          onClick={() => handleExpand(field)}
        >      
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
            {field.replace(/([A-Z])/g, ' $1').trim()} {/* Adds space before capital letters for readability */}
            <span style={{ fontSize: '26px'}}>{renderArrow(field)}</span>
          </div>
          {expandedField === field && field === 'PersonalInformation' && <div className='name' style={{ marginTop: '15px'}}>Full Name: </div>}
          {expandedField === field && field === 'PersonalInformation' && <div className='email' style={{ marginTop: '25px' }}>Email Address: </div>}
            {expandedField === field && field === 'Security' && <div className='username' style={{ marginTop: '25px' }}>Username: </div>}
          {expandedField === field && field === 'Security' && <div className='password' style={{ marginTop: '15px' }}>Password: </div>}
          {expandedField === field && field === 'Location' && <div className='address' style={{ marginTop: '15px' }}>Address: </div>}
          {expandedField === field && field === 'Location' && <div className='city' style={{ marginTop: '25px' }}>City: </div>}
          {expandedField === field && field === 'Location' && <div className='state' style={{ marginTop: '25px' }}>State: </div>}
          {expandedField === field && field === 'Location' && <div className='zip' style={{ marginTop: '25px' }}>Zip Code: </div>}
          {/* do not close the dropdown when the checkbox is clicked */}
            {expandedField === field && field === 'Preferences' && <div className='anonymous' style={{ marginTop: '15px' }}>Anonymous: 
            <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            </div>}

          

        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
