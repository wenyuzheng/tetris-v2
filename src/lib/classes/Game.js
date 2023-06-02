import generatePiece from "../functions/generatePiece";
class Game {
  constructor(board) {
    this.board = board;
    this.piece = generatePiece(board.width, board.height);
  }

  runPiece(timeInterval = 1000) {
    const setInt = setInterval(() => {
      this.piece.move("down");
      const position = this.piece.getPositionAfterMove("down");

      if (!this.board.isPositionArrayValid(position)) {
        this.board.addCells(this.piece.cells);
        clearInterval(setInt);
      }
    }, timeInterval);
  }
}

export default Game;
