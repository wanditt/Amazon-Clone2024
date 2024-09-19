import React, { createContext, useReducer } from "react";
import { initialeState, reducer } from "../../Utility/reducer"; // Ensure this path is correct

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialeState)}>
      {children}
    </DataContext.Provider>
  );
};
