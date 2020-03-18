import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

class Editor extends Component {
    constructor(){
        super();
    }
    render() {
        return(
            <div>
                <input value={this.props.value} onChange={this.props.onChange} />
            </div>
        )
    }
}
export default Editor;