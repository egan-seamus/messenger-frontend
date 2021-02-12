import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import './App.css';
import axios from 'axios';

const baseURL = "http://localhost:8000/"
const registerURL = "messaging/register/"

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
        console.log("Username: ", this.state.username);
        console.log("Password: ", this.state.password);
        axios.post(baseURL.concat(registerURL), {
            username: this.state.username,
            password: this.state.password
        })
            // const options = {
            //   method: 'POST',
            //   body: JSON.stringify({
            //     username: this.state.username,
            //     password: this.state.password
            //   })
            // }
            // fetch(baseURL.concat(loginURL), options)
            .then((response) => {
                console.log(response);
            });
    }

    render() {
        return (

            <Form>
                <Form.Group controlId="formRegisterUsername">
                    <Form.Label>username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" onChange={(e) => this.handleUsernameChange(e)} />
                </Form.Group>

                <Form.Group controlId="formRegisterPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => this.handlePasswordChange(e)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => this.handleSubmitButton(e)}>Submit</Button>
            </Form>
        );
    }
}

function Register() {
    return(
        <div>
            <h1>Register</h1>
            <LoginForm></LoginForm>
        </div>
    );
}

export default Register;