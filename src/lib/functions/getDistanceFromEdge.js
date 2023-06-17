const getDistanceFromEdge = (piece, board, direction) => {
  const xArr = piece.cells.map((cell) => cell.x);
  if (direction === "right") {
    return board.width - Math.max(...xArr) - 1;
  } else if (direction === "left") {
    return Math.min(...xArr);
  }

  return 1;
};

export default getDistanceFromEdge;
