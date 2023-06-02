class Cell {
  constructor(x, y, color = "black") {
    this.x = x;
    this.y = y;
    this.color = color;
    // occupied?
  }

  moveDown() {
    this.y--;
  }

  moveLeft() {
    this.x--;
  }

  moveRight() {
    this.x++;
  }

  rotateClockwise(center) {
    const ca = { x: this.x - center[0], y: this.y - center[1] };
    const rotatedCa = { x: ca.y, y: -ca.x };
    this.x = center[0] + rotatedCa.x;
    this.y = center[1] + rotatedCa.y;
  }
}

export default Cell;
