import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class EditorContainer extends Component {
    constructor() {
        super();
        
    }
    render() {
        return(
            <div>
                <input
                  type="text"
                  value={this.props.value}
                  onChange={this.props.onChange}
                />
            </div>
        )
    }
}

export default EditorContainer;