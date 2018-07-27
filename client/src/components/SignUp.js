import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class SignUp extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      password: "",
      redirect: false
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    let newUser = {
      username: this.state.username,
      password: this.state.password
    }

    axios.post("/api/user/register", newUser)
      .then(res => {
        this.setState({
          redirect: true
        })
      })
      .catch(err => console.log(err));
  }

  render() {

    if(this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div className="signUp">
        <div className="signUpContainer">
          <h1>Sign Up</h1>
          <input
          type="text"
          name="username"
          placeholder="username"
          onChange={this.onChange}>
          </input>
          <input
          type="password"
          name="password"
          placeholder="password"
          onChange={this.onChange}>
          </input>
          <div className="submit" onClick={this.handleSubmit}>Submit</div>
          <p>Already have an account? Click <Link to="/"><span className="here">here</span></Link> to log in</p>
        </div>
      </div>
    );
  }
}

export default SignUp;