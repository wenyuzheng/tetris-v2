import _ from "lodash";
import generatePiece from "../functions/generatePiece";
import isPieceAtBottom from "../functions/isPieceAtBottom";
import isPieceReachedTop from "../functions/isPieceReachedTop";
class Game {
  constructor(board) {
    _.sample = (arr) => arr[0];

    this.board = board;
    this.piece = generatePiece(board.width, board.height);

    this.score = 0;
  }

  isEndGame() {
    return isPieceReachedTop(this.piece, this.board);
  }

  movePiece(direction) {
    const position = this.piece.getPositionAfterMove(direction);
    if (this.board.isPositionArrayValid(position)) {
      this.piece.move(direction);
    }
  }

  runPiece(timeInt = 1000) {
    let timeInterval = timeInt;

    const setInt = setInterval(() => {
      console.log(timeInterval);
      if (isPieceAtBottom(this.piece, this.board)) {
        if (!this.isEndGame()) {
          this.board.addCells(this.piece.cells);
          this.board.removeFullRows();

          this.score++;

          this.piece = generatePiece(this.board.width, this.board.height);
          console.log(this.piece);

          if (!timeInterval <= 100 && this.score % 2 === 0) {
            timeInterval -= 100;
          }

          this.runPiece(timeInterval);
        } else {
          console.log("end game");
          clearInterval(setInt);
        }
        console.log("board cells", this.board.cellsArr);
      } else {
        this.movePiece("down");
        console.log("aftermove", this.piece.cells);
      }
    }, timeInterval);
  }

  // runPiece(timeInterval = 1000) {
  //   const setInt = setInterval(() => {
  //     this.movePiece("down");
  //     console.log("aftermove", this.piece.cells);

  //     if (isPieceAtBottom(this.piece, this.board)) {
  //       this.board.addCells(this.piece.cells);
  //       this.board.removeFullRows();
  //       console.log("board cells", this.board.cellsArr);
  //       clearInterval(setInt);
  //     }
  //   }, timeInterval);
  // }

  // run(timeInterval = 1000) {
  //   this.runPiece(timeInterval);
  // }
}

export default Game;
