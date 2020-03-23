import React, { Component } from "react";

class Input extends Component {
  render() {
    return (
      <div>
        <input 
          type={this.props.type}
          value={this.props.value}
          name={this.props.name}
          onChange={this.props.onChange} 
          placeholder={this.props.placeholder}
          required
        />
      </div>
    )
  }
}

export default Input