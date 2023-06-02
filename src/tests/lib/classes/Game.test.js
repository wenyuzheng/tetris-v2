import _ from "lodash";
import Board from "../../../lib/classes/Board";
import Game from "../../../lib/classes/Game";
import Cell from "../../../lib/classes/Cell";

describe("Game", () => {
  test("eg1", () => {
    const board = new Board(4, 4);
    const game = new Game(board);
    expect(game.board.constructor.name).toEqual("Board");
    expect(game.piece.constructor.name).toEqual("Piece");
  });

  test("movePiece down", () => {
    _.sample = (arr) => arr[0];
    const game = new Game(new Board(4, 4));
    game.movePiece("down");
    const expected = [
      new Cell(2, 2, "red"),
      new Cell(3, 2, "red"),
      new Cell(2, 1, "red"),
      new Cell(3, 1, "red"),
    ];
    expect(game.piece.cells).toEqual(expected);
  });

  test("movePiece right", () => {
    _.sample = (arr) => arr[0];
    const game = new Game(new Board(5, 4));
    game.movePiece("right");
    const expected = [
      new Cell(3, 3, "red"),
      new Cell(4, 3, "red"),
      new Cell(3, 2, "red"),
      new Cell(4, 2, "red"),
    ];
    expect(game.piece.cells).toEqual(expected);
  });

  test("movePiece down eg2", () => {
    _.sample = (arr) => arr[0];
    const game = new Game(new Board(5, 4, [new Cell(2, 1)]));
    game.movePiece("down");
    const expected = [
      new Cell(2, 3, "red"),
      new Cell(3, 3, "red"),
      new Cell(2, 2, "red"),
      new Cell(3, 2, "red"),
    ];
    expect(game.piece.cells).toEqual(expected);
  });
});
