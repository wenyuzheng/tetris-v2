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
    const result = getPiecePositionsOnGrid(4, 2, "tube", 3, 3);
    const expected = [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ];
    expect(result).toEqual(expected);
  });

  test("eg 3", () => {
    const result = getPiecePositionsOnGrid(10, 9, "square", 3, 2);
    const expected = [
      [4, 5],
      [5, 5],
      [4, 4],
      [5, 4],
    ];
    expect(result).toEqual(expected);
  });

  test("eg 4", () => {
    const result = getPiecePositionsOnGrid(10, 9, "square", 3, 1);
    const expected = [
      [4, 2],
      [5, 2],
      [4, 1],
      [5, 1],
    ];
    expect(result).toEqual(expected);
  });

  test("eg 4", () => {
    const result = getPiecePositionsOnGrid(10, 9, "square", 3, 3);
    const expected = [
      [4, 8],
      [5, 8],
      [4, 7],
      [5, 7],
    ];
    expect(result).toEqual(expected);
  });
});
