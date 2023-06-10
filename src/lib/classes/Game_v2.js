import _ from "lodash";
import isPieceAtBottom from "../functions/isPieceAtBottom";
import isGameOver from "../functions/isGameOver";
import pieceOutOfBoardDirection from "../functions/pieceOutOfBoardDirection";

class GameV2 {
  constructor(board, pieceGenerator, delay) {
    _.sample = (arr) => arr[2];

    this.board = board;
    this.pieceGenerator = pieceGenerator;
    this.piece = pieceGenerator();

    this.delay = delay;
  }

  wait(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  movePiece(direction) {
    const position = this.piece.getPositionAfterMove(direction);
    if (this.board.isPositionArrayValid(position)) {
      this.piece.move(direction);
    }
    this.runViewUpdate();
  }

  rotatePiece() {
    this.piece.rotateClockwise();
    let outOfBoard = pieceOutOfBoardDirection(this.piece, this.board);
    while (outOfBoard !== false) {
      this.piece.move(outOfBoard);
      // console.log({ outOfBoard }, this.piece.cells);
      outOfBoard = pieceOutOfBoardDirection(this.piece, this.board);
    }
    this.runViewUpdate();
  }

  runPiece() {
    this.movePiece("down");
    console.log("aftermove", this.piece.cells);

    if (isPieceAtBottom(this.piece, this.board)) {
      this.board.addCells(this.piece.cells);
      this.board.removeFullRows();
      this.runViewUpdate();

      this.piece = this.pieceGenerator();
      this.runViewUpdate();
    }
  }

  compileViewData() {
    return this.board.cells.concat(this.piece.cells);
  }

  runViewUpdate() {
    if (this.viewUpdater !== undefined) {
      const newViewData = this.compileViewData();
      this.viewUpdater(newViewData);
    }
  }

  async run() {
    this.runViewUpdate();

    await this.wait(3000);
    while (!isGameOver(this.piece, this.board)) {
      this.runPiece();
      await this.wait(this.delay);
    }

    console.log("game over");
  }
}

export default GameV2;
