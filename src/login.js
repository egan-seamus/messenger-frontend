import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import './login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const baseURL = "http://localhost:8000/"
const loginURL = "messaging/login/"

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      loggedIn: false
    }
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  showError = (message) => {
    this.setState({errors: message});
  }

  handleSubmitButton(e) {
    e.preventDefault();
    axios.post(baseURL.concat(loginURL), {
      username: this.state.username,
      password: this.state.password
    }, {withCredentials : true})
      .then((response) => {
        console.log(response);
        console.log("authenticating");
        axios.get(baseURL.concat("messaging/authenticate/"), 
        {withCredentials : true})
          .then((response) => {
            console.log(response);
            this.setState ({
              loggedIn : true
            })
          }).catch((response) => {
            this.showError("Login failed. Do you have cookies enabled?");
          })
      }).catch((response) => {
        this.showError("Incorrect username or password");
      });

  }

  render() {
    if(!this.state.loggedIn) {
    return (
      <div class="background">
        <div class="loginText">
          Log In
            </div>
        <h2 class="errorMessage">{this.state.errors}</h2>
        <div class="homeButtons">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Enter username" onChange={(e) => this.handleUsernameChange(e)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => this.handlePasswordChange(e)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => this.handleSubmitButton(e)}>
              Submit
  </Button>
          </Form>
        </div>

      </div>

    );
    }
    else {
      return(
        <Redirect to="/messages" />
      );
    }
  }
}

function Login() {
  return (
    <div>
      <LoginForm></LoginForm>
    </div>
  );
}

export default Login;