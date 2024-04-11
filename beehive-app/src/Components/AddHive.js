import React, { useState, useRef } from 'react';
import { InsertHive } from '../Service';
import ReactDom from "react-dom";
import './addhivestyle.css';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, Checkbox, Tooltip, Button } from '@material-ui/core';

const AddHive = ({ onClose }) => {

  const [hiveName, setHiveName] = useState('');
  const [anonymous, setAnonymous] = useState(0);
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!hiveName || !streetAddress || !city || !province || !postalCode) {
      setValidationError('Please fill in all fields.');
      console.log(hiveName, streetAddress, city, province, postalCode);
      return;
    }

    setValidationError('');

    await InsertHive(hiveName, streetAddress, city, province, postalCode, anonymous);
    onClose();
  };

  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const handlePlaceSelect = (place) => {
    const addressComponents = place.address_components;

    let streetAddress = '';
    let city = '';
    let province = '';
    let postalCode = '';

    addressComponents.forEach(component => {
      const types = component.types;
      if (types.includes('street_number') || types.includes('route')) {
        streetAddress += component.long_name + ' ';
      } else if (types.includes('locality')) {
        city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        province = component.long_name;
      } else if (types.includes('postal_code')) {
        postalCode = component.long_name;
      }
    });

    setStreetAddress(streetAddress.trim());
    setCity(city);
    setProvince(province);
    setPostalCode(postalCode);
    document.getElementById('city').value = city;
    document.getElementById('province').value = province;
    document.getElementById('postalCode').value = postalCode;
    document.getElementById('autocomplete').value = streetAddress;
  };

  const initAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'));

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      handlePlaceSelect(place);
    });
  };

  const loadScript = (url, callback) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = () => callback();
    document.head.appendChild(script);
  };

  const handleScriptLoad = () => {
    initAutocomplete();
  };

  loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyBLPyhPm2g3pMtdgij8B3UYvaUutvcEg4M&libraries=places`, handleScriptLoad);

  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="moda">
        <div className="modal-content">
          <h2 className="modal-title">Add a Beehive</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="label-input-container">
                <span>Hive Name:</span>
                <Tooltip
                  title={
                    <span>
                      This is only visible to you. The beehive name may be changed at any time.
                    </span>
                  }
                  arrow
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                </Tooltip>
                <TextField
                  id="name"
                  className="input-field"
                  fullWidth
                  value={hiveName}
                  onChange={(event) => setHiveName(event.target.value)}
                />
              </div>
              <div className="label-input-container">
                <label>Street Address:</label>
                <TextField
                  id="autocomplete"
                  className="input-field"
                  fullWidth
                  value={streetAddress}
                  onChange={(event) => setStreetAddress(event.target.value)}
                />
              </div>
              <div className="label-input-container">
                <label>City:</label>
                <TextField
                  id="city"
                  className="input-field"
                  fullWidth
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>
              <div className="label-input-container">
                <label>Province:</label>
                <TextField
                  id="province"
                  className="input-field"
                  fullWidth
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                />
              </div>
              <div className="label-input-container">
                <label>Postal Code:</label>
                <TextField
                  id="postalCode"
                  className="input-field"
                  fullWidth
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="anonymous-container">
                <span>Is Hive Anonymous:</span>
                <Tooltip
                  title={
                    <span>
                      Contact information and exact location will be censored for anonymous beehives.
                    </span>
                  }
                  arrow
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                </Tooltip>
                <Checkbox
                  checked={anonymous}
                  onChange={(event) => setAnonymous(event.target.checked)}
                />
              </div>
            </div>
            {validationError && (
              <div className="error-container">
                <p className="error-message">{validationError}</p>
              </div>
            )}
            <div className="modal-buttons">
              <Button variant="outlined" onClick={onClose} style={{ color: '#e5bcff', borderColor: '#e5bcff' }}>Close</Button>
              <Button variant="contained" type="submit" style={{ backgroundColor: '#e5bcff' }}>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("dash")
  );
};

export default AddHive;
