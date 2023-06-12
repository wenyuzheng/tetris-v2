import _ from "lodash";
import placePieceOnGrid from "../../../lib/functions/placePieceOnGrid";
import Piece from "../../../lib/classes/Piece";

describe("placePieceOnGrid", () => {
  test("eg 1", () => {
    const result = placePieceOnGrid(10, 20, "square");
    const expected = new Piece(
      [
        [4, 19],
        [5, 19],
        [4, 18],
        [5, 18],
      ],
      "red",
      undefined,
      "square"
    );
    expect(result).toEqual(expected);
  });
});
