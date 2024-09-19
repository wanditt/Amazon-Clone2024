import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./Components/DataProvider/DataProvider.jsx";
import { initialeState, reducer } from "./Utility/reducer.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialeState={initialeState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);
