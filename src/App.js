import "./App.css";
import Board from "./lib/classes/Board";
import Cell from "./lib/classes/Cell";
import Game from "./lib/classes/Game";

const cellsArr = [
  new Cell(0, 0),
  new Cell(1, 0),
  new Cell(2, 0),
  new Cell(3, 0),
];

const game = new Game(new Board(4, 10, cellsArr));
game.runPiece(10);

function App() {
  return (
    <div className="App">
      <button
        onClick={() => {
          console.log(game.board.cellsArr);
        }}
      >
        run
      </button>
    </div>
  );
}

export default App;
