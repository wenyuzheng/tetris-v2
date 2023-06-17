class Board {
  constructor(width, height, cells = []) {
    this.height = height;
    this.width = width;
    this.cells = cells;
  }

  addCells(cells) {
    this.cells.push(...cells);
  }

  getFullRows() {
    let fullRows = [];
    let counter = 0;
    let cellNum = this.cells.filter((cell) => cell.y === counter).length;
    while (cellNum !== 0) {
      if (cellNum === this.width) {
        fullRows.push(counter);
      }
      counter++;
      cellNum = this.cells.filter((cell) => cell.y === counter).length;
    }

    return fullRows;
  }

  removeSingleFullRow(row) {
    this.cells = this.cells.filter((cell) => cell.y !== row);
    this.cells.forEach((cell) => {
      if (cell.y > row) cell.y--;
    });
  }

  removeFullRows() {
    const fullRows = this.getFullRows();
    fullRows.reverse().forEach((row) => this.removeSingleFullRow(row));
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
}

export default Board;
