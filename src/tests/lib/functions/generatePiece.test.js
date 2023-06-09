import _ from "lodash";
import generatePiece from "../../../lib/functions/generatePiece";
import Piece from "../../../lib/classes/Piece";

describe("generatePiece", () => {
  test("eg 1", () => {
    _.sample = (array) => array[0];

    const result = generatePiece(5, 8);
    const expected = new Piece(
      [
        [1, 7],
        [2, 7],
        [1, 6],
        [2, 6],
      ],
      "red"
    );
    expect(result).toEqual(expected);
  });

  test("eg 2", () => {
    _.sample = (array) => array[0];

    const result = generatePiece(4, 8);
    const expected = new Piece(
      [
        [1, 7],
        [2, 7],
        [1, 6],
        [2, 6],
      ],
      "red"
    );
    expect(result).toEqual(expected);
  });
});
