import Piece from "../../lib/Piece";

describe("Piece", () => {
  test("move down", () => {
    const positionArr = [
      [0, 4],
      [1, 4],
      [2, 4],
      [3, 4],
    ];
    const tube = new Piece(positionArr);
    tube.move("down");
    const result = tube.cells.map((e) => [e.x, e.y]);
    const expected = [
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3],
    ];
    expect(result).toEqual(expected);
  });

  test("move left", () => {
    const positionArr = [
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
    ];
    const tube = new Piece(positionArr, "blue");
    tube.move("left");
    const result = tube.cells.map((e) => [e.x, e.y]);
    const expected = [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ];
    expect(result).toEqual(expected);
  });

  test("move right", () => {
    const positionArr = [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ];
    const tube = new Piece(positionArr, "blue");
    tube.move("right");
    const result = tube.cells.map((e) => [e.x, e.y]);
    const expected = [
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
    ];
    expect(result).toEqual(expected);
  });

  test("rotateClockwise", () => {
    const positionArr = [
      [0, 3],
      [1, 3], // center
      [2, 3],
      [3, 3],
    ];
    const tube = new Piece(positionArr, "blue");
    tube.rotateClockwise();
    const result = tube.cells.map((e) => [e.x, e.y]);
    const expected = [
      [1, 4],
      [1, 3],
      [1, 2],
      [1, 1],
    ];
    expect(result).toEqual(expected);
  });
});
