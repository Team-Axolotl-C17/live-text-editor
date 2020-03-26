import React, { Component } from 'react';
import io from 'socket.io-client';
import Editor from '../Components/Editor';
const socket = io('localhost:3000');

class EditorContainer extends Component {
  // Temporarily placing socket logic inside this container component
  // Can move elsewhere when refactoring, but note that socket logic needs to be handled in a single place
  constructor() {
    super();
    this.state = {
      code: 'Start coding!',
      consoleOutput: 'Console output will display here',
      room: 'Panda Whale'
    };
    // Listen for 'code sent from server'
    socket.on('code sent from server', payload => {
      this.updateCodeFromSockets(payload);
    });
    this.updateCodeinState = this.updateCodeinState.bind(this);
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
    this.runCode = this.runCode.bind(this);
  }

  // emit 'room' event when component mounts
  componentDidMount() {
    socket.emit('room', { room: this.state.room });
  }

  // TODO: add logic for switching rooms (need to implement in UI first)
  // Use in editorDidMount?

  // Handle local state updates
  updateCodeinState(text) {
    this.setState({ code: text }, () => console.log(this.state.code));
    socket.emit('coding', {
      room: this.state.room,
      newCode: text
    });
  }

  // Update local state to match text input from other clients
  updateCodeFromSockets(payload) {
    this.setState({ code: payload.newCode });
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
        <h1>Current Room: {this.state.room}</h1>
        <Editor
          code={this.state.code}
          room={this.state.room}
          updateCodeinState={this.updateCodeinState.bind(this)}
          runCode={this.runCode}
          consoleOutput={this.state.consoleOutput}
        />
      </div>
    );
  }
}

export default EditorContainer;
