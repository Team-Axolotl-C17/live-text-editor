import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EditorContainer from '../Containers/Editor-Container';
import DocsContainer from '../Containers/Docs-Container';
import UserContainer from '../Containers/User-Container';

class App extends Component {
    constructor() {
        super();
        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { value } = e.target;
        this.setState(() => {
            return {
                value
            };
        })
    }
    render() {
        return (
            <div>
                <DocsContainer />
                <EditorContainer value={this.state.value} onChange={this.handleChange}/>
                <UserContainer />
            </div>
        )
    }
}

export default App;