import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <Header />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
