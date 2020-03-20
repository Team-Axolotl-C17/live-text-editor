import React, { Component } from 'react';
import EditorContainer from './Containers/Editor-Container';
import DocsContainer from './Containers/Docs-Container';
import UserContainer from './Containers/User-Container';
import LoginContainer from './Containers/Login-Container';

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      loggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    // const { loggedIn } = e.target;
    this.setState({ loggedIn: true });
  }
  render() {
    return (
      <div>
        {!this.state.loggedIn && (
          <div>
            <LoginContainer
              loggedIn={this.state.loggedIn}
              onClick={this.handleChange}
            />
          </div>
        )}
        {this.state.loggedIn && (
          <div>
            <DocsContainer />
            <EditorContainer value={this.state.value} />
            <UserContainer />
          </div>
        )}
      </div>
    );
  }
}

export default App;
