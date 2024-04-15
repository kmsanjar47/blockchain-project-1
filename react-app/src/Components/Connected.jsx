import React from 'react';

const Connected = (props) => {
    return (
        <div className="LoginContainer">
            <h1 className="connected-header">You are connected to Metamask</h1>
            <p className = "connected-account">Metamask Account: {props.account}</p>
        </div>
    );
};

export default Connected;
