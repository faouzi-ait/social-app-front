import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { setIsUserAuthenticated } from './redux/actions/login_actions';
import { getProfileAction } from './redux/actions/profile_actions';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Error404 from './components/pages/Error404';
import PrivateRoute from './components/utils/PrivateRoute';
import ProtectedRoute from './components/utils/ProtectedRoute';

import NavBar from './components/utils/Navbar';

import './sass/index.scss';

function App() {
  const dispatch = useDispatch();

  // const { token_reducer } = useSelector((state) => state);
  // console.log(token_reducer);

  useEffect(() => {
    document.title = 'Social Times';
    const token = localStorage.getItem('AIS_ADMIN_TOKEN');

    const decodedUser = jwt_decode(token);
    // console.log(decodedUser);
    console.log(decodedUser.slice(1, -1));

    if (token) {
      dispatch(setIsUserAuthenticated(true));
      dispatch(getProfileAction());
    }
  }, [dispatch]);

  return (
    <Router>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/home" component={Home} />
        <PrivateRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/signup" component={Signup} />
        <Redirect from="/" to="home" />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
