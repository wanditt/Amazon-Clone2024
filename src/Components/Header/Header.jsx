import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider.jsx";

function Header() {
  const [{ basket }, dispatch] = useContext(DataContext);

  // Corrected total item calculation
  const totalItem = basket?.reduce((amount, item) => {
    return amount + item.amount; // Correct calculation
  }, 0);

  return (
    <section className={classes.fixed}>
      <header className={classes.header_container}>
        {/* Logo and delivery information */}
        <div className={classes.logo_container}>
          <Link to="/" className={classes.logo_link}>
            <img
              src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
              alt="Amazon Logo"
              className={classes.logo_image}
            />
          </Link>
          <div className={classes.delivery_info}>
            <span className={classes.delivery_icon}>{/* {icon} */}</span>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to Wondwossen</p>
              <span>Alexandria 22304</span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className={classes.search_container}>
          <select className={classes.search_select}>
            <option value="">All</option>
          </select>
          <input
            type="text"
            className={classes.search_input}
            placeholder="Search product"
          />
          <span className={classes.search_icon}>
            {" "}
            <BsSearch size={25} />
          </span>
        </div>

        {/* Right-side links */}
        <div className={classes.links_container}>
          <div className={classes.language_selector}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1600px-Flag_of_the_United_States.svg.png?20240524035322"
              alt="US Flag"
              className={classes.flag_image}
            />
            <select className={classes.language_select}>
              <option value="">EN</option>
            </select>
          </div>

          {/* Account and Lists */}
          <Link to="/Auth" className={classes.account_link}>
            <div className={classes.account_info}>
              <p>Sign In</p>
              <span>Account & Lists</span>
            </div>
          </Link>

          {/* Orders */}
          <Link to="/Orders" className={classes.orders_link}>
            <div className={classes.orders_info}>
              <p>Returns</p>
              <span>& Orders</span>
            </div>
          </Link>

          {/* Cart */}
          <Link to="/Cart" className={classes.cart_link}>
            <BsCart3 size={35} />
            <span className={classes.cart_count}>{totalItem}</span>
          </Link>
        </div>
      </header>
      <LowerHeader />
    </section>
  );
}

export default Header;
