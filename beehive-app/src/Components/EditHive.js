import React, { useState, useRef } from 'react';
import { UpdateHive, DeleteHive } from '../Service';
import ReactDom from "react-dom";
import { Button, TextField, Checkbox, FormControlLabel, Tooltip } from '@material-ui/core';
import './edithivestyle.css';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditHive = ({ onClose , oldHive}) => {

  const [hiveName, setHiveName] = useState(oldHive.Hive_Name);
  const [streetAddress, setStreetAddress] = useState(oldHive.StreetAddress);
  const [city, setCity] = useState(oldHive.City);
  const [province, setProvince] = useState(oldHive.Province);
  const [postalCode, setPostalCode] = useState(oldHive.PostalCode);
  const [anonymous, setAnonymous] = useState(oldHive.Hive_Anonymous);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!hiveName){
      setHiveName(oldHive.Hive_Name);
    }
    if(!streetAddress){
      setStreetAddress(oldHive.StreetAddress);
    }
    if(!city){
      setCity(oldHive.City);
    }
    if(!province){
      setProvince(oldHive.Province);
    }
    if(!postalCode){
      setPostalCode(oldHive.PostalCode);
    }
    await UpdateHive(oldHive.Hive_Name, hiveName, streetAddress, city, province, postalCode, anonymous);
    onClose();
  };

  const removeHive = async (event) => {
    event.preventDefault();
    await DeleteHive(oldHive.Hive_Name);
    await onClose();
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
      <div className="mod">
        <div className="modal-content wider-modal">
          <h2 className="modal-title">Edit Beehive</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="label-input-container">
              <span>Edit Hive Name: </span>
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
                <label>Edit Street Address:</label>
                <TextField
                  id="autocomplete"
                  className="input-field"
                  fullWidth
                  value={streetAddress}
                  onChange={(event) => setStreetAddress(event.target.value)}
                />
              </div>
              <div className="label-input-container">
                <label>Edit City:</label>
                <TextField
                  id="city"
                  className="input-field"
                  fullWidth
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>
              <div className="label-input-container">
                <label>Edit Province:</label>
                <TextField
                  id="province"
                  className="input-field"
                  fullWidth
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                />
              </div>
              <div className="label-input-container">
                <label>Edit Postal Code:</label>
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
                <span>Is Hive Anonymous</span>
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
                <FormControlLabel
                  control={<Checkbox id="anonymous" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked ? 1 : 0)} />}
                  label=""
                />
              </div>
            </div>
            <div className="modal-buttons">
              <Button variant="outlined" style={{color: "#e5bcff", borderColor: '#e5bcff' }} onClick={onClose}>Close</Button>
              <Button variant="outlined" style={{color: "#ff4081", borderColor: '#e5bcff' }} onClick={removeHive}>Remove Hive</Button>
              <Button variant="contained" style={{backgroundColor: "#e5bcff"}} type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("dash")
  );
};


export default EditHive;