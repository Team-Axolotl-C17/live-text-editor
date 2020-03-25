import React, { Component } from "react";
import EditorContainer from '../Containers/Editor-Container';
import ViewerContainer from '../Containers/Viewer-Container';
import DocsContainer from '../Containers/Docs-Container';
import UserContainer from '../Containers/User-Container';
import auth from "./auth";
import io from 'socket.io-client';
const socket = io('localhost:3000');

class MainApp extends Component {
	constructor() {
    super();
    this.state = {
      value:'',
      room: 'Axolotl',
      code: 'Start coding', // code that user edits; will be emitted TO other sockets
      viewerCode: '' // code in right container that will be updated FROM other sockets
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
    console.log(this.props.rooms);

    socket.emit('room', { room: this.state.room });
  }

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
    this.setState({ viewerCode: payload.newCode });
  }

	render(){
  return (
    <div>
      <h1>Main App</h1>
      <div>
				<DocsContainer />
        <h1>Current Room: {this.state.room}</h1>
        <div className = 'editor'>
          <div className = 'editor-container'>
          <EditorContainer id = 'main-editor'  
            rooms = {this.state.room} 
            value = {this.state.value}
            code = {this.state.code}
            updateCodeinState = {this.updateCodeinState} />
          </div>
          <div className = 'editor-container'>
          <ViewerContainer id = 'view-screen' 
          rooms = {this.state.room} 
          value = {this.state.value}
          code = {this.state.viewerCode}  />
          </div>
        </div>
				<UserContainer />
      </div>
      <button
        onClick={() => {
          auth.logout(() => {
            this.props.history.push("/");
          });
        }}
      >
      Logout
      </button>
    </div>
	);
			}
};

export default MainApp