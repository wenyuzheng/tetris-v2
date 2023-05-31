import Cell from "./Cell";

class Piece {
  constructor(positionArr, color) {
    this.cells = positionArr.map((pos) => new Cell(pos[0], pos[1], color));
  }

  moveDown = () => {
    this.cells.forEach((e) => e.moveDown());
  };

  rotateClockwise = () => {
    const center = this.cells[1];
    const centerCoord = [center.x, center.y];
    this.cells.forEach((cell) => cell.rotateClockwise(centerCoord));
  };
}

export default Piece;
