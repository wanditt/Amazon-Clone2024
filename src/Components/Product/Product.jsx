import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const [error, setError] = useState(null); // Error state to track API failures

  useEffect(() => {
    setIsLoading(true); // Set loading state to true before fetching data
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false); // Set loading state to false after data is fetched
      })
      .catch((err) => {
        setError("Failed to fetch products.");
        console.log(err);
        setIsLoading(false); // Set loading state to false if there's an error
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>; // Display the error message if there's an error
  }

  return (
    <section className={classes.products_container}>
      {products.map((product) => (
        <ProductCard key={product.id}
          product={product}
          renderAdd={true} />
      ))}
    </section>
  );
}

export default Product;
