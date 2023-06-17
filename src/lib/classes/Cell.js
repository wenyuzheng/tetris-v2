class Cell {
  constructor(x, y, color = "black") {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  moveDown(distance = 1) {
    this.y -= distance;
  }

  moveLeft(distance = 1) {
    this.x -= distance;
  }

  moveRight(distance = 1) {
    this.x += distance;
  }

  moveUp(distance = 1) {
    this.y += distance;
  }

  rotateClockwise(center) {
    const ca = { x: this.x - center[0], y: this.y - center[1] };
    const rotatedCa = { x: ca.y, y: -ca.x };
    this.x = center[0] + rotatedCa.x;
    this.y = center[1] + rotatedCa.y;
  }
}

export default Cell;
