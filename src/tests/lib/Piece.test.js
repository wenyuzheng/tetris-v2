import Piece from "../../lib/Piece";

describe("Piece", () => {
  test("getPositionAfterMove down", () => {
    const piecePositions = [
      [0, 1],
      [1, 1],
      [1, 0],
      [2, 0],
    ];
    const piece = new Piece(piecePositions);
    const result = piece.getPositionAfterMove("down");
    const expected = [
      [0, 0],
      [1, 0],
      [1, -1],
      [2, -1],
    ];
    expect(result).toEqual(expected);
    const originalPiecePositions = piece.cells.map((e) => [e.x, e.y]);
    expect(originalPiecePositions).toEqual(piecePositions);
  });

  test("getPositionAfterMove right", () => {
    const piecePositions = [
      [0, 1],
      [1, 1],
      [1, 0],
      [2, 0],
    ];
    const piece = new Piece(piecePositions);
    const result = piece.getPositionAfterMove("right");
    const expected = [
      [1, 1],
      [2, 1],
      [2, 0],
      [3, 0],
    ];
    expect(result).toEqual(expected);
    const originalPiecePositions = piece.cells.map((e) => [e.x, e.y]);
    expect(originalPiecePositions).toEqual(piecePositions);
  });

  test("getPositionAfterMove left", () => {
    const piecePositions = [
      [0, 1],
      [1, 1],
      [1, 0],
      [2, 0],
    ];
    const piece = new Piece(piecePositions);
    const result = piece.getPositionAfterMove("left");
    const expected = [
      [-1, 1],
      [0, 1],
      [0, 0],
      [1, 0],
    ];
    expect(result).toEqual(expected);
    const originalPiecePositions = piece.cells.map((e) => [e.x, e.y]);
    expect(originalPiecePositions).toEqual(piecePositions);
  });

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
