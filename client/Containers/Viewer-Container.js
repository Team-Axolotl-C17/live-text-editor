import React, { Component } from 'react';
import io from 'socket.io-client';
import Editor from '../Components/Editor';
const socket = io('localhost:3000');


class ViewerContainer extends Component {
  constructor () {
    super();
    this.state = {
        displayCode: '',
        consoleOutput: 'Console output will display here',
    };
    socket.on('code sent from server', payload => {
      this.updateCodeFromSockets(payload);
    });
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
    this.runCode = this.runCode.bind(this);
   };

  componentDidMount() {
    socket.emit('room', { room: this.props.rooms[1] });
  }

  // Update local state to match text input from other clients
  updateCodeFromSockets(payload) {
    this.setState({ displayCode: payload.newCode });
  }

  updateCodeinState(text) {
    this.setState({ code: text }, () => console.log(this.state.code));
    socket.emit('coding', {
      room: this.props.rooms[1],
      newCode: text
    });
  }

  runCode(code) {
    this.setState({ consoleOutput: eval(code) }, () =>
      console.log(this.state.consoleOutput)
    );
  }

  render () {
      return (
        <div>
        <Editor
          code={this.state.displayCode}
          runCode={this.runCode}
          consoleOutput={this.state.consoleOutput}
        />
      </div>
      );
  }
}

export default ViewerContainer;

