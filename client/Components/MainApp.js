import React, { Component } from 'react';
import EditorContainer from '../Containers/Editor-Container';
import DocsContainer from '../Containers/Docs-Container';
import UserContainer from '../Containers/User-Container';
import auth from './Auth';

class MainApp extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }
  render() {
    return (
      <div>
        <h1>Live Text Editor</h1>
        <br></br>
        <div>
          <EditorContainer value={this.state.value} />
        </div>
        <button
          onClick={() => {
            auth.logout(() => {
              this.props.history.push('/');
            });
          }}>
          Logout
        </button>
      </div>
    );
  }
}

export default MainApp;
