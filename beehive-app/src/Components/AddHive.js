import React, { useState, useRef } from 'react';
import { getHives, getAllHivesOfUser, InsertHive } from '../Service';
import { Modal, Button } from 'react-bootstrap';
import ReactDom from "react-dom";
import './addhivestyle.css';
import { Checkbox } from '@material-ui/core';

const AddHive = ({ onClose }) => {

    const [hiveName, setHiveName] = useState('');
    // const [streetAddress, setStreetAddress] = useState('');
    // const [city, setCity] = useState('');
    // const [province, setProvince] = useState('');
    // const [postalCode, setPostalCode] = useState('');
    const [location, setLocation] = useState('');
    const [anonymous, setAnonymous] = useState(0);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      await InsertHive(hiveName, location, anonymous);
      onClose();
    };
  
    const modalRef = useRef();
    const closeModal = (e) => {
      if (e.target === modalRef.current) {
        onClose();
      }
    };

    return ReactDom.createPortal(
        <div className="container" ref={modalRef} onClick={closeModal}>
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-title">Add a Beehive</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Hive Name: </label>
                  <input
                    type="text"
                    id="name"
                    value={hiveName}
                    onChange={(event) => setHiveName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="streetAddress">Hive Location: </label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                  />
                  </div>
                  <div className="form-group">
                    <label htmlFor="anonymous">Keep Hive Anonymous: </label>
                  <input
                    type="checkbox"
                  id="anonymous"
                    value={anonymous}
                    onChange={(event) => setAnonymous(event.target.checked ? 1 : 0)}
                  >
                  </input>
                </div>
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

