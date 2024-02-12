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
  const [username, setUsername] = useState('');

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
        console.log(doc.exists)
        if (doc.exists) {
          const userData = doc.data();
          console.log(userData);
          if (userData.profileImageUrl) {
            setProfileImageUrl(userData.profileImageUrl);
          }
          if (userData.username) {
            setUsername(userData.username);
            
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
      <div className="preview-box"> <p> Preview Profile</p>
</div>

      <div className="three-columns">
      <div className="column">
      <p> Hey {username}, Tell us about yourself!</p>
     <div className="bio"> 
      <label className="bio-label">
      Write your bio:
      <textarea className="bio-box" name="postContent" rows={4} cols={40} />
      </label>
      <button className="bio-button" id="submit" >Update Bio </button>
      </div>
      <p> List your skills, so that others can find you!</p>
      <p>Roles:</p>
      <div className="roles">
<label class="container"> Singer
  <input type="checkbox" />
  <span class="checkmark"></span>
  </label>
<label class="container">Rapper
  <input type="checkbox"/>
  <span class="checkmark"></span>
</label>
<label class="container">Producer
  <input type="checkbox"/>
  <span class="checkmark"></span>
</label>
<label class="container">Instrumentalist
  <input type="checkbox"/>
  <span class="checkmark"></span>
</label>
      </div>
      <p>Skills:</p>
      <div className="skills">
<label class="container"> Guitar
  <input type="checkbox" />
  <span class="checkmark"></span>
  </label>
<label class="container">Bass Guitar
  <input type="checkbox"/>
  <span class="checkmark"></span>
</label>
<label class="container">Piano
  <input type="checkbox"/>
  <span class="checkmark"></span>
</label>
<label class="container">Drums
  <input type="checkbox"/>
  <span class="checkmark"></span>
</label>
      </div>
    </div>
      
      
      <div className="column">
      <p> Email: {user.email}</p>
        <div className="fields">
      <img src={profileImageUrl} alt="Display Picture" className="display-picture" />
      <input type="file" className="upload-file" onChange={handleFileChange}/>
      <button className="upload-button" id="upload" onClick={handleUpload}>Upload Image</button>
    </div> 
      </div>

      
      <div className="column">     
       <p> Add your music here!</p>
    </div>

   

    </div>
      
    </>
  );
};

export default Profile;
