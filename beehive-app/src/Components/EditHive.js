import React, { useState, useRef } from 'react';
import { UpdateHive, DeleteHive } from '../Service';
import { Modal, Button } from 'react-bootstrap';
import ReactDom from "react-dom";
import './edithivestyle.css';
import { Checkbox } from '@material-ui/core';

const EditHive = ({ onClose , oldHive}) => {

    const [hiveName, setHiveName] = useState(oldHive.Hive_Name);
    const [location, setLocation] = useState(oldHive.Hive_Location);
    const [anonymous, setAnonymous] = useState(oldHive.Hive_Anonymous);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      await UpdateHive(oldHive.Hive_Name, hiveName, location, anonymous);
      onClose();
    };
  
    const modalRef = useRef();
    const closeModal = (e) => {
      if (e.target === modalRef.current) {
        onClose();
      }
    };

    const removeHive = async (event) => {
        event.preventDefault();
        await DeleteHive(oldHive.Hive_Name);
        await onClose();
      };

    return ReactDom.createPortal(
        <div className="container" ref={modalRef} onClick={closeModal}>
          <div className="modal">
            <div className="modal-content">
              <h2 className="modal-title">Edit Beehive</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Edit Hive Name: </label>
                  <input
                    type="text"
                    id="name"
                    value={hiveName}
                    onChange={(event) => setHiveName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Edit Hive Location: </label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                  />
                  </div>
                  <div className="form-group">
                    <label htmlFor="anonymous">Edit Hive Anonymity: </label>
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

