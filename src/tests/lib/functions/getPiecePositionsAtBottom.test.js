import Board from "../../../lib/classes/Board";
import Cell from "../../../lib/classes/Cell";
import Piece from "../../../lib/classes/Piece";
import getPiecePositionsAtBottom from "../../../lib/functions/getPiecePositionsAtBottom";

describe("getPiecePositionsAtBottom", () => {
  test("eg 1", () => {
    const board = new Board(5, 8, []);
    const piece = new Piece([
      [4, 7],
      [3, 7],
    ]);
    const result = getPiecePositionsAtBottom(piece, board);
    const expected = [
      [4, 0],
      [3, 0],
    ];
    expect(result).toEqual(expected);
  });

  test("eg 2", () => {
    const board = new Board(5, 8, [new Cell(3, 0)]);
    const piece = new Piece([
      [4, 7],
      [3, 7],
    ]);
    const result = getPiecePositionsAtBottom(piece, board);
    const expected = [
      [4, 1],
      [3, 1],
    ];
    expect(result).toEqual(expected);
  });

  test("eg 3", () => {
    const board = new Board(5, 8, [new Cell(3, 0), new Cell(3, 1)]);
    const piece = new Piece([
      [4, 7],
      [3, 7],
    ]);
    const result = getPiecePositionsAtBottom(piece, board);
    const expected = [
      [4, 2],
      [3, 2],
    ];
    expect(result).toEqual(expected);
  });

  test("eg 4", () => {
    const board = new Board(5, 8, [new Cell(3, 0), new Cell(3, 1)]);
    const piece = new Piece(
      [
        [4, 7],
        [3, 7],
        [4, 6],
        [3, 6],
      ],
      "red",
      undefined,
      "square"
    );
    const result = getPiecePositionsAtBottom(piece, board);
    const expected = [
      [4, 3],
      [3, 3],
      [4, 2],
      [3, 2],
    ];
    expect(result).toEqual(expected);
  });

  test("eg 5", () => {
    const board = new Board(5, 8, [new Cell(3, 0), new Cell(3, 1)]);
    const piece = new Piece(
      [
        [4, 7],
        [3, 7],
        [4, 6],
        [3, 5],
      ],
      "red",
      undefined,
      "square"
    );
    const result = getPiecePositionsAtBottom(piece, board);
    const expected = [
      [4, 4],
      [3, 4],
      [4, 3],
      [3, 2],
    ];
    expect(result).toEqual(expected);
  });

  test("eg 6", () => {
    const board = new Board(5, 8, [new Cell(3, 0), new Cell(3, 1)]);
    const piece = new Piece([
      [3, 7],
      [2, 7],
      [2, 6],
    ]);
    const result = getPiecePositionsAtBottom(piece, board);
    const expected = [
      [3, 2],
      [2, 2],
      [2, 1],
    ];
    console.log({ result });
    expect(result).toEqual(expected);
  });
});
