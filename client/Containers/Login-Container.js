import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../Components/Auth';
import Input from '../Components/Input';
import Logo from '../Components/Logo';

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      warning: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
    console.log('username: ', this.state.username);
    console.log('password: ', this.state.password);
  }

  clickHandler(event) {
    event.preventDefault();
    console.log(this.state);
    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        if (res.status === 401) {
          this.setState({
            warning: 'username and password do not match please try again',
          });
        } else if (res.status === 406) {
          this.setState({ warning: 'username is not found try again' });
          this.props.history.push('/login');
        } else return res.json();
      })
      .then(({ username }) => {
        auth.login(() => {
          this.props.history.push('/');
        }, username);
      });
  }

  render() {
    return (
      <div className="Modal">
        <h2>LOGIN</h2>
        <Logo />
        <form onSubmit={this.clickHandler}>
          <Input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleInputChange}
            placeholder="username"
          />
          <Input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            placeholder="password"
          />
          <Link to="/register">Register</Link>
          <p>{this.state.warning}</p>
          <button type="submit" value="submit">
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

export default LoginContainer;
