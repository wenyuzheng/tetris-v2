import Board from "../../../lib/classes/Board";
import Piece from "../../../lib/classes/Piece";
import pieceOutOfBoardDirection from "../../../lib/functions/pieceOutOfBoardDirection";

describe("pieceOutOfBoardDirection", () => {
  test("eg 1", () => {
    const board = new Board(2, 2);
    const piece = new Piece([[0, 0]]);
    const result = pieceOutOfBoardDirection(piece, board);
    expect(result).toEqual(false);
  });

  test("eg 2", () => {
    const board = new Board(2, 2);
    const piece = new Piece([[2, 0]]);
    const result = pieceOutOfBoardDirection(piece, board);
    expect(result).toEqual("left");
  });

  test("eg 3", () => {
    const board = new Board(2, 2);
    const piece = new Piece([[0, 2]]);
    const result = pieceOutOfBoardDirection(piece, board);
    expect(result).toEqual("down");
  });

  test("eg 4", () => {
    const board = new Board(2, 2);
    const piece = new Piece([[-1, 0]]);
    const result = pieceOutOfBoardDirection(piece, board);
    expect(result).toEqual("right");
  });

  test("eg 5", () => {
    const board = new Board(2, 2);
    const piece = new Piece([[0, -1]]);
    const result = pieceOutOfBoardDirection(piece, board);
    expect(result).toEqual("up");
  });
});
