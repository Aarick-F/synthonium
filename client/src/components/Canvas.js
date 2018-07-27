import React, { Component } from "react";
import Circle from "../Circle";

class Canvas extends Component {
  constructor() {
    super();
    this.runCanvas = true;
    this.circles = [];

    // Function Binding
    this.animate = this.animate.bind(this);
    this.makeCircle = this.makeCircle.bind(this);
    this.clear = this.clear.bind(this);
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
      circle.update(this.myCanvas);
    });
  }

  render() {
    return (
      <div className="postWrapper">
        <div className="post">
          <div className="cycle">
            <i className="fas fa-arrow-left fa-2x"></i>
          </div>
          <div className="postInfo">
            <h1>UsernameGoesHere :( - PostTitleGoesHere</h1>
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