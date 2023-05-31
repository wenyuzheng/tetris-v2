import Cell from "./Cell";

class Piece {
  constructor(positionArr, color) {
    this.cells = positionArr.map((pos) => new Cell(pos[0], pos[1], color));
  }

  moveDown = () => {
    this.cells.forEach((e) => e.moveDown());
  };

  rotateClockwise = () => {
    // this.cells.
  };
}

export default Piece;
