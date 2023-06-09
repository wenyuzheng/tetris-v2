import { useEffect, useState } from "react";
import "./App.css";
import Board from "./lib/classes/Board";
import Cell from "./lib/classes/Cell";
import Game from "./lib/classes/Game";
import GameV2 from "./lib/classes/Game_v2";
import generatePiece from "./lib/functions/generatePiece";

const cellsArr = [new Cell(1, 0), new Cell(2, 0), new Cell(3, 0)];

// const game = new Game(new Board(4, 8, cellsArr));

const board = new Board(4, 5);
const game = new GameV2(
  board,
  () => generatePiece(board.width, board.height),
  1000
);
game.run();

function App() {
  const [viewData, setViewData] = useState([]);
  useEffect(() => {
    game.viewUpdater = setViewData;
  }, []);

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
