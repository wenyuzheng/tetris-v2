const isPieceOutOfBoard = (piece, board) => {
  return piece.cells.some(
    (cell) =>
      cell.x < 0 ||
      cell.x >= board.width ||
      cell.y < 0 ||
      cell.y >= board.height
  );
};

export default isPieceOutOfBoard;
