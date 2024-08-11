// hooks.js

import { useState, useEffect } from "react";
import axios from "axios";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5002/backend/category/");
        setCategories(response.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return [categories];
};

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countriesData = response.data.map(country => ({
          name: country.name.common,
          code: country.cca2
        }));
        setCountries(countriesData);
      } catch (error) {
        setError(error);
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return { countries, error };
};

// usePincode.js



export const usePincode = () => {
  const [pincodeData, setPincodeData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPincodeData = async (pincode) => {
      try {
          const response = await axios.get(`/backend/address/pincode/${pincode}`);
          setPincodeData(response.data.pincodeData.PostOffice[0]);
          // Assuming the data is in the first index of response array
          setError(null);
      } catch (error) {
          setError('Failed to fetch pincode data');
          console.error('Error fetching pincode data:', error);
      }
  };

  return { pincodeData, error, fetchPincodeData };
};
