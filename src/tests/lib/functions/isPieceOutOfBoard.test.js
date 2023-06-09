import Board from "../../../lib/classes/Board";
import Piece from "../../../lib/classes/Piece";
import isPieceOutOfBoard from "../../../lib/functions/isPieceOutOfBoard";

describe("isPieceOutOfBoard", () => {
  test("eg 1", () => {
    const board = new Board(2, 2);
    const piece = new Piece([[0, 0]]);
    const result = isPieceOutOfBoard(piece, board);
    expect(result).toEqual(false);
  });

  test("eg 2", () => {
    const board = new Board(2, 2);
    const piece = new Piece([[2, 0]]);
    const result = isPieceOutOfBoard(piece, board);
    expect(result).toEqual(true);
  });

  test("eg 3", () => {
    const board = new Board(2, 2);
    const piece = new Piece([[0, 2]]);
    const result = isPieceOutOfBoard(piece, board);
    expect(result).toEqual(true);
  });

  test("eg 4", () => {
    const board = new Board(2, 2);
    const piece = new Piece([[-1, 0]]);
    const result = isPieceOutOfBoard(piece, board);
    expect(result).toEqual(true);
  });

  test("eg 5", () => {
    const board = new Board(2, 2);
    const piece = new Piece([[0, -1]]);
    const result = isPieceOutOfBoard(piece, board);
    expect(result).toEqual(true);
  });
});
