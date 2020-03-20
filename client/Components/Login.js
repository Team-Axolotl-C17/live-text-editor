import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Login extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <h2>Login</h2>
                <input id="username" />
                <input id="password" />
                <button type="button" onClick={this.props.onClick} >Log In</button>
            </div>
        )
    }
}

export default Login;