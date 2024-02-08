import React, { useEffect, useState } from "react";
import firebase from "../firebase";

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ubsubscribe = () => {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log("user", user);
        if (user) setUser(user);
        else setUser(null);
        setLoading(false);
      });
    };
    ubsubscribe();

    return () => ubsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
