import React, { Component } from 'react';
import DocsDisplay from '../Components/Docs-Display';
import Doc from '../Components/Doc';

class DocsContainer extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <DocsDisplay />
                <Doc />
                <Doc />
                <Doc />
            </div>
        )
    }
}

export default DocsContainer;