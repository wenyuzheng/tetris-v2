import Piece from "../../lib/Piece";

describe("Piece", () => {
  test("moveDown", () => {
    const positionArr = [
      [0, 4],
      [1, 4],
      [2, 4],
      [3, 4],
    ];
    const tube = new Piece(positionArr, "blue");

    tube.moveDown();
    const result = tube.cells.map((e) => [e.x, e.y]);
    const expected = [
      [0, 5],
      [1, 5],
      [2, 5],
      [3, 5],
    ];
    expect(result).toEqual(expected);
  });

  test("rotateClockwise", () => {
    const positionArr = [
      [4, 0],
      [4, 1], // center
      [4, 2],
      [4, 3],
    ];
    const tube = new Piece(positionArr, "blue");
    tube.rotateClockwise();
    const result = tube.cells.map((e) => [e.x, e.y]);
    const expected = [
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
    ];
    expect(result).toEqual(expected);
  });
});
