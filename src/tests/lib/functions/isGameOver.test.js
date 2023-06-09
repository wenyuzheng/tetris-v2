import Board from "../../../lib/classes/Board";
import Cell from "../../../lib/classes/Cell";
import Piece from "../../../lib/classes/Piece";
import isGameOver from "../../../lib/functions/isGameOver";

describe("isGameOver", () => {
  test("eg 1", () => {
    const board = new Board(2, 3);
    const piece = new Piece([
      [1, 2],
      [1, 1],
      [1, 0],
    ]);
    const result = isGameOver(piece, board);
    expect(result).toEqual(false);
  });

  test("eg 2", () => {
    const board = new Board(2, 3, [new Cell(1, 0), new Cell(1, 1)]);
    const piece = new Piece([
      [1, 2],
      [1, 1],
    ]);
    const result = isGameOver(piece, board);
    expect(result).toEqual(true);
  });

  test("eg 3", () => {
    const board = new Board(2, 3, [new Cell(1, 0), new Cell(1, 1)]);
    const piece = new Piece([[1, 2]]);
    const result = isGameOver(piece, board);
    expect(result).toEqual(false);
  });

  test("eg 4", () => {
    const board = new Board(2, 3, []);
    const piece = new Piece([
      [1, 2],
      [1, 1],
    ]);
    const result = isGameOver(piece, board);
    expect(result).toEqual(false);
  });

  test("eg 5", () => {
    const board = new Board(2, 3, []);
    const piece = new Piece([
      [1, 0],
      [1, 1],
    ]);
    const result = isGameOver(piece, board);
    expect(result).toEqual(false);
  });
});
