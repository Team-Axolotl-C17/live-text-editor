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
      roomOptions: [],
      user_id: null,
      roomOptionsOther: []
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
      const data = { username : this.props.username }
      console.log('componentDidMount: ', data)
      fetch(`/getProjects?username=${this.props.username}`, {
        method: 'GET',
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log('hello', json);
        this.setState({ roomOptions : json });
      })

      fetch(`/getUserId?username=${this.props.username}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ user_id : json.user_id })
      })

      fetch(`/getAllProjects?username=${this.props.username}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ roomOptionsOther : json })
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

  // Add Project to DB logic

  addProject(e) {
    //change state.room to input form state
    console.log('project name', document.getElementById('newProjectInput').value);
    fetch('/addNewProject', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ 
        project_name: document.getElementById('newProjectInput').value, 
        user_id: this.state.user_id,
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json.project_name, ' added')
      this.setState({ roomOptions: [...this.state.roomOptions, json ]})
    })
    .catch(err => console.error(err))
  }

  // Delete project Logic
  
  deleteProject(e) {
    const project_id = this.state.roomOptions.filter((r) => this.state.room === r.project_name)[0].project_id;
    console.log
    fetch('/deleteExistingProject', {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        project_id: project_id
      })
    })
    .then(() => {
      this.setState({ roomOptions: this.state.roomOptions.reduce((acc, r) => {
        if(this.state.room !== r.project_name) {
          acc.push(r)
        }
        return acc;
      }, [])
      });
    })
    .then(() => {
      this.leaveRoom();
    })
    .catch(err => console.log(err))
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
    const projectButtons = [];
    this.state.roomOptions.forEach((project, i) => {
      const button = <button key={i} value={project.project_name} onClick={(e) => this.joinRoom(e)}>{project.project_name}</button>
      projectButtons.push(button)
    })
    const otherProjectButtons = [];
    this.state.roomOptionsOther.forEach((project, i) => {
      const button = <button key={i} value={project.project_name} onClick={(e) => this.joinRoom(e)}>{project.project_name}</button>
      projectButtons.push(button)
    })
    return (
      <div>
        <h1>Current Room: {this.state.room}</h1>
        <span>{this.props.username}'s Existing Projects: </span>{projectButtons}
        <span>Join Other People's Projects: </span>{otherProjectButtons}
        <br/>
        <button onClick={(e) => this.leaveRoom(e)}>Leave: {this.state.room}</button>
        <button onClick={(e) => this.saveProject(e)}>Save: {this.state.room}
        </button>
        <button onClick={(e) => this.deleteProject(e)}>Delete: {this.state.room}</button>
        <br/>
        <input type="text" id="newProjectInput" required minLength="4" size="20"/>
        <button onClick={(e) => this.addProject(e)}>Add New Project</button>
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
