import Piece from "../classes/Piece";
import pieces from "../constants/Pieces";
import getPiecePositionsOnGrid from "./getPiecePositionsOnGrid";

const placePieceOnGrid = (
  width,
  height,
  pieceName,
  partsNum = 1,
  partIndexFromBottom = 1
) => {
  const positions = getPiecePositionsOnGrid(
    width,
    height,
    pieceName,
    partsNum,
    partIndexFromBottom
  );
  const piece = pieces[pieceName];
  return new Piece(positions, piece.color, piece.centerIndex, pieceName);
};

export default placePieceOnGrid;
