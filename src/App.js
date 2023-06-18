import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Board from "./lib/classes/Board";
import Game from "./lib/classes/Game";
import generatePiece from "./lib/functions/generatePiece";
import Grid from "./components/Grid";
import useWindowSize from "./lib/hooks/useWindowSize";
import useSwipe from "./lib/hooks/useSwipe";
import StatsDisplay from "./components/StatsDisplay";

let board = new Board(10, 20);
let game = new Game(
  board,
  () => generatePiece(board.width, board.height),
  1000
);

function App() {
  const [viewData, setViewData] = useState({
    board: {},
    holdPiece: {},
    queue: {},
    highlight: [],
    lines: 0,
    score: 0,
    level: 1,
  });
  const [gameStart, setGameStart] = useState(false);
  const [gamePause, setGamePause] = useState(true);

  useEffect(() => {
    game.viewUpdater = setViewData;
    game.setGameStart = setGameStart;
    game.setGamePause = setGamePause;
  }, []);

  const swipeActions = useSwipe({
    swipeLeft: (distance) => game.movePiece("left", distance),
    swipeRight: (distance) => game.movePiece("right", distance),
    swipeDown: () => game.hardDropPiece(),
    swipeUp: () => game.swapHoldPiece(),
    tap: () => game.rotatePiece(),
  });

  const handleKeyPress = useCallback((e) => {
    if (e.key === "ArrowDown") {
      game.movePiece("down");
    } else if (e.key === "ArrowRight") {
      game.movePiece("right");
    } else if (e.key === "ArrowLeft") {
      game.movePiece("left");
    } else if (e.key === "ArrowUp") {
      game.rotatePiece();
    } else if (e.key === " ") {
      game.hardDropPiece();
    }
  }, []);

  useEffect(() => {
    if (gameStart) {
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress, gameStart]);

  const windowSize = useWindowSize();
  const margin = windowSize.width <= 767 ? 10 : 20;
  const squareSize =
    windowSize.width >= 1024 ? 30 : (windowSize.width - margin * 4) / 18;

  return (
    <div className="App" {...swipeActions}>
      <h1>Tetris</h1>
      {gameStart ? (
        gamePause ? (
          <button onClick={() => game.pauseGame()}>resume</button>
        ) : (
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginRight: margin,
              }}
            >
              <div
                onClick={() => {
                  game.swapHoldPiece();
                }}
              >
                <h3>Hold</h3>
                <Grid
                  squareSize={squareSize}
                  width={4}
                  height={3}
                  viewData={viewData["holdPiece"]}
                />
              </div>
              <StatsDisplay
                lines={viewData["lines"]}
                score={viewData["score"]}
                level={viewData["level"]}
              />
            </div>
            <div>
              <Grid
                squareSize={squareSize}
                width={board.width}
                height={board.height}
                viewData={viewData["board"]}
                highlightRows={viewData["highlight"]}
              />
            </div>
            <div
              style={{
                marginLeft: margin,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3>Queue</h3>
                <Grid
                  squareSize={squareSize}
                  width={4}
                  height={12}
                  viewData={viewData["queue"]}
                />
              </div>
              <button onClick={() => game.pauseGame()}>Pause</button>
            </div>
          </div>
        )
      ) : (
        <button onClick={() => game.run()}>start</button>
      )}
    </div>
  );
}

export default App;
