import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/login_actions";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { FiPlus, FiMinus } from "react-icons/fi";
import NewComment from "./AddNewPost";

import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

function onPaths(paths) {
  return (match, location) => {
    return paths.includes(location.pathname);
  };
}

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <>
      {" "}
      <div className="nav_wrapper">
        {isAuthenticated ? (
          <>
            <Tippy content="Add a comment">
              <a href="# " onClick={() => setOpen(!open)}>
                {!open ? <FiPlus /> : <FiMinus />}
              </a>
            </Tippy>
            <Tippy content="Logout">
              <NavLink
                to="/"
                isActive={onPaths(["/logout"])}
                activeClassName="selected"
                onClick={() => dispatch(logoutAction())}
              >
                <FiLogOut />
              </NavLink>
            </Tippy>
          </>
        ) : (
          <Tippy content="Login">
            <NavLink
              to="/login"
              isActive={onPaths(["/login"])}
              activeClassName="selected"
            >
              <FiLogIn />
            </NavLink>
          </Tippy>
        )}

        {!isAuthenticated && (
          <Tippy content="Signup">
            <NavLink
              to="/signup"
              isActive={onPaths(["/signup"])}
              activeClassName="selected"
            >
              <FiUserPlus />
            </NavLink>
          </Tippy>
        )}
      </div>
      {open && (
        <div>
          <NewComment setOpen={setOpen} />
        </div>
      )}
    </>
  );
}

export default Navbar;
