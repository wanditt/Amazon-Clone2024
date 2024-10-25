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

const Payment = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Calculate total items and total cost
  const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0);
  const total = basket?.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  // Handle card input changes (for validation)
  const handleChange = (e) => {
    setCardError(e?.error ? e.error.message : "");
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Step 1: Create payment intent on backend
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );
      const clientSecret = response.data?.clientSecret;

      // Step 2: Confirm payment with Stripe
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // Step 3: If payment is successful, save order in Firestore
      if (paymentIntent.status === "succeeded") {
        console.log("Payment successful!");

        await db
          .collection("users")
          .doc(user?.uid)
          .collection("Orders")
          .doc(paymentIntent.id)
          .set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        dispatch({ type: Type.EMPTY_BASKET });

        // Redirect to orders page with a message
        navigate("/Orders", { state: { msg: "You have placed a new order!" } });
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
      <div className={classes.payment_header}>Checkout ({totalItem} items)</div>

      {user ? (
        <>
          {/* User Info */}
          <div className={classes.user_info}>Logged in as: {user.email}</div>

          {/* Payment Section */}
          <section>
            {/* Delivery Address */}
            <div className={classes.flex}>
              <h3>Delivery Address</h3>
              <div>
                <p>{user.email}</p>
                <p>123 React Lane</p>
                <p>Alexandria VA</p>
              </div>
            </div>
            <hr />

            {/* Review Products */}
            <div className={classes.flex}>
              <h3>Review items and delivery</h3>
              <div>
                {basket?.map((item) => (
                  <ProductCard key={item.id} product={item} flex />
                ))}
              </div>
            </div>
            <hr />

            {/* Payment Method */}
            <div className={classes.flex}>
              <h3>Payment methods</h3>
              <div className={classes.payment_card_container}>
                <div className={classes.payment_details}>
                  <form onSubmit={handlePayment}>
                    {cardError && (
                      <small style={{ color: "red" }}>{cardError}</small>
                    )}

                    <CardElement onChange={handleChange} />

                    <div>
                      <span style={{ display: "flex", gap: "10px" }}>
                        <p>Total Order</p> | <CurrencyFormat amount={total} />
                      </span>
                    </div>

                    <button type="submit" disabled={processing}>
                      {processing ? (
                        <div className={classes.loader}>
                          <ClipLoader color="gray" size={12} />
                          <p>Please wait . . .</p>
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
};

export default Payment;
