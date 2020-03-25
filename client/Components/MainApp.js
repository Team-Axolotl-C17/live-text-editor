import React, { Component } from "react";
import EditorContainer from '../Containers/Editor-Container';
import ViewerContainer from '../Containers/Viewer-Container';
import DocsContainer from '../Containers/Docs-Container';
import UserContainer from '../Containers/User-Container';
import auth from "./auth";

class MainApp extends Component {
	constructor() {
    super();
    this.state = {
      value:'',
      room: ['Axolotl', 'Axolotl2']
    };
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
          <EditorContainer id = 'main-editor'  rooms = {this.state.room} value = {this.state.value} />
          </div>
          <div className = 'editor-container'>
          <ViewerContainer id = 'view-screen' rooms = {this.state.room} value = {this.state.value}  />
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