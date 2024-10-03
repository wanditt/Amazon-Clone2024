import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

function ProtectedRoute({ children, msg, redirect = "/auth" }) {
  const [{ user }] = useContext(DataContext); // Correct destructuring
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to auth if not authenticated
      navigate(redirect, { state: { msg } });
    }
  }, [user, navigate, msg, redirect]); // Add dependencies

  // If user is authenticated, return children component
  return user ? children : null;
}

export default ProtectedRoute;
