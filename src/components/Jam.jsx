import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";
import firebase from "../firebase";
import logoImage from '../assets/jflogo.png'; 
import { sculptureList } from './data.js';
import { useState } from 'react';


const Jam = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
///swipe
const [index, setIndex] = useState(0);
const [showMore, setShowMore] = useState(false);
let hasPrev = index > 0;
let hasNext = index < sculptureList.length - 1;
function handlePrevClick() {
  if (hasPrev) {
    setIndex(index - 1);
  }
}

function handleNextClick() {
  if (hasNext) {
    setIndex(index + 1);
  }
}
function handleMoreClick() {
  setShowMore(!showMore);
}
let sculpture = sculptureList[index];
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

          <button onClick={signOut}>Sign out</button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>

      <h1>Jam </h1>                      
      <p> Jam page Email: {user.email}</p>
      <button onClick={handlePrevClick} disabled={!hasPrev}>Previous</button>
      <button onClick={handleNextClick} disabled={!hasNext}>Next</button>
      <h2><i>{sculpture.name}</i> by {sculpture.artist}</h2>
      <h3>({index + 1} of {sculptureList.length})</h3>
      <button onClick={handleMoreClick}>{showMore ? 'Hide' : 'Show'} details</button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />

    </>
  );
};

export default Jam;
