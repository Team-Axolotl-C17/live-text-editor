import React, { Component } from 'react';
import Login from '../Components/Login';

class LoginContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Login loggedIn={this.props.loggedIn} onClick={this.props.onClick} />
      </div>
    );
  }
}

export default LoginContainer;
