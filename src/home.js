import Button from 'react-bootstrap/Button';
import React from 'react';
import './home.css'
import logo from './logo.png'

function onLoginButtonClick(event) {
    window.location.href = '/login';
}

function onRegisterButtonClick(event) {
    window.location.href = '/register'
}

function home() {
    return (
        <div class="background">
            <div class="homeButtons">
                <Button variant="primary" type="submit" onClick={(e) => onLoginButtonClick(e)}>Log In</Button>
                <Button variant="primary" type="submit" onClick={(e) => onRegisterButtonClick(e)}>Register</Button>
            </div>
            <div class="logo">
                <img src={logo}></img>
            </div>
        </div>
    );
}

export default home;