import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./Signup.module.css";
import { auth } from "../../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/actiontype"; // Ensure this path is correct

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const authHandler = async (e) => {
    e.preventDefault();

    try {
      if (e.target.name === "Signin") {
        setLoading({ ...loading, signIn: true });
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({ type: Type.SET_USER, user: userInfo.user });
        setLoading({ ...loading, signIn: false });
        navigate(navStateData?.state?.redirect || "/");
      } else if (e.target.name === "Signup") {
        setLoading({ ...loading, signUp: true });
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({ type: Type.SET_USER, user: userInfo.user });
        setLoading({ ...loading, signUp: false });
        navigate(navStateData?.state?.redirect || "/");
      }
    } catch (err) {
      setError(err.message);
      setLoading({ signIn: false, signUp: false });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData.state && navStateData.state.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: center,
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="Submit"
            onClick={authHandler}
            name="Signin"
            className={classes.login_signinButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        <p>
          By signing in you agree to the Amazon Fake Clone condition of use &
          sale. Please see our privacy notice.
        </p>
        <button
          type="Submit"
          onClick={authHandler}
          name="Signup"
          className={classes.login_registerBtn}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>
      </div>
    </section>
  );
}

export default Auth;
