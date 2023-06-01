class Board {
  constructor(width, height, cellsArr, currPiece) {
    this.height = height;
    this.width = width;
    this.cellsArr = cellsArr;
    this.currPiece = currPiece;
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

  moveCurrPiece(direction) {
    this.currPiece.move(direction);
  }
}

export default Board;
