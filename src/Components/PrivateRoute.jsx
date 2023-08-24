import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

const PrivateRoute = ({ component: Component, fallback: Fallback, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Get the authentication state

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Fallback {...props} />
      }
    />
  );
};

export default PrivateRoute;
