import React, { Component } from 'react';
import io from 'socket.io-client';
import Editor from '../Components/Editor';
const socket = io('localhost:3000');

class EditorContainer extends Component {
  constructor() {
    super();
    this.state = {
      consoleOutput: 'Console output will display here',
    };
    this.runCode = this.runCode.bind(this);
  }

  runCode(code) {
    this.setState({ consoleOutput: eval(code) }, () =>
      console.log(this.state.consoleOutput)
    );
  }

  // TODO: Update the state to match what other clients have already put there.
  render() {
    return (
      <div>
        <Editor
          code={this.props.code}
          updateCodeinState={this.props.updateCodeinState}
          runCode={this.runCode}
          consoleOutput={this.state.consoleOutput}
        />
      </div>
    );
  }
}

export default EditorContainer;
