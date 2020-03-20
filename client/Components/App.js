import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EditorContainer from '../Containers/Editor-Container';
import DocsContainer from '../Containers/Docs-Container';
import UserContainer from '../Containers/User-Container';
import LoginContainer from '../Containers/Login-Container';

class App extends Component {
    constructor() {
        super();
        this.state = {
            value: "",
            logedIn: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        // const { logedIn } = e.target;
        this.setState({ logedIn: true });
    }
    render() {
        return (
            <div>

            {!this.state.logedIn && (
                <div>
                  <LoginContainer logedIn={this.state.logedIn} onClick={this.handleChange} />
                </div>
            )}
            {this.state.logedIn && (
                <div>
                    <DocsContainer />
                    <EditorContainer value={this.state.value} />
                    <UserContainer />
                </div>
                
                )}
            </div>
        )
    }
}

export default App;