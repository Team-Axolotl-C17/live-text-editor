import React, { Component } from 'react';
import UserDisplay from '../Components/User-Display';
import User from '../Components/User';

class UserContainer extends Component {
  render() {
    return (
      <div>
        <UserDisplay />
        <User />
        <User />
        <User />
      </div>
    );
  }
}

export default UserContainer;
