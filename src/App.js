import { useEffect, useState } from "react";
import "./App.css";
import Board from "./lib/classes/Board";
import Cell from "./lib/classes/Cell";
import Game from "./lib/classes/Game";
import GameV2 from "./lib/classes/Game_v2";
import generatePiece from "./lib/functions/generatePiece";
import Grid from "./components/Grid";

const cells = [new Cell(1, 0), new Cell(2, 0), new Cell(3, 0)];

// const game = new Game(new Board(4, 8, cells));

const board = new Board(4, 5);
const game = new GameV2(
  board,
  () => generatePiece(board.width, board.height),
  1000
);
// game.run();

function App() {
  const [viewData, setViewData] = useState([]);
  useEffect(() => {
    game.viewUpdater = setViewData;
  }, []);

  return (
    <div className="App">
      <Grid board={board} piece={game.piece} />
    </div>
  );
}

export default App;
