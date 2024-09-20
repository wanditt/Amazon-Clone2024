import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Signup.module.css";
import { auth } from "../../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";

import { Type } from "../../Utility/actiontype"; // Ensure this path is correct

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Initialize with null or empty string

  const [{ user }, dispatch] = useContext(DataContext);

  console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();

    try {
      if (e.target.name === "Signin") {
        // Sign in user
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userInfo);
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
      } else if (e.target.name === "Signup") {
        // Create a new user
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userInfo);
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user,
        });
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>

      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form>
          <div>
            <label htmlFor="Email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          {/* Display error if exists */}
          <button
            type="Submit"
            onClick={authHandler}
            name="Signin"
            className={classes.login_signinButton}
          >
            Sign In
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing in you agree to the Amazon Fake Clone condition of use &
          sale. Please see our privacy notice.
        </p>
        {/* account btn */}
        <button
          type="Submit"
          onClick={authHandler}
          name="Signup"
          className={classes.login_registerBtn}
        >
          Create Your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
