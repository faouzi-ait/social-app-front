import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  //const time = useSelector((state) => state.login.user.userInfo);
  //const { isAuthenticated } = useSelector((state) => state.login);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
