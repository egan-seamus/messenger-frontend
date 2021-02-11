import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import './App.css';
import axios from 'axios';

const baseURL = "http://localhost:8000/"
const loginURL = "messaging/login/"

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : ""
    }
  }

  handleUsernameChange =(e) => {
    this.setState({username : e.target.value});
  }

  handlePasswordChange =(e) => {
    this.setState({password : e.target.value});
  }

  handleSubmitButton(e) {
    e.preventDefault();
    console.log("Username: ", this.state.username);
    console.log("Password: ", this.state.password);
    axios.post(baseURL.concat(loginURL), {
      username : this.state.username,
      password : this.state.password
    })
    .then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="username" placeholder="Enter username"  onChange={(e) => this.handleUsernameChange(e)}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => this.handlePasswordChange(e)}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => this.handleSubmitButton(e)}>
          Submit
  </Button>
      </Form>
    );
  }
}

function App() {
  return (
    <div className="App">
      <LoginForm></LoginForm>
    </div>
  );
}

export default App;
