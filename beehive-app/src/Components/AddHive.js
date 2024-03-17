import React, { useState, useRef } from 'react';
import { InsertHive } from '../Service';
import { Modal, Button } from 'react-bootstrap';
import ReactDom from "react-dom";
import './addhivestyle.css';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
              <div className="location-container">
                <div className="location-title">
                  <label htmlFor="name">Hive Name:  </label>
                  <div className="info-container">
                    <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                    <div className="info-popup">This is only visible to you. The beehive name may be changed at any time.</div>
                  </div>
                </div>
                <input
                  type="text"
                  id="name"
                  value={hiveName}
                  onChange={(event) => setHiveName(event.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <label>Street Address:</label>
                <input id="autocomplete" placeholder="Enter your address" type="text" onChange={(event) => setStreetAddress(event.target.value)} />
              </div>
              <div>
                <label>City:</label>
                <input id="city" type="text" value={city} onChange={(event) => setCity(event.target.value)} />
              </div>
              <div>
                <label>Province:</label>
                <input id="province" type="text" value={province} onChange={(event) => setProvince(event.target.value)} />
              </div>
              <div>
                <label>Postal Code:</label>
                <input id="postalCode" type="text" value={postalCode} onChange={(event) => setPostalCode(event.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <div className="anonymous-container">
                <label htmlFor="anonymous">Is Hive Anonymous: </label>
                <div className="info-container">
                  <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                  <div className="info-popup">Contact information and exact location will be censored for anonymous beehives.</div>
                </div>
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={anonymous}
                  onChange={(event) => setAnonymous(event.target.checked ? 1 : 0)}
                />
              </div>
            </div>
            {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
            <div className="modal-buttons">
              <button type="button" onClick={onClose} className="close-btn">Close</button>
              <button type="submit" className='submit-btn'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("dash")
  );
};

export default AddHive;
