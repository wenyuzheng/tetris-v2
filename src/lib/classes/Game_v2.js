import _ from "lodash";
import isPieceAtBottom from "../functions/isPieceAtBottom";
import isGameOver from "../functions/isGameOver";
import pieceOutOfBoardDirection from "../functions/pieceOutOfBoardDirection";

class GameV2 {
  constructor(board, pieceGenerator, delay) {
    this.delay = delay;
    this.board = board;
    this.pieceGenerator = pieceGenerator;
    this.piece = pieceGenerator();
    this.heldPiece = null;
    this.isPieceSwapped = false;
    this.pause = true;
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
    const position = this.piece.getPositionAfterMove("rotate");
    if (this.board.areRotatePositionsValid(position)) {
      this.piece.rotateClockwise();
      let outOfBoard = pieceOutOfBoardDirection(this.piece, this.board);
      while (outOfBoard !== false) {
        this.piece.move(outOfBoard);
        outOfBoard = pieceOutOfBoardDirection(this.piece, this.board);
      }
      this.runViewUpdate();
    }
  }

  runPiece() {
    this.movePiece("down");
    // console.log("aftermove", this.piece.cells);

    if (isPieceAtBottom(this.piece, this.board)) {
      this.board.addCells(this.piece.cells);
      this.board.removeFullRows();
      this.runViewUpdate();

      this.piece = this.pieceGenerator();
      this.isPieceSwapped = false;
      this.runViewUpdate();
    }
  }

  pauseGame() {
    this.pause = !this.pause;
    this.runViewUpdate();
  }

  swapHoldPiece() {
    if (!this.isPieceSwapped) {
      if (this.heldPiece === null) {
        this.heldPiece = this.piece;
        this.piece = this.pieceGenerator();
      } else {
        const pieceCopy = this.piece;
        this.piece = this.heldPiece;
        this.heldPiece = pieceCopy;
      }
    }
    this.isPieceSwapped = true;
    this.runViewUpdate();
  }

  compileViewData() {
    let result = { board: {}, holdPiece: {} };
    this.board.cells.forEach(
      (cell) => (result["board"][`${cell.x}-${cell.y}`] = cell.color)
    );
    this.piece.cells.forEach(
      (cell) => (result["board"][`${cell.x}-${cell.y}`] = cell.color)
    );
    if (this.heldPiece)
      this.heldPiece.cells.forEach(
        (cell) => (result["holdPiece"][`${cell.x}-${cell.y}`] = cell.color)
      );

    console.log({ result });

    return result;
  }

  runViewUpdate() {
    if (this.viewUpdater !== undefined) {
      const newViewData = this.compileViewData();
      this.viewUpdater(newViewData);
    }
  }

  async run() {
    this.runViewUpdate();
    this.pause = false;

    await this.wait(1000);

    while (!isGameOver(this.piece, this.board)) {
      if (!this.pause) {
        this.runPiece();
      }
      await this.wait(this.delay);
    }

    console.log("game over");
  }
}

export default GameV2;
