class Cell {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    // occupied?
  }

  moveDown = () => {
    this.y++;
  };
}

export default Cell;
