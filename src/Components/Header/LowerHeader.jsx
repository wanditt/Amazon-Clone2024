import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./LowerHeader.module.css";

function LowerHeader() {
  return (
    <div className={classes.lowerHeader}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Coctumer Services</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
