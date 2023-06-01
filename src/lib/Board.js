class Board {
  constructor(width, height, cellsArr) {
    this.height = height;
    this.width = width;
    this.cellsArr = cellsArr;
  }

  removeSingleFullRow(row) {
    this.cellsArr = this.cellsArr.filter((cell) => cell.y !== row);
    this.cellsArr.forEach((cell) => {
      if (cell.y > row) cell.y--;
    });
  }

  removeFullRows() {}
}

export default Board;
