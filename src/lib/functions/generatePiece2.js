import _ from "lodash";
import Piece from "../classes/Piece";
import pieces from "../constants/Pieces";
import getPiecePositionsOnGrid from "./getPiecePositionsOnGrid";

const generatePiece2 = (width, height) => {
  const pieceName = _.sample(Object.keys(pieces));
  const positions = getPiecePositionsOnGrid(width, height, pieceName);
  const piece = pieces[pieceName];
  return new Piece(positions, piece.color, piece.centerIndex);
};

export default generatePiece2;
