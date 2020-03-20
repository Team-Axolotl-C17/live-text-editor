import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EditorContainer from './Containers/Editor-Container';
import './app.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState(() => {
      return {
        value
      };
    });
  }
  render() {
    return (
      <div className="app">
        <EditorContainer
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default App;
