import _ from "lodash";
import generatePiece2 from "../../../lib/functions/generatePiece2";
import Piece from "../../../lib/classes/Piece";

describe("generatePiece2", () => {
  test("eg 1", () => {
    _.sample = (array) => array[0];
    const result = generatePiece2(10, 20);
    const expected = new Piece(
      [
        [4, 19],
        [5, 19],
        [4, 18],
        [5, 18],
      ],
      "red"
    );
    expect(result).toEqual(expected);
  });
});
