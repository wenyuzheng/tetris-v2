import Board from "../../../lib/classes/Board";
import Piece from "../../../lib/classes/Piece";
import isPieceAtBottom from "../../../lib/functions/isPieceAtBottom";

describe("isPieceAtBottom", () => {
  test("eg 1", () => {
    const board = new Board(2, 3, []);
    const piece = new Piece([
      [1, 2],
      [1, 1],
    ]);
    const result = isPieceAtBottom(piece, board);
    expect(result).toEqual(false);
  });

  test("eg 2", () => {
    const board = new Board(2, 3, []);
    const piece = new Piece([
      [1, 0],
      [1, 1],
    ]);
    const result = isPieceAtBottom(piece, board);
    expect(result).toEqual(true);
  });

  test("eg 3", () => {
    const board = new Board(2, 3, [[1, 0]]);
    const piece = new Piece([
      [1, 2],
      [1, 1],
    ]);
    const result = isPieceAtBottom(piece, board);
    expect(result).toEqual(true);
  });

  test("eg 4", () => {
    const board = new Board(2, 4, [[1, 0]]);
    const piece = new Piece([
      [1, 2],
      [1, 3],
    ]);
    const result = isPieceAtBottom(piece, board);
    expect(result).toEqual(false);
  });
});
