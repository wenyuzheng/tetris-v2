import "./App.css";
import Board from "./lib/classes/Board";
import Cell from "./lib/classes/Cell";
import Game from "./lib/classes/Game";

const cellsArr = [new Cell(2, 0), new Cell(3, 0)];

const game = new Game(new Board(3, 6));
game.run(2000);

function App() {
  return (
    <div className="App">
      <button
        onClick={() => {
          game.movePiece("left");
          console.log(game.piece.cells);
        }}
      >
        left
      </button>
      <button
        onClick={() => {
          game.movePiece("right");
          console.log(game.piece.cells);
        }}
      >
        right
      </button>
      {/* <button
        onClick={() => {
          game.movePiece("down");
          console.log(game.piece.cells);
        }}
      >
        down
      </button> */}
    </div>
  );
}

export default App;
