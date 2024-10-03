import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import "./index.css";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { auth } from "./Utility/firebase";
import { Type } from "./Utility/actiontype";
// import { SET_USER } from "./types";
// import { useState } from "react";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, [user]);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
