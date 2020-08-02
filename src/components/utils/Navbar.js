import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/login_actions";
import { NavLink } from "react-router-dom";

function onPaths(paths) {
  return (match, location) => {
    return paths.includes(location.pathname);
  };
}

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  return (
    <div className="nav_wrapper">
      <NavLink to="/" isActive={onPaths(["/"])} activeClassName="selected">
        home
      </NavLink>

      {isAuthenticated ? (
        <NavLink
          to="/"
          isActive={onPaths(["/logout"])}
          activeClassName="selected"
          onClick={() => dispatch(logoutAction())}
        >
          logout
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          isActive={onPaths(["/login"])}
          activeClassName="selected"
        >
          login
        </NavLink>
      )}

      {!isAuthenticated && (
        <NavLink
          to="/signup"
          isActive={onPaths(["/signup"])}
          activeClassName="selected"
        >
          signup
        </NavLink>
      )}
    </div>
  );
}

export default Navbar;
