import _ from "lodash";
import generatePiece from "../functions/generatePiece";
import isPieceAtBottom from "../functions/isPieceAtBottom";
import isPieceReachedTop from "../functions/isPieceReachedTop";
class Game {
  constructor(board) {
    _.sample = (arr) => arr[0];

    this.board = board;
    this.piece = generatePiece(board.width, board.height);
    // this.gameOver = false;
    // this.counter = 2;
  }

  isEndGame() {
    // this.counter--;
    // if (this.counter === 0) {
    //   return true;
    // }

    return isPieceReachedTop(this.piece, this.board);
  }

  movePiece(direction) {
    const position = this.piece.getPositionAfterMove(direction);
    if (this.board.isPositionArrayValid(position)) {
      this.piece.move(direction);
    }
  }

  runPiece(timeInterval = 1000) {
    const setInt = setInterval(() => {
      if (isPieceAtBottom(this.piece, this.board)) {
        this.board.addCells(this.piece.cells);
        this.board.removeFullRows();
        console.log("board cells", this.board.cellsArr);

        clearInterval(setInt);

        // const gameOver = this.isEndGame();

        if (!this.isEndGame()) {
          this.piece = generatePiece(this.board.width, this.board.height);
          console.log(this.piece);
          this.runPiece(timeInterval);
        }
      } else {
        this.movePiece("down");
        console.log("aftermove", this.piece.cells);
      }
    }, timeInterval);
  }

  // async run(timeInterval) {
  //   this.runPiece(timeInterval);
  // }
}

export default Game;
