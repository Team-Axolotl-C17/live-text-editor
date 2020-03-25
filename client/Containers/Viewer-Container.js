import React, { Component } from 'react';
import io from 'socket.io-client';
import Editor from '../Components/Editor';
const socket = io('localhost:3000');


class ViewerContainer extends Component {
  constructor () {
    super();
    this.state = {
        consoleOutput: 'Console output will display here',
    };
    this.runCode = this.runCode.bind(this);
   };

  runCode(code) {
    this.setState({ consoleOutput: eval(code) }, () =>
      console.log(this.state.consoleOutput)
    );
  }

  render () {
      return (
        <div>
        <Editor
          code={this.props.code}
          runCode={this.runCode}
          consoleOutput={this.state.consoleOutput}
        />
      </div>
      );
  }
}

export default ViewerContainer;

