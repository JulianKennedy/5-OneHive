// Map.js
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { useEffect, useState, useRef } from 'react';
import { GetLocations, getHives } from '../Service';
import Header from './Header';
import MemberHeader from './MemberHeader';
import {Footer} from './Footer';
import { MarkerClusterer } from '@react-google-maps/api';
import './mappagestyle.css';

const MapPage = ({ google }) => {
  const [cities, setCities] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const isAuthenticated = localStorage.getItem("jwt") ? true : false;

  return (
    <div className="MapPage" style={{width: '100%'}}>
      {isAuthenticated ? <MemberHeader /> : <Header />}
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
          <div>
            {selectedPlace && (
              <div>
                {selectedPlace.anonymous === 0 && <h3> {selectedPlace.hiveName} </h3>}
                {selectedPlace.anonymous === 1 && <h3> Anonymous Beehive </h3>}

                <h4>{selectedPlace.name}, {selectedPlace.province}</h4>
                {selectedPlace.temperature && <p>Temperature: {selectedPlace.temperature} °C</p>}
                {selectedPlace.humidity && <p>Humidity: {selectedPlace.humidity}%</p>}
                {selectedPlace.weight && <p>Weight: {selectedPlace.weight} kg</p>}
                {selectedPlace.frequency && <p>Frequency: {selectedPlace.frequency} Hz</p>}
                {!selectedPlace.temperature && <p>Temperature: N/A</p>}
                {!selectedPlace.humidity && <p>Humidity: N/A</p>}
                {!selectedPlace.weight && <p>Weight: N/A</p>}
                {!selectedPlace.frequency && <p>Frequency: N/A</p>}
                {!selectedPlace.temperature && !selectedPlace.humidity && !selectedPlace.weight && !selectedPlace.frequency && <p>No data available for this beehive</p>}
                {selectedPlace && !selectedPlace.anonymous && (
                  <div className="contact-dropdown" style={{textAlign: 'center'}}>
                    <p style={{textAlign: 'center'}}>Contact {selectedPlace.owner}</p>
                    <div className='contact-dropdown-content'>
                      <p style={{ fontWeight: "bold", justifyContent: 'center', alignContent: 'center' }}>Contact Information</p>
                      <p><strong>Name: </strong>{selectedPlace.owner}</p>
                      <p><strong>Email: </strong>{selectedPlace.email}</p>
                    </div>
                  </div>
                )}
                {selectedPlace.anonymous === 1 && <p>User is anonymous. No contact information available.</p>}
              </div>
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