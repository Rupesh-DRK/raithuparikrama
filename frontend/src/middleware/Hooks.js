// hooks.js

import { useState, useEffect } from "react";
import axios from "axios";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/backend/category");
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


export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/backend/product/getProducts");
        setProducts(response.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return [products];
};
