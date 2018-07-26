import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/"><h1>SYNTHONIUM</h1></Link>
        <ul className="nav">
          <h2>Sign Up</h2>
          <Link to="/post"><h2>Create Post</h2></Link>
          <h2>Logout</h2>
        </ul>
      </div>
    );
  }
}

export default Header;