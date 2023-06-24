import _ from "lodash";
import placePieceOnGrid from "./placePieceOnGrid";
import pieces from "../constants/Pieces";

export const getRandomPieceName = (array = []) => {
  let random = _.sample(Object.keys(pieces));
  if (array.filter((e) => e === random).length === 2) {
    random = getRandomPieceName(array);
  }
  return random;
};

const generatePiece = (width, height) => {
  const pieceName = getRandomPieceName();
  return placePieceOnGrid(width, height, pieceName);
};

export default generatePiece;
