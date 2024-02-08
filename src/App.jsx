import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext } from "./contexts/authContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Jam from "./components/Jam";
import Fuses from "./components/Fuses";



import UserProfile from "./components/Profile";
import NotFound from "./components/NotFound";

import PublicRoute from "./routes/Public";
import PrivateRoute from "./routes/Private";
import "./app.css";

function App() {
  const { loading, user } = useContext(AuthContext);

  console.log("user", user);

  return (
    <>
      <Router>
        {!loading && (
          <Routes>
            {/* public and restricted routes */}
            <Route element={<PublicRoute restricted user={user} />}>
              <Route element={<Login />} path="/login" />
              <Route element={<Signup />} path="/signup" />
            </Route>

            {/* public and not restricted routes */}
            <Route element={<PublicRoute user={user} />}>
              <Route element={<Home />} path="/" />

            </Route>

            {/* protected routes */}
            <Route path="/" element={<PrivateRoute />}>
              <Route element={<UserProfile />} path="/profile" exact />
              <Route element={<Jam />} path="/Jam" exact />
              <Route element={<Fuses />} path="/Fuses" exact />


            </Route>

            {/* Not Found routes */}
            <Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
