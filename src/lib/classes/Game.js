import isPieceAtBottom from "../functions/isPieceAtBottom";
import isGameOver from "../functions/isGameOver";
import pieceOutOfBoardDirection from "../functions/pieceOutOfBoardDirection";
import placePieceOnGrid from "../functions/placePieceOnGrid";
import { getRandomPieceName } from "../functions/generatePiece";
import getPiecePositionsAtBottom from "../functions/getPiecePositionsAtBottom";
import getDistanceFromEdge from "../functions/getDistanceFromEdge";
import Points from "../constants/Points";
import clearSound from "../../asset/sound/clear.mp3";
import gameOverSound from "../../asset/sound/gameOver.mp3";
import moveSound from "../../asset/sound/move.mp3";
import BgMusics from "../constants/BgMusics";
import getQueuePieces from "../functions/getQueuePieces";
import _ from "lodash";
import wait from "../functions/wait";

class Game {
  constructor(board, pieceGenerator, delay) {
    this.music = _.sample(BgMusics);
    this.clearSound = new Audio(clearSound);
    this.gameOverSound = new Audio(gameOverSound);
    this.moveSound = new Audio(moveSound);

    this.delay = delay;
    this.board = board;
    this.pieceGenerator = pieceGenerator;
    this.piece = this.pieceGenerator();
    this.queuePieceNameArr = getQueuePieces(5);
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

  restart() {
    this.board.cells = [];
    this.delay = 1000;
    this.piece = this.pieceGenerator();
    this.heldPieceName = null;
    this.isPieceSwapped = false;
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.pause = false;
    this.playMusic();

    this.runViewUpdate();
  }

  getPieceByName(pieceName) {
    return placePieceOnGrid(this.board.width, this.board.height, pieceName);
  }

  async movePiece(direction, distance = 1, hardDrop = false) {
    const maxDistance = getDistanceFromEdge(this.piece, this.board, direction);
    if (distance > maxDistance) distance = maxDistance;

    for (let i = 1; i <= distance; i++) {
      const position = this.piece.getPositionAfterMove(direction);
      if (!this.board.isPositionArrayValid(position)) return;
      this.piece.move(direction);

      // if (direction !== "down") this.moveSound.play();

      this.runViewUpdate();
      if (!hardDrop) await wait(15);
    }
  }

  hardDropPiece() {
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

  updateScoreAndLevel(fullRowsNum) {
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
        this.queuePieceNameArr.unshift(
          getRandomPieceName(this.queuePieceNameArr)
        );
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
    this.queuePieceNameArr.unshift(getRandomPieceName(this.queuePieceNameArr));
    this.isPieceSwapped = false;
    this.runViewUpdate();

    await wait(200);

    this.board.removeFullRows();
    this.updateScoreAndLevel(this.highlightRows.length);
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
      const queuePiece = placePieceOnGrid(4, 20, queueName, 5, i);
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

  runPiece() {
    this.movePiece("down");

    if (isPieceAtBottom(this.piece, this.board)) {
      this.runBottomUpdate();
    }
  }

  async run() {
    this.start = true;
    this.pause = false;
    this.playMusic();
    this.onOffSound();
    this.runViewUpdate();

    while (!isGameOver(this.piece, this.board)) {
      await wait(this.delay);

      if (!this.pause) {
        this.runPiece();

        if (this.music.ended) {
          this.music = _.sample(BgMusics);
          this.music.play();
        }
      }
    }

    this.playSound();
    this.playMusic();
    this.runViewUpdate();

    console.log("game over");
  }
}

export default Game;
