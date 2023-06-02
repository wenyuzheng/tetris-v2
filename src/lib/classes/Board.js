import _ from "lodash";

class Board {
  constructor(width, height, cellsArr = []) {
    this.height = height;
    this.width = width;
    this.cellsArr = cellsArr;
  }

  addCells(cells) {
    this.cellsArr.push(...cells);
  }

  removeSingleFullRow(row) {
    this.cellsArr = this.cellsArr.filter((cell) => cell.y !== row);
    this.cellsArr.forEach((cell) => {
      if (cell.y > row) cell.y--;
    });
  }

  removeFullRows() {
    let counter = 0;
    let cellNum = this.cellsArr.filter((cell) => cell.y === counter).length;

    while (cellNum !== 0) {
      cellNum = this.cellsArr.filter((cell) => cell.y === counter).length;
      if (cellNum === this.width) {
        this.removeSingleFullRow(counter);
      } else {
        counter++;
      }
    }
  }

  isPositionValid(x, y) {
    const exisitingCells = this.cellsArr.filter((e) => e.x === x && e.y === y);
    return y >= 0 && x >= 0 && x < this.width && exisitingCells.length === 0;
  }

  isPositionArrayValid(arr) {
    return arr.every(([x, y]) => this.isPositionValid(x, y));
  }

  // isValidToMoveCurrPiece(direction) {
  //   const currPieceCopy = _.cloneDeep(this.currPiece);
  //   currPieceCopy.move(direction);
  //   console.log(currPieceCopy.cells);
  //   return currPieceCopy.cells.every((cell) => {
  //     return cell.y >= 0 && cell.x >= 0 && cell.x < this.width;
  //   });
  // }

  // moveCurrPiece(direction) {
  //   this.currPiece.move(direction);
  //   // const currPieceCopy = _.cloneDeep(this.currPiece);
  //   // currPieceCopy.move(direction);
  //   // if (currPieceCopy.)
  // }
}

export default Board;
