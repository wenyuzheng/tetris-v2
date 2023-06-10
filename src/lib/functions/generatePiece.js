// import _ from "lodash";
// import Piece from "../classes/Piece";

// const generatePiece = (width, height) => {
//   const midW = Math.floor(width / 2) - 1;
//   const h = height - 1;

//   const square = [
//     [midW, h],
//     [midW + 1, h],
//     [midW, h - 1],
//     [midW + 1, h - 1],
//   ];

//   const tube = [
//     [midW, h],
//     [midW, h - 1],
//     [midW, h - 2],
//     [midW, h - 3],
//   ];

//   const leftL = [
//     [midW - 1, h],
//     [midW - 1, h - 1],
//     [midW, h - 1],
//     [midW + 1, h - 1],
//   ];

//   const rightL = [
//     [midW + 1, h],
//     [midW + 1, h - 1],
//     [midW, h - 1],
//     [midW - 1, h - 1],
//   ];

//   const hat = [
//     [midW, h],
//     [midW - 1, h - 1],
//     [midW, h - 1],
//     [midW + 1, h - 1],
//   ];

//   const leftStep = [
//     [midW - 1, h],
//     [midW, h],
//     [midW, h - 1],
//     [midW + 1, h - 1],
//   ];

//   const rightStep = [
//     [midW + 1, h],
//     [midW, h],
//     [midW, h - 1],
//     [midW - 1, h - 1],
//   ];

//   const pieces = [square, tube, leftL, rightL, hat, leftStep, rightStep];
//   const colours = ["red", "blue", "orange", "green", "purple"];
//   const piece = new Piece(_.sample(pieces), _.sample(colours));

//   return piece;
// };

// export default generatePiece;

import _ from "lodash";
import Piece from "../classes/Piece";

const generatePiece = (width, height) => {
  const midW = Math.floor(width / 2) - 1;
  const h = height - 1;

  const square = {
    positions: [
      [midW, h],
      [midW + 1, h],
      [midW, h - 1],
      [midW + 1, h - 1],
    ],
  };

  const tube = {
    positions: [
      [midW, h],
      [midW, h - 1],
      [midW, h - 2],
      [midW, h - 3],
    ],
    centerIndex: 1,
  };

  const leftL = {
    positions: [
      [midW - 1, h],
      [midW - 1, h - 1],
      [midW, h - 1],
      [midW + 1, h - 1],
    ],
    centerIndex: 1,
  };

  const rightL = {
    positions: [
      [midW + 1, h],
      [midW + 1, h - 1],
      [midW, h - 1],
      [midW - 1, h - 1],
    ],
    centerIndex: 1,
  };

  const hat = {
    positions: [
      [midW, h],
      [midW - 1, h - 1],
      [midW, h - 1],
      [midW + 1, h - 1],
    ],
    centerIndex: 2,
  };

  const leftStep = {
    positions: [
      [midW - 1, h],
      [midW, h],
      [midW, h - 1],
      [midW + 1, h - 1],
    ],
    centerIndex: 1,
  };

  const rightStep = {
    positions: [
      [midW + 1, h],
      [midW, h],
      [midW, h - 1],
      [midW - 1, h - 1],
    ],
    centerIndex: 1,
  };

  const pieces = [square, tube, leftL, rightL, hat, leftStep, rightStep];
  const colours = ["red", "blue", "orange", "green", "purple"];
  const selectedPiece = _.sample(pieces);
  const piece = new Piece(
    selectedPiece.positions,
    _.sample(colours),
    selectedPiece.centerIndex
  );

  return piece;
};

export default generatePiece;
