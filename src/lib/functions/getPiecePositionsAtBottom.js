const placePieceAtBottom = (piece, board) => {
  const bottomYArr = piece.cells.map((cell) => {
    const sameColumnCells = board.cells
      .filter((e) => e.x === cell.x)
      .map((k) => k.y);

    return sameColumnCells.length === 0 ? 0 : Math.max(...sameColumnCells) + 1;
  });

  const bottomY = Math.max(...bottomYArr);
  const baseY = Math.min(...piece.cells.map((e) => e.y));
  return piece.cells.map((cell) => [cell.x, bottomY + cell.y - baseY]);
};

export default placePieceAtBottom;
