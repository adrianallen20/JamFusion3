import React, { useContext, useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import firebase from "../firebase";
import logoImage from '../assets/jflogo.png'; 


const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [file,setFile] = useState(null);
  const [profileImageUrl,setProfileImageUrl] = useState('');

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
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      
    }
  };

   const handleUpload = async () => {
    const storageRef = firebase.storage().ref();
    //img direcotry 
    const fileRef = storageRef.child(`profileImages/${user.uid}/${file.name}`);
    await fileRef.put(file);

    const fileUrl = await fileRef.getDownloadURL();
    //updating users document
    const userDocRef = firebase.firestore().collection('users').doc(user.uid);
    await userDocRef.update({profileImageUrl: fileUrl,});
    //setting url to image
  setProfileImageUrl (fileUrl);
  alert("Image uploaded successfully!");
   };

   useEffect(() => {
    if (user) {
      const userDocRef = firebase.firestore().collection('users').doc(user.uid);
      //grabbing users documents
      userDocRef.get().then(doc =>{
        if (doc.exists) {
          const userData = doc.data();
          if (userData.profileImageUrl) {
            setProfileImageUrl(userData.profileImageUrl);
            
          }
          
        }
      });

      
    }
   },[user]);


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
      <h1>Hello, {user.email}</h1>
    <div className="fields">
  <img src={profileImageUrl} alt="Display Picture" className="display-picture" />
  <input type="file" className="upload-file" onChange={handleFileChange}/>
  <button className="upload-button" id="upload" onClick={handleUpload}>Upload Image</button>
</div>

      
    </>
  );
};

export default Profile;
