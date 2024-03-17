import React, { useState, useRef } from 'react';
import { UpdateHive, DeleteHive } from '../Service';
import { Modal, Button } from 'react-bootstrap';
import ReactDom from "react-dom";
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
        <div className="modal-content">
          <h2 className="modal-title">Edit Beehive</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <div className="location-container">
                <div className="location-title">
                  <label htmlFor="name">Edit Hive Name:  </label>
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
                <label>Edit Street Address:</label>
                <input id="autocomplete" value={streetAddress} type="text" onChange={(event) => setStreetAddress(event.target.value)}/>
              </div>
              <div>
                <label>Edit City:</label>
                <input id="city" type="text" value={city} onChange={(event) => setCity(event.target.value)} />
              </div>
              <div>
                <label>Edit Province:</label>
                <input id="province" type="text" value={province} onChange={(event) => setProvince(event.target.value)} />
              </div>
              <div>
                <label>Edit Postal Code:</label>
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
            <div className="modal-buttons">
              <button type="button" onClick={onClose} className="close-btn">Close</button>
              <button type="button" onClick={removeHive} className="remove-hive-btn">Remove Hive</button>
              <button type="submit" className='submit-btn'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("dash")
  );
};

export default EditHive;
