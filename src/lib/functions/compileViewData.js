const compileViewData = () => {
  let result = {
    board: {},
    holdPiece: {},
    queue: {},
    highlight: this.highlightRows,
    lines: this.lines,
    score: this.score,
    level: this.level,
    start: this.start,
    pause: this.pause,
    music: this.isMusicOn,
    sound: this.isSoundOn,
  };

  this.board.cells.forEach(
    (cell) => (result["board"][`${cell.x}-${cell.y}`] = cell.color)
  );
  const bottomPositions = getPiecePositionsAtBottom(this.piece, this.board);
  bottomPositions.forEach(
    (e) =>
      (result["board"][`${e[0]}-${e[1]}`] = {
        ghost: this.piece.cells[0].color,
      })
  );
  this.piece.cells.forEach(
    (cell) => (result["board"][`${cell.x}-${cell.y}`] = cell.color)
  );

  for (let i = 1; i <= this.queuePieceNameArr.length; i++) {
    const queueName = this.queuePieceNameArr[i - 1];
    const queuePiece = placePieceOnGrid(4, 20, queueName, 5, i);
    queuePiece.cells.forEach(
      (cell) => (result["queue"][`${cell.x}-${cell.y}`] = cell.color)
    );
  }

  if (this.heldPieceName) {
    const heldPiece = placePieceOnGrid(4, 3, this.heldPieceName);
    heldPiece.cells.forEach(
      (cell) => (result["holdPiece"][`${cell.x}-${cell.y}`] = cell.color)
    );
  }

  return result;
};

export default compileViewData;
