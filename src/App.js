import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { setIsUserAuthenticated } from "./redux/actions/login_actions";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Error404 from "./components/pages/Error404";
import PrivateRoute from "./components/utils/PrivateRoute";

import NavBar from "./components/utils/Navbar";

import "./sass/index.scss";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.login);

  useEffect(() => {
    document.title = "Social Times";
    const token = localStorage.getItem("AIS_ADMIN_TOKEN");
    const user = localStorage.getItem("CURRENT_USER");

    if (token && user) {
      dispatch(setIsUserAuthenticated(true));
    }
  }, [dispatch]);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute
          exact
          path="/login"
          component={Login}
          auth={isAuthenticated}
        />
        <PrivateRoute
          exact
          path="/signup"
          component={Signup}
          auth={isAuthenticated}
        />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
