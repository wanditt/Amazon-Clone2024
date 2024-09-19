import React, { useState, useEffect } from "react";
import classes from "./ProductDetail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
import LayOut from "../../Components/LayOut/LayOut"; // Uncomment this if needed

function ProductDetail() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Corrected usage of useState
  const [product, setProduct] = useState({});

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)

      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // Ensure loading state is reset on error
      });
  }, [productId]); // Include productId in dependency array

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          key={product.id}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
