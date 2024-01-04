import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const getStateData = async (name) => {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${name}/states`
      );
      const data = await res.json();
      setState(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCityData = async (stateName, countryName) => {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`
      );
      const data = await res.json();
      setCity(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStateData(selectedCountry);
      setSelectedState("");
      setCity([]);
      setSelectedCity("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && selectedCountry) {
      getCityData(selectedState, selectedCountry);
      setSelectedCity("");
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="App">
      <h1>Select Location </h1>
      <div>
        <select onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="select country" disabled>
            Select Country
          </option>
          {countries.map((country) => {
            return (
              <option value={country} key={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => setSelectedState(e.target.value)}>
          <option value="select state">Select State</option>
          {state.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="select city">Select City</option>
          {city.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      {selectedCity && (
        <h2>
          You Selected <span>{selectedCountry}</span>,
          <span>
            {" "}
            {selectedState},{" "}{selectedCity}
          </span>
        </h2>
      )}
    </div>
  );
}
