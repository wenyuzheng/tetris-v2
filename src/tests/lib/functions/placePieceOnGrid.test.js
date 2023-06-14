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

  test("eg 2", () => {
    const result = placePieceOnGrid(10, 20, "square", 3, 3);
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

  test("eg 3", () => {
    const result = placePieceOnGrid(10, 9, "square", 3, 2);
    const expected = new Piece(
      [
        [4, 5],
        [5, 5],
        [4, 4],
        [5, 4],
      ],
      "red",
      undefined,
      "square"
    );
    expect(result).toEqual(expected);
  });

  test("eg 4", () => {
    const result = placePieceOnGrid(10, 9, "square", 3, 1);
    const expected = new Piece(
      [
        [4, 2],
        [5, 2],
        [4, 1],
        [5, 1],
      ],
      "red",
      undefined,
      "square"
    );
    expect(result).toEqual(expected);
  });
});
