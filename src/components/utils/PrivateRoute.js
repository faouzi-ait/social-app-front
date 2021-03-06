import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.login);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
