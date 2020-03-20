import React, { Component } from 'react';
import Editor from '../Components/Editor';
import io from 'socket.io-client';
const socket = io('localhost:3000');

class EditorContainer extends Component {
  // Temporarily placing socket logic inside this container component
  // Can move elsewhere when refactoring, but note that socket logic needs to be handled in a single place
  constructor() {
    super();
    this.state = {
      code: '',
      room: 'default'
    };
    // Listen for 'code sent from server'
    socket.on('code sent from server', payload => {
      this.updateCodeFromSockets(payload);
    });
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
  }

  // emit 'room' event when component mounts
  componentDidMount() {
    socket.emit('room', { room: this.state.room });
  }

  // TODO: add logic for switching rooms (need to implement in UI first)

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

  render() {
    return (
      <div>
        <h1>Editor</h1>
        <Editor
          style={{
            "height": "75%",
            "width": "100%"
          }
          }
          code={this.state.code}
          room={this.state.room}
          updateCodeinState={this.updateCodeinState.bind(this)}
        />
      </div>
    );
  }
}

export default EditorContainer;
