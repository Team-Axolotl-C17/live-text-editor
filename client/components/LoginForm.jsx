import React, { Component } from 'react';
import Input from 'Input';

class LoginForm extends Component {
  render() {
    return (
      <div className='LoginForm'>
        <Logo />
        <form onSubmit= { this.props.onSubmit }>
        <Input type='text' name='username' placeholder='username' />
        <Input type='password' name='password' placeholder='password' />
        <button> Sign In</button>
        </form>
      </div>
    )
  }
}

export default LoginForm;