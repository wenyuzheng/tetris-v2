import { useEffect, useState } from "react";
import "./App.css";
import Board from "./lib/classes/Board";
import GameV2 from "./lib/classes/Game_v2";
import generatePiece from "./lib/functions/generatePiece";
import Grid from "./components/Grid";

const board = new Board(10, 20);
const game = new GameV2(
  board,
  () => generatePiece(board.width, board.height),
  1000
);

function App() {
  const [viewData, setViewData] = useState({
    board: {},
    holdPiece: {},
    queue: {},
  });
  useEffect(() => {
    game.viewUpdater = setViewData;
  }, []);

  return (
    <div className="App">
      <h1>Tetris</h1>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 20 }}>
          <h3>Hold</h3>
          <Grid width={4} height={3} viewData={viewData["holdPiece"]} />
        </div>
        <div>
          <Grid
            width={board.width}
            height={board.height}
            viewData={viewData["board"]}
          />
        </div>
        <div style={{ marginLeft: 20 }}>
          <h3>Queue</h3>
          <Grid width={4} height={3} viewData={viewData["queue"]} />
        </div>
      </div>
      <div style={{ margin: 20 }}>
        {game.start ? (
          <div>
            <button
              onClick={() => {
                game.pauseGame();
              }}
            >
              {game.pause ? "resume" : "pause"}
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
            <button
              onClick={() => {
                game.swapHoldPiece();
              }}
            >
              hold
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              game.run();
            }}
          >
            start
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
