import React, { useContext } from "react";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/actiontype";
import Cart from "../../pages/Cart/Cart";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);
  console.log(state);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "500px" }}>{description}</div>}
        <div className={classes.rating}>
          {rating && (
            <>
              <Rating ratingValue={rating.rate * 20} precision={0.1} />
              <small>({rating.count} reviews)</small>
            </>
          )}
        </div>
        <div>
          <CurrencyFormat amount={price} /> {/* Use actual price */}
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
