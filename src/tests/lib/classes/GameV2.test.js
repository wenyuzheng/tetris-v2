import Board from "../../../lib/classes/Board";
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
    expect(game.board.cellsArr.length).toEqual(4);
  });
});
