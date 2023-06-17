import _ from "lodash";
import placePieceOnGrid from "./placePieceOnGrid";
import pieces from "../constants/Pieces";

export const getRandomPieceName = () => _.sample(Object.keys(pieces));

const generatePiece = (width, height) => {
  const pieceName = getRandomPieceName();
  return placePieceOnGrid(width, height, pieceName);
};

export default generatePiece;
