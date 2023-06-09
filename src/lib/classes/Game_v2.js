import _ from "lodash";
import isPieceAtBottom from "../functions/isPieceAtBottom";
import isGameOver from "../functions/isGameOver";

class GameV2 {
  constructor(board, pieceGenerator, delay) {
    _.sample = (arr) => arr[0];

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
  }

  runPiece() {
    this.movePiece("down");
    console.log("aftermove", this.piece.cells);

    if (isPieceAtBottom(this.piece, this.board)) {
      this.board.addCells(this.piece.cells);
      this.board.removeFullRows();
      console.log("board cells", this.board.cellsArr);

      this.piece = this.pieceGenerator();
    }
  }

  async run() {
    // this.moveLeftTest();

    while (!isGameOver(this.piece, this.board)) {
      this.runPiece();
      await this.wait(this.delay);
    }

    console.log("game over");
  }

  moveLeftTest() {
    setTimeout(() => {
      this.movePiece("left");
      console.log("moved left", this.piece.cells);
    }, 3000);
  }
}

export default GameV2;
