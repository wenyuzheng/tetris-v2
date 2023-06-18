import isPieceAtBottom from "../functions/isPieceAtBottom";
import isGameOver from "../functions/isGameOver";
import pieceOutOfBoardDirection from "../functions/pieceOutOfBoardDirection";
import placePieceOnGrid from "../functions/placePieceOnGrid";
import { getRandomPieceName } from "../functions/generatePiece";
import getPiecePositionsAtBottom from "../functions/getPiecePositionsAtBottom";
import getDistanceFromEdge from "../functions/getDistanceFromEdge";

class GameV2 {
  constructor(board, pieceGenerator, delay) {
    this.delay = delay;
    this.board = board;
    this.piece = pieceGenerator();
    this.queuePieceNameArr = Array.from({ length: 3 }, getRandomPieceName);
    this.heldPieceName = null;
    this.isPieceSwapped = false;
    this.pause = true;
    this.score = 0;
    this.level = 1;
  }

  getPieceByName(pieceName) {
    return placePieceOnGrid(this.board.width, this.board.height, pieceName);
  }

  wait(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  movePiece(direction, distance = 1) {
    const maxDistance = getDistanceFromEdge(this.piece, this.board, direction);
    if (distance > maxDistance) distance = maxDistance;

    for (let i = 1; i <= distance; i++) {
      const position = this.piece.getPositionAfterMove(direction);
      if (!this.board.isPositionArrayValid(position)) return;
      this.piece.move(direction);
      this.runViewUpdate();
    }
  }

  hardDropPiece() {
    this.movePiece("down", this.board.height);
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

  calculateScoreAndLevel(fullRowsNum) {
    this.score += fullRowsNum * 100;
    this.setScore(this.score);
    if (fullRowsNum !== 0 && this.score !== 0 && this.score % 500 === 0) {
      this.level++;
      this.setLevel(this.level);
      if (this.delay > 100) this.delay -= 100;
    }
  }

  async runPiece() {
    this.movePiece("down");

    if (isPieceAtBottom(this.piece, this.board)) {
      this.board.addCells(this.piece.cells);
      const fullRows = this.board.getFullRows();
      this.highlightUpdater(fullRows);
      await this.wait(200);

      this.board.removeFullRows();
      this.calculateScoreAndLevel(fullRows.length);
      this.highlightUpdater([]);
      this.runViewUpdate();

      this.piece = this.getPieceByName(this.queuePieceNameArr.pop());
      this.queuePieceNameArr.unshift(getRandomPieceName());
      this.isPieceSwapped = false;
      this.runViewUpdate();
    }
  }

  pauseGame() {
    this.pause = !this.pause;
    this.setGamePause(this.pause);
    this.runViewUpdate();
  }

  swapHoldPiece() {
    if (!this.isPieceSwapped) {
      if (this.heldPieceName === null) {
        this.heldPieceName = this.piece.name;
        this.piece = this.getPieceByName(this.queuePieceNameArr.pop());
        this.queuePieceNameArr.unshift(getRandomPieceName());
      } else {
        const pieceCopy = this.piece;
        this.piece = this.getPieceByName(this.heldPieceName);
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
    const bottomPositions = getPiecePositionsAtBottom(this.piece, this.board);
    bottomPositions.forEach(
      (e) =>
        (result["board"][`${e[0]}-${e[1]}`] = {
          ghost: this.piece.cells[0].color,
        })
    );
    this.piece.cells.forEach(
      (cell) => (result["board"][`${cell.x}-${cell.y}`] = cell.color)
    );

    for (let i = 1; i <= this.queuePieceNameArr.length; i++) {
      const queueName = this.queuePieceNameArr[i - 1];
      const queuePiece = placePieceOnGrid(4, 12, queueName, 3, i);
      queuePiece.cells.forEach(
        (cell) => (result["queue"][`${cell.x}-${cell.y}`] = cell.color)
      );
    }

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
    this.setGameStart(true);
    this.pause = false;
    this.setGamePause(this.pause);

    await this.wait(1000);

    while (!isGameOver(this.piece, this.board)) {
      if (!this.pause) {
        this.runPiece();
      }
      await this.wait(this.delay);
    }

    this.setGameStart(false);
    this.runViewUpdate();

    console.log("game over");
  }
}

export default GameV2;
