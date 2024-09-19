import React from "react";
import numeral from "numeral";

// CurrencyFormat component to format numbers as currency
function CurrencyFormat({ amount }) {
  return (
    <span>
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)}
    </span>
  );
}

export default CurrencyFormat;
