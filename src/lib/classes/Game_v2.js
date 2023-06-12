import _ from "lodash";
import isPieceAtBottom from "../functions/isPieceAtBottom";
import isGameOver from "../functions/isGameOver";
import pieceOutOfBoardDirection from "../functions/pieceOutOfBoardDirection";
import placePieceOnGrid from "../functions/placePieceOnGrid";
import pieces from "../constants/Pieces";

class GameV2 {
  constructor(board, pieceGenerator, delay) {
    this.delay = delay;
    this.board = board;
    this.pieceGenerator = pieceGenerator;
    this.piece = pieceGenerator();
    this.queuePieceName = _.sample(Object.keys(pieces));
    this.heldPieceName = null;
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

      this.piece = placePieceOnGrid(
        this.board.width,
        this.board.height,
        this.queuePieceName
      );
      this.queuePieceName = _.sample(Object.keys(pieces));
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
      if (this.heldPieceName === null) {
        this.heldPieceName = this.piece.name;
        this.piece = placePieceOnGrid(
          this.board.width,
          this.board.height,
          this.queuePieceName
        );
        this.queuePieceName = _.sample(Object.keys(pieces));
      } else {
        const pieceCopy = this.piece;
        this.piece = placePieceOnGrid(
          this.board.width,
          this.board.height,
          this.heldPieceName
        );
        this.heldPieceName = pieceCopy.name;
      }
    }
    this.isPieceSwapped = true;
    this.runViewUpdate();
  }

  compileViewData() {
    let result = { board: {}, holdPiece: {}, queue: {} };
    this.board.cells.forEach(
      (cell) => (result["board"][`${cell.x}-${cell.y}`] = cell.color)
    );
    this.piece.cells.forEach(
      (cell) => (result["board"][`${cell.x}-${cell.y}`] = cell.color)
    );

    const queuePiece = placePieceOnGrid(4, 3, this.queuePieceName);
    queuePiece.cells.forEach(
      (cell) => (result["queue"][`${cell.x}-${cell.y}`] = cell.color)
    );

    if (this.heldPieceName) {
      const heldPiece = placePieceOnGrid(4, 3, this.heldPieceName);
      heldPiece.cells.forEach(
        (cell) => (result["holdPiece"][`${cell.x}-${cell.y}`] = cell.color)
      );
    }

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
