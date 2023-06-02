import _ from "lodash";
import Board from "../../../lib/classes/Board";
import Game from "../../../lib/classes/Game";

describe("Game", () => {
  test("eg1", () => {
    const board = new Board(4, 4);
    const game = new Game(board);
    expect(game.board.constructor.name).toEqual("Board");
    expect(game.piece.constructor.name).toEqual("Piece");
  });

  // test("runPiece", () => {
  //   _.sample = (arr) => arr[0];
  //   const board = new Board(4, 4);
  //   const game = new Game(board);
  //   game.runPiece(1);
  //   // console.log(board.cellsArr);
  //   setTimeout(() => {
  //     console.log(board.cellsArr);
  //   }, 200);
  //   //  expect(game.board.constructor.name).toEqual("Board");
  //   //  expect(game.piece.constructor.name).toEqual("Piece");
  // });
});
