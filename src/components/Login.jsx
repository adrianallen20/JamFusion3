import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import firebase from "../firebase";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUserCredentials((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setIsLoading(true);
    console.log("submit clicked");

    try {
      const { email, password } = userCredentials;
      await firebase.auth().signInWithEmailAndPassword(email, password);

      const currentUser = firebase.auth().currentUser;

      console.log("currentUser", currentUser);
    } catch (err) {
      setError(err?.message || "Something went wrong!");

      console.log("error", err);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit} className="form">
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={userCredentials.email}
          onChange={handleOnChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          value={userCredentials.password}
          onChange={handleOnChange}
        />

        <p className="navigate-text">
          Need an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>{" "}
        </p>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : " Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
