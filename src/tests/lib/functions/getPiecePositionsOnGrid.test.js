import getPiecePositionsOnGrid from "../../../lib/functions/getPiecePositionsOnGrid";

describe("getPiecePositionsOnGrid", () => {
  test("eg 1", () => {
    const result = getPiecePositionsOnGrid(10, 20, "square");
    const expected = [
      [4, 19],
      [5, 19],
      [4, 18],
      [5, 18],
    ];
    expect(result).toEqual(expected);
  });

  test("eg 2", () => {
    const result = getPiecePositionsOnGrid(4, 2, "tube");
    const expected = [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ];
    expect(result).toEqual(expected);
  });
});
