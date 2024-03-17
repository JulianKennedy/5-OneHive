import React, { useState } from 'react';

const AutocompleteAddressForm = () => {
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');

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

  return (
    <div>
      <div>
        <label>Street Address:</label>
        <input id="autocomplete" placeholder="Enter your address" type="text" />
      </div>
      <div>
        <label>City:</label>
        <input id="city" type="text" value={city} onChange={(event) => setCity(event.target.value)}/>
      </div>
      <div>
        <label>Province:</label>
        <input id="province" type="text" value={province} onChange={(event) => setProvince(event.target.value)}/>
      </div>
      <div>
        <label>Postal Code:</label>
        <input id="postalCode" type="text" value={postalCode} onChange={(event) => setPostalCode(event.target.value)}/>
      </div>
    </div>
  );
};

export default AutocompleteAddressForm;
