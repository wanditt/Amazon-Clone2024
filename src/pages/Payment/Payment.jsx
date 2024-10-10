import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/actiontype";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext); // Destructure user from context

  // Calculate total items in the basket
  const totalItem = basket?.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e?.error) {
      setCardError(e.error.message); // Set error message if there's an error
    } else {
      setCardError(""); // Clear error when valid
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // Step 1: Create payment intent by calling backend
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`, // Stripe requires amount in cents
      });

      const clientSecret = response.data?.clientSecret;

      // Step 2: Confirm payment using Stripe
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(paymentIntent);

      // Step 3: Order confirmed; Clear basket or update Firestore database if needed
      if (paymentIntent.status === "succeeded") {
        console.log("Payment successful!");

        // Save order to Firestore
        await db
          .collection("users")
          .doc(user.uid)
          .collection("Orders") // Ensure the collection name is correct here
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        dispatch({ type: Type.EMPTY_BASKET });

        // Check if navigate is working
        console.log("Navigating to /orders");
        navigate("/orders", { state: { msg: "You have placed a new order!" } });
      }
    } catch (error) {
      console.error("Payment error:", error);
      setCardError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      {/* User Info */}
      {user ? (
        <>
          <div className={classes.user_info}>Logged in as: {user.email}</div>

          {/* Payment method */}
          <section>
            {/* Address */}
            <div className={classes.flex}>
              <h3>Delivery Address</h3>
              <div>
                <div>{user.email}</div>
                <div>123 React Lane</div>
                <div>Alexandria VA</div>
              </div>
            </div>
            <hr />

            {/* Products */}
            <div className={classes.flex}>
              <h3>Review items and delivery</h3>
              <div>
                {basket?.map((item) => (
                  <ProductCard product={item} flex={true} key={item.id} />
                ))}
              </div>
            </div>
            <hr />

            {/* Card form */}
            <div className={classes.flex}>
              <h3>Payment methods</h3>
              <div className={classes.payment_card_container}>
                <div className={classes.payment_details}>
                  <form onSubmit={handlePayment}>
                    {cardError && (
                      <small style={{ color: "red" }}>{cardError}</small>
                    )}

                    <CardElement onChange={handleChange} />
                    <br />
                    <div>
                      <span style={{ display: "flex", gap: "10px" }}>
                        <p>Total Order</p> |<CurrencyFormat amount={total} />
                      </span>
                    </div>
                    <button type="submit" disabled={processing}>
                      {processing ? (
                        <div className={classes.loader}>
                          <ClipLoader color="gray" size={12} />
                          <p>Please wait . . . </p>
                        </div>
                      ) : (
                        "Pay Now"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div>Please log in to complete the purchase</div>
      )}
    </LayOut>
  );
}

export default Payment;
