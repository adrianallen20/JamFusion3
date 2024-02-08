import React from "react";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Not Found</h1>

      <h1>
        <Link to="/">Go Back to Home</Link>
      </h1>
    </div>
  );
};

export default NotFound;
