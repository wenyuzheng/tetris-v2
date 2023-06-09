const isGameOver = (piece, board) => {
  return piece.cells.some((cell) => {
    return board.cellsArr.some((e) => {
      return e.x === cell.x && e.y === cell.y;
    });
  });
};

export default isGameOver;
