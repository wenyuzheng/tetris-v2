const placePieceAtBottom = (piece, board) => {
  const bottomYArr = piece.cells.map((cell) => {
    const sameColumnCells = board.cells
      .filter((e) => e.x === cell.x)
      .map((k) => k.y);

    return sameColumnCells.length === 0 ? 0 : Math.max(...sameColumnCells) + 1;
  });

  const bottomY = Math.max(...bottomYArr);
  const baseY = Math.min(...piece.cells.map((e) => e.y));
  let position = piece.cells.map((cell) => [cell.x, bottomY + cell.y - baseY]);

  let result = validate(position, board);
  while (!result) {
    position.forEach((p) => p[1]--);
    result = validate(position, board);
  }

  return position;
};

const validate = (position, board) => {
  return position.some(
    (p) =>
      p[1] === 0 || board.cells.some((e) => e.x === p[0] && e.y === p[1] - 1)
  );
};

export default placePieceAtBottom;
