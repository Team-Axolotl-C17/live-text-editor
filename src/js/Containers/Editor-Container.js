import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Editor from '../Components/Editor';

class EditorContainer extends Component {
    constructor() {
        super();
        
    }
    render() {
        return(
            <div>
               <Editor value={this.props.value} onChange={this.props.onChange} />
            </div>
        )
    }
}

export default EditorContainer;