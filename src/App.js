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

function MakeCombo(n, m) {
  return {username: n, message: m}
}
const DummyMap = [
  MakeCombo("John", "Hey dude"),
  MakeCombo("Lisa", "what's up"),
  MakeCombo("William", "Have you seen my ipa bro?"),
  MakeCombo("Ben", "a ridiculously long message will be quite nice here \
  so that we can really see what kind of text length these panels can handle"),
  MakeCombo("Sender", "message message message message message"),
  MakeCombo("Sender", "message message message message message"),
  MakeCombo("Sender", "message message message message message"),
  MakeCombo("Sender", "message message message message message"),
  MakeCombo("Sender", "message message message message message"),
  MakeCombo("Sender", "message message message message message"),
  MakeCombo("Sender", "message message message message message"),
  MakeCombo("Sender", "message message message message message")
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
