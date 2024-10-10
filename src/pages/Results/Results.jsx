import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";

function Results() {
  const [results, setResults] = useState([]);
  const { catagoryName } = useParams();
  console.log(catagoryName);
  console.log(productUrl);

  useEffect(() => {
    if (!catagoryName) {
      console.warn("No catagory name provided."); // Warn if catagoryName is empty
      return;
    }
    //https://fakestoreapi.com/products/category/electonics
    https: axios
      .get(`${productUrl}/products/category/${catagoryName}`) // Use corrected URL
      .then((res) => {
        console.log("API Response:", res); // Debug API response
        setResults(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err); // Proper error handling
      });
  }, []); // Add catagoryName to the dependency array

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>
          catagory/{catagoryName || "Not provided"}
        </p>

        <hr />
        <div className={classes.products_container}>
          {results.length > 0 ? (
            results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))
          ) : (
            <p>No products found for this catagory.</p>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
