import isPieceAtBottom from "./isPieceAtBottom";

const isPieceReachedTop = (piece, board) => {
  return piece.cells.some((cell) => {
    // return board.cellsArr.some((e) => {
    // console.log(piece.cells, board.cellsArr);
    // return (e.x === cell.x && e.y === cell.y) || cell.y >= board.height;
    return isPieceAtBottom(piece, board) && cell.y + 1 >= board.height;
    // });
  });
};

export default isPieceReachedTop;
