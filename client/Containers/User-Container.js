import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Options from '../Components/Options';
import Load from '../Components/Load';
import Delete from '../Components/Delete';
import Save from '../Components/Save';
import Add from '../Components/Add';

class UserContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Options />
                <Load />
                <Save /> 
                <Add /> 
                <Delete />
            </div>
        )
    }
}

export default UserContainer;