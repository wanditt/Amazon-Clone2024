// import React, { useContext } from "react";
// import LayOut from "../../Components/LayOut/Layout";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import ProductCard from "../../Components/Product/ProductCard";

// function Cart() {
//   const [{ basket, user }, dispatch] = useContext(DataContext);

//   return (
//     <LayOut>
//       <section>
//         <div>
//           <h2>Hello, {user?.name || "Guest"}</h2>
//           <h3>Your shopping basket</h3>
//           <hr />
//           {basket?.length === 0 ? (
//             <p>Oops | No item in your cart</p>

//           ) :

//             (
//               basket?.map((item, i) => {
//                 console.log("Basket:", basket);
//                 return <ProductCard
//                   key={i} // Use index or better use item.id if available

//                   product={item}
//                   renderDesc={true}
//                   renderAdd={false}

//                   flex={true}
//                 />
//               })
//           )}
//         </div>
//         <div>{/* You can add more content or styling here */}</div>
//       </section>
//     </LayOut>
//   );
// }

// export default Cart;
import React, { useContext } from "react";
import classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/actiontype"; // Ensure Type is correctly imported
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // Calculate the total price
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  // Handlers for increment and decrement
  const increment = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item }); // Use correct action type
  };

  const decrement = (id) => {
    dispatch({ type: Type.REMOVE_FROM_BASKET, id }); // Pass correct id and use correct case
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello, {user?.name || "Guest"}</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops | No item in your cart</p>
          ) : (
            basket?.map((item, i) => (
              <section className={classes.cart_product} key={i}>
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <MdKeyboardArrowUp size={30} />
                  </button>

                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={30} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p> Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to Checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
