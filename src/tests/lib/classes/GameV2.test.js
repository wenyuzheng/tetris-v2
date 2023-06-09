import Board from "../../../lib/classes/Board";
import Cell from "../../../lib/classes/Cell";
import GameV2 from "../../../lib/classes/Game_v2";
import Piece from "../../../lib/classes/Piece";

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

  // test("rotatePiece eg1", () => {
  //   const board = new Board(2, 3);
  //   const game = new GameV2(
  //     board,
  //     () => {
  //       return new Piece(
  //         [
  //           [1, 1],
  //           [1, 2],
  //         ],
  //         "red",
  //         0
  //       );
  //     },
  //     100
  //   );
  //   game.rotatePiece();
  //   const expected = [new Cell(0, 1, "red"), new Cell(1, 1, "red")];
  //   expect(game.piece.cells).toEqual(expected);
  // });
});
