class Circle {
  constructor(coords, radius, dx, dy) {
    this.x = coords.x;
    this.y = coords.y;
    this.radius = radius;
    this.dx = this.getVelocity();
    this.dy = this.getVelocity();
    this.colors = [
      "#E36DF2", "#BE63BF", "#FA9EF7", "#2AECEF",
      "#1FADB0", "#FF009B", "#FF131C", "#F2E85C",
      "#97ED8A", "#45BF55", "#FF5B1F", "#F4F1D7"
    ];
    this.color = this.getColor();
  }

  getVelocity() {
    let velocity = ((Math.random() * 0.5) * 2) + 1;
    let coinflip = Math.floor(Math.random() * 2);
    return coinflip === 0 ? velocity : -velocity;
  }

  getColor() {
    let picker = Math.floor(Math.random() * this.colors.length);
    return this.colors[picker];
  }

  draw(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  update(canvas) {
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
      // LOGIC TO PLAY SOUND GOES HERE
    }
    this.x += this.dx;
    if(this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
      // LOGIC TO PLAY SOUND GOES HERE
    }
    this.y += this.dy;
  }
}

export default Circle;