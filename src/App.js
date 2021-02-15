import React, {Suspense, lazy} from 'react';
import './App.css';
import axios from 'axios';
import Login from './login';
import Register from './register';
import Home from './home'
import MessageMain from './message-main'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const loginPage = Login;
const registerPage = Register;
const homePage = Home;

function MakeCombo(n, i, m) {
  return {username: n, id: i, message: m}
}
const DummyMap = [
  MakeCombo("John", 1, "Hey dude"),
  MakeCombo("Lisa", 2,"what's up"),
  MakeCombo("William", 3,"Have you seen my ipa bro?"),
  MakeCombo("Ben", 4,"a ridiculously long message will be quite nice here \
  so that we can really see what kind of text length these panels can handle"),
  MakeCombo("Sender", 5,"message message message message message"),
  MakeCombo("Sender", 6, "message message message message message"),
  MakeCombo("Sender", 7, "message message message message message"),
  MakeCombo("Sender", 8, "message message message message message"),
  MakeCombo("Sender", 9, "message message message message message"),
  MakeCombo("Sender", 10, "message message message message message"),
  MakeCombo("Sender", 11, "message message message message message"),
  MakeCombo("Sender", 12, "message message message message message")
];

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/login" component={loginPage}/>
        <Route path="/register" component={registerPage}/>
        <Route exact path="/" component={homePage}/>
        <Route path="/messages" render={(props => (
          <MessageMain messages={DummyMap} />
        ))}/>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
