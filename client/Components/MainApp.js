import React, { Component } from "react";
import EditorContainer from '../Containers/Editor-Container';
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
    <div>
      <h1>TEST</h1>
      <div>
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