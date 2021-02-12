import React, {Suspense, lazy} from 'react';
import './App.css';
import axios from 'axios';
import Login from './login';
import Register from './register';
import Home from './home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const loginPage = Login;
const registerPage = Register;
const homePage = Home;

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/login" component={loginPage}/>
        <Route path="/register" component={registerPage}/>
        <Route exact path="/" component={homePage}/>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
