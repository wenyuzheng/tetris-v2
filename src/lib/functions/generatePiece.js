import _ from "lodash";
import Piece from "../classes/Piece";

const generatePiece = (width, height) => {
  const midW = Math.floor(width / 2);
  const h = height - 1;

  const square = {
    positions: [
      [midW, h],
      [midW + 1, h],
      [midW, h - 1],
      [midW + 1, h - 1],
    ],
    color: "red",
  };

  const tube = {
    positions: [
      [midW, h],
      [midW, h - 1],
      [midW, h - 2],
      [midW, h - 3],
    ],
    color: "blue",
    centerIndex: 1,
  };

  const leftL = {
    positions: [
      [midW - 1, h],
      [midW - 1, h - 1],
      [midW, h - 1],
      [midW + 1, h - 1],
    ],
    color: "orange",
    centerIndex: 1,
  };

  const rightL = {
    positions: [
      [midW + 1, h],
      [midW + 1, h - 1],
      [midW, h - 1],
      [midW - 1, h - 1],
    ],
    color: "green",
    centerIndex: 1,
  };

  const hat = {
    positions: [
      [midW, h],
      [midW - 1, h - 1],
      [midW, h - 1],
      [midW + 1, h - 1],
    ],
    color: "purple",
    centerIndex: 2,
  };

  const leftStep = {
    positions: [
      [midW - 1, h],
      [midW, h],
      [midW, h - 1],
      [midW + 1, h - 1],
    ],
    color: "yellow",
    centerIndex: 1,
  };

  const rightStep = {
    positions: [
      [midW + 1, h],
      [midW, h],
      [midW, h - 1],
      [midW - 1, h - 1],
    ],
    color: "cyan",
    centerIndex: 1,
  };

  const pieces = [square, tube, leftL, rightL, hat, leftStep, rightStep];
  const selectedPiece = _.sample(pieces);
  const piece = new Piece(
    selectedPiece.positions,
    selectedPiece.color,
    selectedPiece.centerIndex
  );

  return piece;
};

export default generatePiece;
