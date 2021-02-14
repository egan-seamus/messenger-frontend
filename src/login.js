import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import './login.css';
import axios from 'axios';

const baseURL = "http://localhost:8000/"
const loginURL = "messaging/login/"

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
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
          }).catch((error) =>{console.log(error)})
      }).catch((error) =>{console.log(error)});

  }

  render() {
    return (
      <div class="background">
        <div class="loginText">
          Log In
            </div>
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
}

function Login() {
  return (
    <div>
      <LoginForm></LoginForm>
    </div>
  );
}

export default Login;