import _ from "lodash";
import Cell from "./Cell";

class Piece {
  constructor(positionArr, color, centerIndex, name) {
    this.name = name;
    this.cells = positionArr.map((pos) => new Cell(pos[0], pos[1], color));
    this.centerIndex = centerIndex;
  }

  getPositionAfterMove(direction, distance = 1) {
    const cellsCopy = _.cloneDeep(this.cells);
    switch (direction) {
      case "down":
        cellsCopy.forEach((e) => e.moveDown(distance));
        break;

      case "right":
        cellsCopy.forEach((e) => e.moveRight(distance));
        break;

      case "left":
        cellsCopy.forEach((e) => e.moveLeft(distance));
        break;

      case "rotate":
        if (this.centerIndex !== undefined) {
          const center = cellsCopy[this.centerIndex];
          const centerCoord = [center.x, center.y];
          cellsCopy.forEach((cell) => cell.rotateClockwise(centerCoord));
        }
        break;

      default:
        break;
    }

    return cellsCopy.map((e) => [e.x, e.y]);
  }

  move(direction, distance = 1) {
    switch (direction) {
      case "down":
        this.cells.forEach((e) => e.moveDown(distance));
        break;

      case "right":
        this.cells.forEach((e) => e.moveRight(distance));
        break;

      case "left":
        this.cells.forEach((e) => e.moveLeft(distance));
        break;

      case "up":
        this.cells.forEach((e) => e.moveUp(distance));
        break;

      default:
        break;
    }
  }

  rotateClockwise() {
    if (this.centerIndex !== undefined) {
      const center = this.cells[this.centerIndex];
      const centerCoord = [center.x, center.y];
      this.cells.forEach((cell) => cell.rotateClockwise(centerCoord));
    }
  }
}

export default Piece;
