import pieces from "../constants/Pieces";

const getPiecePositionsOnGrid = (width, height, pieceName) => {
  const piece = pieces[pieceName];

  let positions = [];
  for (let i = 0; i < piece.shape.length; i++) {
    const arr = piece.shape[i];
    const startX = Math.floor((width - arr.length) / 2);
    const h = height - 1 - i;

    for (let j = 0; j < arr.length; j++) {
      if (arr[j] !== 0) positions.push([startX + j, h]);
    }
  }

  return positions;
};

export default getPiecePositionsOnGrid;
