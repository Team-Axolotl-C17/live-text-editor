import React, { Component } from "react";
import auth from "../Components/auth";
import Input from "../Components/Input";
import Logo from "../Components/Logo";
import { Link, withRouter } from "react-router-dom";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: ''
    }
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  clickHandler(event){
    event.preventDefault();
    console.log(this.props);
    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        username: this.props.username, 
        password: this.props.password
      })
    }).
    then(res => {
      if (res.status === 401) {
        this.setState({ warning: "username and password do not match please try again" })
      } else if (res.status === 406) {
               this.setState({ warning: "username is not found try again" })
               this.props.history.push('/login')
             } else {
                 auth.login(() => {
                   this.props.history.push("/") 
                 })
               }
    })
  };

  render() {
    return (
      <div className='Modal'>
        <h2>LOGIN</h2>
        <Logo/>
        <form onSubmit={this.clickHandler}>
          <Input
            type='text' 
            value={this.props.username} 
            name='username' 
            onChange={(e) => this.props.handleInputChange(e)} 
            placeholder='username' 
          />
          <Input 
            type='password' 
            value={this.props.password} 
            name='password' 
            onChange={(e) => this.props.handleInputChange(e)} 
            placeholder='password'
          />
          <Link to="/register">Register</Link>
            <p>{this.state.warning}</p>
          <button type="submit" value="submit">SUBMIT</button>
        </form>
        
      </div>
    );
  }

};

export default withRouter(LoginContainer)