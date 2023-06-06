import _ from "lodash";
import Cell from "./Cell";

class Piece {
  constructor(positionArr, color) {
    this.cells = positionArr.map((pos) => new Cell(pos[0], pos[1], color));
  }

  getPositionAfterMove(direction) {
    const cellsCopy = _.cloneDeep(this.cells);
    switch (direction) {
      case "down":
        cellsCopy.forEach((e) => e.moveDown());
        break;

      case "right":
        cellsCopy.forEach((e) => e.moveRight());
        break;

      case "left":
        cellsCopy.forEach((e) => e.moveLeft());
        break;

      default:
        break;
    }
    return cellsCopy.map((e) => [e.x, e.y]);
  }

  move(direction) {
    switch (direction) {
      case "down":
        this.cells.forEach((e) => e.moveDown());
        break;

      case "right":
        this.cells.forEach((e) => e.moveRight());
        break;

      case "left":
        this.cells.forEach((e) => e.moveLeft());
        break;

      default:
        break;
    }
  }

  rotateClockwise() {
    const center = this.cells[1];
    const centerCoord = [center.x, center.y];
    this.cells.forEach((cell) => cell.rotateClockwise(centerCoord));
  }
}

export default Piece;