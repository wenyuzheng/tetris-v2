import isPieceAtBottom from "../functions/isPieceAtBottom";
import isGameOver from "../functions/isGameOver";
import pieceOutOfBoardDirection from "../functions/pieceOutOfBoardDirection";
import placePieceOnGrid from "../functions/placePieceOnGrid";
import { getRandomPieceName } from "../functions/generatePiece";
import getPiecePositionsAtBottom from "../functions/getPiecePositionsAtBottom";
import getDistanceFromEdge from "../functions/getDistanceFromEdge";
import Points from "../constants/Points";
import musicFile from "../../asset/sound/music.mp3";
import clearSound from "../../asset/sound/clear.mp3";
import gameOverSound from "../../asset/sound/gameOver.mp3";

class GameV2 {
  constructor(board, pieceGenerator, delay) {
    this.music = new Audio(musicFile);
    this.clearSound = new Audio(clearSound);
    this.gameOverSound = new Audio(gameOverSound);

    this.delay = delay;
    this.board = board;
    this.piece = pieceGenerator();
    this.queuePieceNameArr = Array.from({ length: 3 }, getRandomPieceName);
    this.heldPieceName = null;
    this.isPieceSwapped = false;
    this.highlightRows = [];
    this.pause = true;
    this.start = false;
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.isMusicOn = false;
    this.isSoundOn = false;
  }

  getPieceByName(pieceName) {
    return placePieceOnGrid(this.board.width, this.board.height, pieceName);
  }

  wait(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  async movePiece(direction, distance = 1, hardDrop = false) {
    const maxDistance = getDistanceFromEdge(this.piece, this.board, direction);
    if (distance > maxDistance) distance = maxDistance;

    for (let i = 1; i <= distance; i++) {
      const position = this.piece.getPositionAfterMove(direction);
      if (!this.board.isPositionArrayValid(position)) return;
      this.piece.move(direction);
      this.runViewUpdate();
      if (!hardDrop) await this.wait(15);
    }
  }

  async hardDropPiece() {
    this.movePiece("down", this.board.height, true);
    this.runViewUpdate();

    if (isPieceAtBottom(this.piece, this.board)) {
      this.runBottomUpdate();
    }
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
    if (!fullRowsNum) return;

    this.score += Points[fullRowsNum] * this.level;
    this.lines += fullRowsNum;

    if (this.lines !== 0 && this.lines % 10 === 0) {
      this.level++;
      if (this.delay > 100) this.delay -= 100;
    }
  }

  pauseGame() {
    this.pause = !this.pause;
    this.playMusic();
    this.runViewUpdate();
  }

  playMusic() {
    this.isMusicOn = !this.isMusicOn;
    this.runViewUpdate();

    if (this.isMusicOn && !this.pause) {
      this.music.play();
    } else {
      this.music.pause();
    }
  }

  onOffSound() {
    this.isSoundOn = !this.isSoundOn;
    this.runViewUpdate();
  }

  playSound() {
    if (this.isSoundOn) {
      if (this.highlightRows.length !== 0) this.clearSound.play();
      if (!this.start) this.gameOverSound.play();
    }
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

  async runBottomUpdate() {
    this.board.addCells(this.piece.cells);
    this.highlightRows = this.board.getFullRows();
    this.playSound();

    this.piece = this.getPieceByName(this.queuePieceNameArr.pop());
    this.queuePieceNameArr.unshift(getRandomPieceName());
    this.isPieceSwapped = false;
    this.runViewUpdate();

    await this.wait(200);

    this.board.removeFullRows();
    this.calculateScoreAndLevel(this.highlightRows.length);
    this.highlightRows = [];
    this.runViewUpdate();
  }

  compileViewData() {
    let result = {
      board: {},
      holdPiece: {},
      queue: {},
      highlight: this.highlightRows,
      lines: this.lines,
      score: this.score,
      level: this.level,
      start: this.start,
      pause: this.pause,
      music: this.isMusicOn,
      sound: this.isSoundOn,
    };

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

  async runPiece() {
    this.movePiece("down");

    if (isPieceAtBottom(this.piece, this.board)) {
      this.runBottomUpdate();
    }
  }

  async run() {
    this.runViewUpdate();
    this.start = true;
    this.pause = false;
    this.playMusic();
    this.onOffSound();
    this.runViewUpdate();

    await this.wait(this.delay);

    while (!isGameOver(this.piece, this.board)) {
      if (!this.pause) {
        this.runPiece();
      }
      await this.wait(this.delay);
    }

    this.start = false;
    this.playSound();
    this.playMusic();
    this.runViewUpdate();

    console.log("game over");
  }
}

export default GameV2;
