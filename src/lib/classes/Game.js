import generatePiece from "../functions/generatePiece";
import isPieceAtBottom from "../functions/isPieceAtBottom";
class Game {
  constructor(board) {
    this.board = board;
    this.piece = generatePiece(board.width, board.height);
  }

  movePiece(direction) {
    const position = this.piece.getPositionAfterMove(direction);
    if (this.board.isPositionArrayValid(position)) {
      this.piece.move(direction);
    }
  }

  runPiece(timeInterval = 1000) {
    const setInt = setInterval(() => {
      this.movePiece("down");
      console.log("aftermove", this.piece.cells);

      if (isPieceAtBottom(this.piece, this.board)) {
        this.board.addCells(this.piece.cells);
        clearInterval(setInt);
      }
    }, timeInterval);
  }
}

export default Game;
