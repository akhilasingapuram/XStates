import React, { useState, useEffect } from "react";

const Location = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        const jsonData = await data.json();
        setCountries(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async (countryName) => {
      try {
        const data = await fetch(
          `https://crio-location-selector.onrender.com/country=${countryName}/states`
        );
        const jsonData = await data.json();
        setStates(jsonData);
        if (cities.length > 0) setCities([]);
      } catch (error) {
        console.error(error);
      }
    };
    if (country !== "") {
      fetchStates(country);
      if (state !== "") setState("");
      if (city !== "") setCity("");
    }
  }, [country]);

  useEffect(() => {
    const fetchCities = async (stateName) => {
      try {
        const data = await fetch(
          `https://crio-location-selector.onrender.com/country=${country}/state=${stateName}/cities`
        );
        const jsonData = await data.json();
        setCities(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    if (state !== "") {
      fetchCities(state);
    }
  }, [state]);

  return (
    <div>
      <h1>Select Location</h1>
      <br />
      <select
        placeholder="Select Country"
        defaultValue={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option>Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        placeholder="Select State"
        defaultValue={state}
        onChange={(e) => setState(e.target.value)}
        disabled={country === ""}
      >
        <option>Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select
        placeholder="Select City"
        defaultValue={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={state === ""}
      >
        <option>Select City</option>
        {cities.map((city) => (
          <option key={city} value={country}>
            {city}
          </option>
        ))}
      </select>
      <br />
      {city !== "" && state !== "" && country !== "" && (
        <p>
          You selected <strong>{city}, </strong>
          <span>{state}, </span>
          <span>{country}</span>
        </p>
      )}
    </div>
  );
};
export default Location;
