const isGameOver = (piece, board) => {
  return piece.cells.some((cell) => {
    return board.cells.some((e) => {
      return e.x === cell.x && e.y === cell.y;
    });
  });
};

export default isGameOver;
