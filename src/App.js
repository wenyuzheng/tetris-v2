import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Board from "./lib/classes/Board";
import GameV2 from "./lib/classes/Game_v2";
import generatePiece from "./lib/functions/generatePiece";
import Grid from "./components/Grid";
import useLongPress from "./lib/hooks/useLongPress";

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

  const longPressDown = useLongPress(() => game.movePiece("down"), 100);
  const longPressLeft = useLongPress(() => game.movePiece("left"), 100);
  const longPressRight = useLongPress(() => game.movePiece("right"), 100);
  const longPressRotate = useLongPress(() => game.rotatePiece(), 100);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "ArrowDown") {
      game.movePiece("down");
    } else if (e.key === "ArrowRight") {
      game.movePiece("right");
    } else if (e.key === "ArrowLeft") {
      game.movePiece("left");
    } else if (e.key === "ArrowUp") {
      game.rotatePiece();
    }
  }, []);

  useEffect(() => {
    if (game.start) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, game.start]);

  return (
    <div className="App">
      <h1>Tetris</h1>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginRight: 20,
          }}
        >
          <div>
            <h3>Hold</h3>
            <Grid width={4} height={3} viewData={viewData["holdPiece"]} />
          </div>
          <div style={{ border: "2px black solid" }}>
            <h3>Score</h3>
            <h4>{game.score}</h4>
            <h3>Level</h3>
            <h4>{game.level}</h4>
          </div>
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
          <Grid width={4} height={12} viewData={viewData["queue"]} />
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
            {game.pause ? null : (
              <div style={{ marginTop: 10 }}>
                <button
                  {...longPressLeft}
                  onClick={() => {
                    game.movePiece("left");
                  }}
                >
                  left
                </button>
                <button
                  {...longPressRight}
                  onClick={() => {
                    game.movePiece("right");
                  }}
                >
                  right
                </button>
                <button
                  {...longPressDown}
                  onClick={() => {
                    game.movePiece("down");
                  }}
                >
                  down
                </button>
                <button
                  {...longPressRotate}
                  onClick={() => {
                    game.rotatePiece();
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
            )}
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
