import _ from "lodash";
import Board from "../../../lib/classes/Board";
import Cell from "../../../lib/classes/Cell";
import GameV2 from "../../../lib/classes/Game_v2";
import Piece from "../../../lib/classes/Piece";
import generatePiece from "../../../lib/functions/generatePiece";

describe("GameV2", () => {
  xtest("run eg1", async () => {
    const board = new Board(3, 4);
    const game = new GameV2(
      board,
      () => {
        return new Piece([[2, 3]]);
      },
      10
    );

    await game.run();
    expect(game.board.cells.length).toEqual(4);
  });

  test("rotatePiece eg1", () => {
    const board = new Board(2, 3);
    const game = new GameV2(
      board,
      () => {
        return new Piece(
          [
            [1, 1],
            [1, 2],
          ],
          "red",
          0
        );
      },
      100
    );

    game.rotatePiece();
    const expected = [new Cell(0, 1, "red"), new Cell(1, 1, "red")];
    expect(game.piece.cells).toEqual(expected);
  });

  test("swapHoldPiece eg1", () => {
    _.sample = (arr) => arr[0];

    const board = new Board(5, 8);
    const game = new GameV2(board, () => generatePiece(5, 8), 3000);

    _.sample = (arr) => arr[1];
    game.swapHoldPiece();

    expect(game.piece).toEqual(
      new Piece(
        [
          [0, 7],
          [1, 7],
          [2, 7],
          [3, 7],
        ],
        "blue",
        1,
        "tube"
      )
    );

    expect(game.heldPiece).toEqual("square");
  });

  test("swapHoldPiece eg2", () => {
    _.sample = (arr) => arr[0];

    const board = new Board(5, 8);
    const game = new GameV2(board, () => generatePiece(5, 8), 3000);

    game.heldPiece = "tube";

    _.sample = (arr) => arr[1];
    game.swapHoldPiece();

    expect(game.piece).toEqual(
      new Piece(
        [
          [0, 7],
          [1, 7],
          [2, 7],
          [3, 7],
        ],
        "blue",
        1,
        "tube"
      )
    );

    expect(game.heldPiece).toEqual("square");
  });

  // test("swapHoldPiece eg1", () => {
  // _.sample = (arr) => arr[0];

  // const board = new Board(5, 8);
  // const game = new GameV2(board, () => generatePiece(5, 8), 3000);

  // _.sample = (arr) => arr[1];
  // game.swapHoldPiece();

  // expect(game.piece).toEqual(
  //   new Piece(
  //     [
  //       [2, 7],
  //       [2, 6],
  //       [2, 5],
  //       [2, 4],
  //     ],
  //     "blue",
  //     1
  //   )
  // );

  // expect(game.heldPiece).toEqual(
  //   new Piece(
  //     [
  //       [2, 7],
  //       [3, 7],
  //       [2, 6],
  //       [3, 6],
  //     ],
  //     "red"
  //   )
  // );
  // });

  // test("swapHoldPiece eg2", () => {
  //   _.sample = (arr) => arr[0];

  //   const board = new Board(5, 8);
  //   const game = new GameV2(board, () => generatePiece(5, 8), 3000);

  //   game.heldPiece = new Piece(
  //     [
  //       [2, 7],
  //       [2, 6],
  //       [2, 5],
  //       [2, 4],
  //     ],
  //     "blue",
  //     1
  //   );

  //   expect(game.isPieceSwapped).toEqual(false);

  //   game.swapHoldPiece();

  //   expect(game.piece).toEqual(
  //     new Piece(
  //       [
  //         [2, 7],
  //         [2, 6],
  //         [2, 5],
  //         [2, 4],
  //       ],
  //       "blue",
  //       1
  //     )
  //   );

  //   expect(game.heldPiece).toEqual(
  //     new Piece(
  //       [
  //         [2, 7],
  //         [3, 7],
  //         [2, 6],
  //         [3, 6],
  //       ],
  //       "red"
  //     )
  //   );
  //   expect(game.isPieceSwapped).toEqual(true);
  // });

  // test("swapHoldPiece eg1", () => {
  //   _.sample = (arr) => arr[0];

  //   const board = new Board(5, 8);
  //   const game = new GameV2(board, () => generatePiece2(5, 8), 3000);

  //   _.sample = (arr) => arr[1];
  //   game.swapHoldPiece();

  //   expect(game.piece).toEqual(
  //     new Piece(
  //       [
  //         [0, 7],
  //         [1, 7],
  //         [2, 7],
  //         [3, 7],
  //       ],
  //       "blue",
  //       1,
  //       "tube"
  //     )
  //   );

  //   expect(game.heldPiece).toEqual("square");
  // });

  // test("swapHoldPiece eg2", () => {
  //   _.sample = (arr) => arr[0];

  //   const board = new Board(5, 8);
  //   const game = new GameV2(board, () => generatePiece2(5, 8), 3000);

  //   game.heldPiece = "tube";

  //   _.sample = (arr) => arr[1];
  //   game.swapHoldPiece();

  //   expect(game.piece).toEqual(
  //     new Piece(
  //       [
  //         [0, 7],
  //         [1, 7],
  //         [2, 7],
  //         [3, 7],
  //       ],
  //       "blue",
  //       1,
  //       "tube"
  //     )
  //   );

  //   expect(game.heldPiece).toEqual("square");
  // });
});
