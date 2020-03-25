import React, { Component } from "react";
import EditorContainer from '../Containers/Editor-Container';
import ViewerContainer from '../Containers/Viewer-Container';
import DocsContainer from '../Containers/Docs-Container';
import UserContainer from '../Containers/User-Container';
import auth from "./auth";
import io from 'socket.io-client';
const socket = io('localhost:3000'); // make connection from client side to 3000

class MainApp extends Component {
	constructor() {
    super();
    this.state = {
      room: 'Axolotl',
      code: 'Start coding', // code that user edits on (left) Editor-Container; will be emitted TO other sockets
      viewerCode: '' // code displayed in (right) Viewer-Container that will be updated FROM other sockets
    };


    // Listen for 'code sent from server', which is emitted from the server socket when a 'coding' event is detected 
    socket.on('code sent from server', payload => {
      this.updateCodeFromSockets(payload);
    });
    this.updateCodeinState = this.updateCodeinState.bind(this);
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
  }

   // Emits 'room' event, sending this.state.room to the socket in the server when component mounts
   // socket on server.js is listening for this 'room' event
  componentDidMount() {
    socket.emit('room', { room: this.state.room });
  }

  // Handle local state updates - changes code in state from user typed input (is  prop drilled down to Editor.js which reads in the user input value)
  // Emits a 'coding' event which socket on server.js is listening for and sends current room and text input
  updateCodeinState(text) {
    this.setState({ code: text }, () => console.log(this.state.code));
    socket.emit('coding', {
      room: this.state.room,
      newCode: text
    });
  }

  // Update local state to match text input from other clients
  // Reconfigured to update viewerCode in state rather than code in state to reflect code displayed on Viewer-Container, rather than own screen in Editor-Container
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
            code = {this.state.code}
            updateCodeinState = {this.updateCodeinState} />
          </div>
          <div className = 'editor-container'>
          <ViewerContainer id = 'view-screen' 
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