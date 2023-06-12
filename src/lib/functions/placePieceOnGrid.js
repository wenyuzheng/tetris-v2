import _ from "lodash";
import Piece from "../classes/Piece";
import pieces from "../constants/Pieces";
import getPiecePositionsOnGrid from "./getPiecePositionsOnGrid";

const placePieceOnGrid = (width, height, pieceName) => {
  const positions = getPiecePositionsOnGrid(width, height, pieceName);
  const piece = pieces[pieceName];
  return new Piece(positions, piece.color, piece.centerIndex, pieceName);
};

export default placePieceOnGrid;
