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
      code: ' ',
      consoleOutput: 'Console output will display here',
      room: null, 
      roomOptions: []
    };
    
    // Listen for 'code sent from server'
    socket.on('code sent from server', socketMsg => {
      this.displayCode(socketMsg.code);
    });
    
    this.emitCode = this.emitCode.bind(this);
    this.displayCode = this.displayCode.bind(this);
    this.runCode = this.runCode.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.saveProject = this.saveProject.bind(this);
  }

  // emit 'room' event when component mounts
  componentDidMount() {
    console.log('hi')
    console.log('username', this.props.username)
    fetch('/getProjects', {
      method: 'POST',
      body: JSON.stringify({
        username: this.props.username
      })
    })
    .then(res => {
      return res.json();
    })
    .then(json => {
      this.setState({ roomOptions : json });
      console.log(json)
    })
  }

  /* Join or leave room */
  joinRoom(e) {
    this.setState({ room: e.target.value });
    socket.emit('join room', 
      { room: e.target.value }
    );
  }

  leaveRoom() {
    this.setState({ room: null, code: '' });
    socket.emit('leave room', 
      { room: this.state.room }
    );
  }

  /* Save project */
  saveProject(e) {
    fetch('/saveExistingProject', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ 
        project_name: this.state.room, 
        body: this.state.code })
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.error(err))
  }

  // Write code & receive up-to-date code
  emitCode(codeInLocalEditor) { 
    // Input is (1) props.code currently being displayed in CodeMirror and (2) any changes typed by the user.
    this.setState({ code : codeInLocalEditor }) 
    // Rather than directly displaying any changes, changes are set in state then displayed in Editor
    socket.emit('client edited code', {
      room: this.state.room,
      newCode: codeInLocalEditor
    });
  }

  // Receive payload.newCode from server; update this.state.code, to be displayed on Editor
  // "payload.newCode" contains entire text that needs to be displayed in the Editor
  displayCode(codeFromSocket) { 
    this.setState({ code: codeFromSocket });
    console.log('displayCode, codeFromSocket:', codeFromSocket)
  }

  // 
  runCode(code) {
    this.setState({ consoleOutput: eval(code) }, () =>
      console.log(this.state.consoleOutput)
    );
  }

  render() {
    return (
      <div>
        <h1>Current Room: {this.state.room}</h1>
        <button value='project1' onClick={(e) => this.joinRoom(e)}>Project1</button>
        <button value='Project2' onClick={(e) => this.joinRoom(e)}>Project2</button>
        <button onClick={(e) => this.leaveRoom(e)}>Leave Project</button>
        <button onClick={(e) => this.saveProject(e)}>Save Project</button>
        <Editor
          code={this.state.code}
          room={this.state.room}
          emitCode={this.emitCode.bind(this)}
          runCode={this.runCode}
          consoleOutput={this.state.consoleOutput}
        />
      </div>
    );
  }
}

export default EditorContainer;
