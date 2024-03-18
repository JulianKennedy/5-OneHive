// Map.js
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { useEffect, useState } from 'react';
import { GetLocations } from '../Service';
import Header from './Header';
import MemberHeader from './MemberHeader';

const MapPage = ({ google }) => {
  const [cities, setCities] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch city data from your database API
        const response = await GetLocations();

        // Fetch coordinates for each city
        const citiesWithCoordinates = await Promise.all(
          response.map(async city => {
            try {
              const apiKey = 'AIzaSyBLPyhPm2g3pMtdgij8B3UYvaUutvcEg4M';
              if (city.Hive_Anonymous === 1) {
                const url = city.City+", " +city.Province;
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
  };

  const onClose = () => {
    setShowingInfoWindow(false);
    setActiveMarker(null);
  };

  return (
    <Map
      google={google}
      zoom={4}
      initialCenter={{ lat: 60.1087, lng: -113.6426 }} // Centered on Canada
      style={{ height: '600px', width: '600px', position: 'relative', margin: 'auto' }}
    >
      {cities.map(city => (
        <Marker
          key={city.StreetAddress}
          position={city.coordinates}
          name={city.City} // Pass the city name as a prop
          onClick={onMarkerClick}
        />
      ))}
      <InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={onClose}
      >
        <div>
          <h4>{selectedPlace && selectedPlace.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBLPyhPm2g3pMtdgij8B3UYvaUutvcEg4M'
})(MapPage);