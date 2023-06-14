import _ from "lodash";

class Board {
  constructor(width, height, cells = []) {
    this.height = height;
    this.width = width;
    this.cells = cells;
  }

  addCells(cells) {
    this.cells.push(...cells);
  }

  removeSingleFullRow(row) {
    this.cells = this.cells.filter((cell) => cell.y !== row);
    this.cells.forEach((cell) => {
      if (cell.y > row) cell.y--;
    });
  }

  removeFullRows() {
    let fullRowsNum = 0;
    let counter = 0;
    let cellNum = this.cells.filter((cell) => cell.y === counter).length;

    while (cellNum !== 0) {
      cellNum = this.cells.filter((cell) => cell.y === counter).length;
      if (cellNum === this.width) {
        this.removeSingleFullRow(counter);
        fullRowsNum++;
      } else {
        counter++;
      }
    }

    return fullRowsNum;
  }

  isPositionValid(x, y) {
    const exisitingCells = this.cells.filter((e) => e.x === x && e.y === y);
    return y >= 0 && x >= 0 && x < this.width && exisitingCells.length === 0;
  }

  isPositionArrayValid(arr) {
    return arr.every(([x, y]) => this.isPositionValid(x, y));
  }

  areRotatePositionsValid(arr) {
    return arr.every(([x, y]) => {
      const exisitingCells = this.cells.filter((e) => e.x === x && e.y === y);
      return exisitingCells.length === 0;
    });
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
