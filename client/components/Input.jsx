import React, { Component } from 'react';

class Input extends React.Component {
  render() {
    return (
      <div className='Input'>
        <input type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } required autocomplete='false'/>
      </div>
    )
  }
}

export default Input;