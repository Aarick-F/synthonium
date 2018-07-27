import React, { Component } from "react";
import Circle from "../Circle";
import Tone from "tone";

class Canvas extends Component {
  constructor() {
    super();
    this.runCanvas = true;
    this.circles = [];
    this.synth = undefined;

    // Function Binding
    this.animate = this.animate.bind(this);
    this.makeCircle = this.makeCircle.bind(this);
    this.clear = this.clear.bind(this);

    // Component State
    this.state = {
      user: "TestUser",
      postTitle: "Test Post",
      synthType: "poly",
      postNotes: "A4,D4,G4,C4"
    }
  }

  componentDidMount() {
    this.myCanvas.height = this.boxSize.clientHeight;
    this.myCanvas.width = this.boxSize.clientWidth;

    window.addEventListener("resize", () => {
      if(!this.runCanvas) {
        return;
      }
      this.circles = [];
      this.myCanvas.height = this.boxSize.clientHeight;
      this.myCanvas.width = this.boxSize.clientWidth;
    });

    this.animate();
  }

  componentWillUnmount() {
    this.runCanvas = false;
    this.circles = [];
  }

  makeCircle(e) {
    e.preventDefault();
    let coords = {
      x: this.myCanvas.width / 2,
      y: window.innerHeight - this.myCanvas.height
    }
    let newCircle = new Circle(coords, this.getRadius());
    this.circles.push(newCircle);
  }

  getRadius() {
    return Math.floor(Math.random() * 30) + 10;
  }

  clear(e) {
    e.preventDefault();
    this.circles = [];
  }

  animate() {
    if(!this.runCanvas) {
      return;
    }
    requestAnimationFrame(this.animate);
    let c = this.myCanvas.getContext("2d");
    c.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    this.circles.forEach(circle => {
      circle.draw(this.myCanvas);
      circle.update(this.myCanvas, this.synth, this.state.postNotes.split(","));
    });
  }

  render() {

  // Chooses synth type based on component state
  switch(this.state.synthType) {
    case "synth":
      this.synth = new Tone.Synth().toMaster();
      break;
    case "pluck":
      this.synth = new Tone.PluckSynth().toMaster();
      break;
    case "poly":
      this.synth = new Tone.PolySynth().toMaster();
      break;
    case "duo":
      this.synth = new Tone.DuoSynth().toMaster();
      break;
  }

    return (
      <div className="postWrapper">
        <div className="post">
          <div className="cycle">
            <i className="fas fa-arrow-left fa-2x"></i>
          </div>
          <div className="postInfo">
            <h1>{this.state.user} - {this.state.postTitle}</h1>
            <div className="clear" onClick={this.clear}>CLEAR</div>
          </div>
          <div className="cycle">
            <i className="fas fa-arrow-right fa-2x"></i>
          </div>
        </div>
        <div className="canvasWrapper" ref={boxSize => this.boxSize = boxSize}>
          <canvas ref={myCanvas => this.myCanvas = myCanvas} onClick={this.makeCircle}></canvas>
        </div>
      </div>
    );
  }
}

export default Canvas;