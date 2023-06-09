const pieceOutOfBoardDirection = (piece, board) => {
  for (let i = 0; i < piece.cells.length; i++) {
    const cell = piece.cells[i];

    if (cell.x < 0) return "right";
    else if (cell.x >= board.width) return "left";
    else if (cell.y < 0) return "up";
    else if (cell.y >= board.height) return "down";
  }

  return false;
};

export default pieceOutOfBoardDirection;
