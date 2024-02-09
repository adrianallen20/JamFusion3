import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";
import firebase from "../firebase";
import logoImage from '../assets/jflogo.png'; 


const Fuses = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const signOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("user signed out");
      })
      .catch((err) => {
        console.log("err user signOut ", err);
      });
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-link">
        <div className="logo">
      <img src={logoImage}alt="Logo" className="logo-image"/> 
    </div>
          <Link to="/">Home</Link>
          <Link to="/jam">Jam</Link>
          <Link to="/fuses">Fuses</Link>
          <Link to="/profile">Profile</Link>

        </div>

        {user ? (
           <>

          <button className="signout-button" onClick={signOut}>Sign out</button>
          </>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>Login</button>
        )}
      </div>

      <h1>Fuses </h1>                      
      <p> Fuses page Email: {user.email}</p>

    </>
  );
};

export default Fuses;
