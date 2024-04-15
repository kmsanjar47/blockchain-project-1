import React from 'react';

const Login = (props) => {
    return (
        <div className="LoginContainer">
            <h1 className="welcome-message">Welcome to the COVID-19 Patient Tracking System</h1>
            <button className="login-button" onClick={props.connectWallet}>Connect Wallet</button>
        </div>
    );
};

export default Login;
