import { useEffect, useState } from "react";
import "./App.css";
import Board from "./lib/classes/Board";
import Cell from "./lib/classes/Cell";
import Game from "./lib/classes/Game";
import GameV2 from "./lib/classes/Game_v2";
import generatePiece from "./lib/functions/generatePiece";
import Grid from "./components/Grid";

const board = new Board(5, 8);
const game = new GameV2(
  board,
  () => generatePiece(board.width, board.height),
  1500
);

function App() {
  const [viewData, setViewData] = useState([]);
  useEffect(() => {
    game.viewUpdater = setViewData;
  }, []);

  return (
    <div className="App">
      <Grid width={board.width} height={board.height} viewData={viewData} />
      <button
        onClick={() => {
          game.run();
        }}
      >
        start
      </button>
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
      <button
        onClick={() => {
          game.movePiece("down");
          console.log(game.piece.cells);
        }}
      >
        down
      </button>
      <button
        onClick={() => {
          game.rotatePiece();
          console.log(game.piece.cells);
        }}
      >
        rotate
      </button>
    </div>
  );
}

export default App;
