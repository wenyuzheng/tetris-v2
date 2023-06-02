import _ from "lodash";

const isPieceAtBottom = (piece, board) => {
  const pos = piece.getPositionAfterMove("down");
  const r = pos.some((p) =>
    board.cellsArr.some((e) => {
      return e[0] === p[0] && e[1] === p[1];
    })
  );

  return piece.cells.some((e) => {
    return e.y === 0 || r;
  });
};

export default isPieceAtBottom;
