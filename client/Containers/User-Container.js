import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserDisplay from '../Components/User-Display';
import User from '../Components/User';

class UserContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <UserDisplay />
                <User />
                <User />
                <User />
            </div>
        )
    }
}

export default UserContainer;