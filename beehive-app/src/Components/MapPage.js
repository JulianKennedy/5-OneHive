// Map.js
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { useEffect, useState, useRef } from 'react';
import { GetLocations, getHives } from '../Service';
import Header from './Header';
import MemberHeader from './MemberHeader';
import {Footer} from './Footer';
import { MarkerClusterer } from '@react-google-maps/api';
import { Grid, Card, CardContent, Typography, Button, Divider } from '@material-ui/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './mappagestyle.css';
import { useNavigate } from "react-router-dom";

const MapPage = ({ google }) => {
  const [cities, setCities] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const mapRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem('token')) {
          navigate('/login');
          return;
        }
        // Fetch city data from your database API
        const response = await GetLocations("location");
        console.log(response);

        const data = await getHives("modal");

        const combinedData = response.map(city => {
          const hiveData = data.find(hive => hive.Hive_ID === city.Hive_ID);
          return {
            ...city,
            ...hiveData
          };
        });

        console.log(combinedData);

        // Fetch coordinates for each city
        const citiesWithCoordinates = await Promise.all(
          combinedData.map(async city => {
            try {
              const apiKey = 'AIzaSyBLPyhPm2g3pMtdgij8B3UYvaUutvcEg4M';
              if (city.Hive_Anonymous === 1) {
                const url = city.City + ", " + city.Province;
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${url}&key=${apiKey}`);
                const result = await response.json();
                console.log(response);
                if (result.results.length > 0) {
                  const location = result.results[0].geometry.location;
                  setActiveMarker(city.City);
                  return { ...city, coordinates: { lat: location.lat, lng: location.lng } };
                } else {
                  console.error(`No results found for ${city.StreetAddress}.`);
                  return city;
                }
              }
              else {
                const address = `${city.StreetAddress}, ${city.City}, ${city.Province}, ${city.PostalCode}`;
                const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

                const response = await fetch(url);
                const result = await response.json();
                if (result.results.length > 0) {
                  const location = result.results[0].geometry.location;
                  setActiveMarker(city.City);
                  return { ...city, coordinates: { lat: location.lat, lng: location.lng } };
                } else {
                  console.error(`No results found for ${city.StreetAddress}.`);
                  return city;
                }
              }
            } catch (error) {
              console.error(`Error fetching data for ${city.StreetAddress}:`, error);
              return city;
            }
          })
        );

        setCities(citiesWithCoordinates);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchData();
  }, []);

  const onMarkerClick = (props, marker) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);

    // Zoom in when a marker is clicked
    if (mapRef.current) {
      const map = mapRef.current.map;
      map.setZoom(10); // Set your desired zoom level

      map.setCenter(marker.getPosition());
    }
  };

  const onClose = () => {
    setShowingInfoWindow(false);
    setActiveMarker(null);
  };

  const isAuthenticated = localStorage.getItem("token") ? true : false;
  return (
    <div className="MapPage" style={{width: '100%'}}>
      <MemberHeader />
      <p className="map-title" style={{textAlign: 'center', position: 'relative', marginTop: '175px', fontWeight: 'bold', fontSize: '24px'}}>Map of all FEC Customer Beehives</p>
      <Map
        google={google}
        zoom={4}
        initialCenter={{ lat: 50.1087, lng: -93.6426 }} // Centered on Canada
        style={{ height: '800px', width: '800px', position: 'relative', margin: 'auto', marginTop: '10px' }}
        ref={mapRef}
      >
        {cities.map(city => (
          <Marker
            key={city.StreetAddress}
            position={city.coordinates}
            name={city.City} // Pass the city name as a prop
            temperature={city.Temperature}
            humidity={city.Humidity}
            weight={city.Weight}
            frequency={city.Frequency}
            province={city.Province}
            hiveName={city.Hive_Name}
            anonymous={city.Hive_Anonymous}
            owner={city.FirstName}
            email={city.Email}
            onClick={onMarkerClick}
          />
        ))}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
        >
          <div style={{ width: '300px' }}>
            {selectedPlace && (
              <Card>
              <CardContent>
                {selectedPlace.anonymous === 0 && <Typography variant="h5"> {selectedPlace.hiveName} </Typography>}
                {selectedPlace.anonymous === 1 && <Typography variant="h5"> Anonymous Beehive </Typography>}

                <Typography variant="subtitle1">
                  <span style={{ fontWeight: 'bold' }}>{selectedPlace.name}</span>, <span style={{ fontWeight: 'bold' }}>{selectedPlace.province}</span>
                </Typography>
                <Divider style={{ margin: '10px 0' }} />
                {selectedPlace.temperature && <Typography>Temperature: {selectedPlace.temperature} °C</Typography>}
                {selectedPlace.humidity && <Typography>Humidity: {selectedPlace.humidity}%</Typography>}
                {selectedPlace.weight && <Typography>Weight: {selectedPlace.weight} kg</Typography>}
                {selectedPlace.frequency && <Typography>Frequency: {selectedPlace.frequency} Hz</Typography>}
                {!selectedPlace.temperature && <Typography>Temperature: N/A</Typography>}
                {!selectedPlace.humidity && <Typography>Humidity: N/A</Typography>}
                {!selectedPlace.weight && <Typography>Weight: N/A</Typography>}
                {!selectedPlace.frequency && <Typography>Frequency: N/A</Typography>}
                {!selectedPlace.temperature && !selectedPlace.humidity && !selectedPlace.weight && !selectedPlace.frequency && <Typography style={{ marginTop: '20px' }}>No data available for this beehive</Typography>}
                {selectedPlace.temperature && !selectedPlace.humidity && !selectedPlace.weight && !selectedPlace.frequency && <div style={{ marginBottom: '10px' }} />}
                {selectedPlace && !selectedPlace.anonymous && (
                  <div className="contact-dropdown" style={{ textAlign: 'center', marginTop: '20px' }}>
<Button variant="contained" color="primary" href={`mailto:${selectedPlace.email}`}>
  <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '5px' }} />
  Contact {selectedPlace.owner}
</Button>                  </div>
                )}
                {selectedPlace.anonymous === 1 && <Typography style={{ marginTop: '20px' }}>User is anonymous. No contact information available.</Typography>}
              </CardContent>
            </Card>
            )}
          </div>
        </InfoWindow>
      </Map >
      <div className="f" style={{marginTop: '900px'}}>
        <Footer/>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBLPyhPm2g3pMtdgij8B3UYvaUutvcEg4M'
})(MapPage);