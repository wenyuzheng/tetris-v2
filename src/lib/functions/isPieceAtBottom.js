const isPieceAtBottom = (piece, board) => {
  const position = piece.getPositionAfterMove("down");
  const result = position.some((p) =>
    board.cells.some((e) => e.x === p[0] && e.y === p[1])
  );

  return piece.cells.some((e) => e.y === 0 || result);
};

export default isPieceAtBottom;
