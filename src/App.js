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

    if (token) {
      dispatch(setIsUserAuthenticated(true));
      dispatch(getProfileAction());

      console.log(token.slice(1, -1));

      const formattedToken = token.slice(1, -1);
      const decodedUser = jwt_decode(formattedToken);

      console.log('ISSUE AT: ', decodedUser.iat);
      console.log('EXPIRED AT: ', decodedUser.exp);
      console.log('CURRENT TIME: ', Date.parse(new Date()));
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
