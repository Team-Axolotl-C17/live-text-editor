import React, { Component } from "react";
import EditorContainer from '../Containers/Editor-Container';
import DocsContainer from '../Containers/Docs-Container';
import UserContainer from '../Containers/User-Container';
import auth from "./auth";

class MainApp extends Component {
	constructor() {
    super();
    this.state = {
      value: ''
    };
  }
	render(){
  return (
    <div className="main">
      <h1>Main App</h1>
      <div>
				<DocsContainer />
				<EditorContainer value={this.state.value} />
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