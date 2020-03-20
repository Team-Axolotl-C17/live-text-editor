import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from '../Components/Login';

class LoginContainer extends Component {
    constructor() {
        super();

    }

    render() {
        return(
            <div>
                <Login logedIn={this.props.logedIn} onClick={this.props.onClick} />
            </div>
        )
    }
}

export default LoginContainer;