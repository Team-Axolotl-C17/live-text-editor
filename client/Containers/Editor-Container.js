import React, { Component } from 'react';
import io from 'socket.io-client';
const socket = io('localhost:3000');

// CodeMirror imports
import { Controlled as CodeMirror } from 'react-codemirror2';
import '../assets/codemirror-5.52.0/mode/javascript/javascript';
import '../assets/codemirror-5.52.0/lib/codemirror.css';
import '../assets/codemirror-5.52.0/theme/dracula.css';

class EditorContainer extends Component {
  // Temporarily placing socket logic inside this container component
  // Can move elsewhere when refactoring, but note that socket logic needs to be handled in a single place
  constructor() {
    super();
    this.state = {
      code: 'wut',
      room: 'default'
    };
    // Listen for 'code sent from server'
    socket.on('code sent from server', payload => {
      this.updateCodeFromSockets(payload);
    });
    this.updateCodeinState = this.updateCodeinState.bind(this);
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
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
  // TODO: Update the state to match what other clients have already put there. Otherwise
  render() {
    const options = {
      mode: 'javascript',
      theme: 'dracula',
      lineNumbers: true
    };
    return (
      <div>
        <h1>Get Ready to Code</h1>
        <CodeMirror
          className="codemirror"
          value={this.state.code}
          options={options}
          onBeforeChange={(editor, data, value) => {
            this.updateCodeinState(value);
          }}
        />
      </div>
    );
  }
}

export default EditorContainer;
