import React, { Component } from "react";
import auth from "../Components/auth";
import Input from "../Components/Input";
import Logo from "../Components/Logo";

class RegisterContainer extends Component {
  constructor() {
    super();
    this.state = {
      user: { 
              firstname: '',
              lastname: '',
              username: '',
              password: '',
      }, 
      msg: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    const { user } = this.state;
    this.setState({
      user: {...user, [name]: value}
    });
    console.log('firstname: ', this.state.user.firstname);
    console.log('last name: ', this.state.user.lastname);
    console.log('username: ', this.state.user.username);
    console.log('password: ', this.state.user.password);
  }

  clickHandler(event){
    event.preventDefault();
    console.log(this.state);
    fetch('/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(this.state.user)
    })
    .then(res => {
      if (res.status === 409) {
        this.setState({
          msg: "username already in use try again" 
        })
        this.props.history.push("/register");
        console.log('this.state.msg: ', this.state.msg);
      }
    })
    .then(auth.login(() => {
        this.props.history.push("/login");
      }))
  };

  render() {
    return (
      <div className='Modal'>
        <h2>REGISTER</h2>
        <Logo/>
        <form onSubmit={this.clickHandler}>
        <Input
            type='text' 
            value={this.state.user.firstname} 
            name='firstname' 
            onChange={this.handleInputChange} 
            placeholder='firstname' 
          />
          <Input
            type='text' 
            value={this.state.user.lastname} 
            name='lastname' 
            onChange={this.handleInputChange} 
            placeholder='lastname' 
          />
          <Input
            type='text' 
            value={this.state.user.username} 
            name='username' 
            onChange={this.handleInputChange} 
            placeholder='username' 
          />
          <Input
            type='password' 
            value={this.state.user.password} 
            name='password' 
            onChange={this.handleInputChange} 
            placeholder='password'
          />
          <h3>{this.state.msg}</h3>
          <button type="submit" value="submit">SUBMIT</button>
        </form>
      </div>
    );
  }

};

export default RegisterContainer