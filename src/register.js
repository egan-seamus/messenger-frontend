import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import './register.css';
import axios from 'axios';

const baseURL = "http://localhost:8000/"
const registerURL = "messaging/register/"

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword : "",
            errors : ""
        }
    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handlePasswordConfirmChange = (e) => {
        this.setState({ confirmPassword: e.target.value });
    }

    showError = (message) => {
        this.setState({errors: message});
    }

    handleSubmitButton(e) {
        e.preventDefault();
        console.log("Username: ", this.state.username);
        console.log("Password: ", this.state.password);
        if(this.state.password != this.state.confirmPassword) {
            this.showError("Passwords do not match");
            console.log("bad passwords")
        }
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
            <div class="registerBackground">
                <div class="loginText"> Register </div>
                <h2 class="errorMessage">{this.state.errors}</h2>
                <div class="homeButtons">
                    <Form>
                        <Form.Group controlId="formRegisterUsername">
                            <Form.Label>username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" onChange={(e) => this.handleUsernameChange(e)} />
                        </Form.Group>

                        <Form.Group controlId="formRegisterPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => this.handlePasswordChange(e)} />
                        </Form.Group>
                        <Form.Group controlId="formRegisterPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => this.handlePasswordConfirmChange(e)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={(e) => this.handleSubmitButton(e)}>Submit</Button>
                    </Form>
                </div>

            </div>
        );
    }
}

function Register() {
    return (
            <LoginForm></LoginForm>
    );
}

export default Register;