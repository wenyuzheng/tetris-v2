import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Board from "./lib/classes/Board";
import Game from "./lib/classes/Game";
import generatePiece from "./lib/functions/generatePiece";
import Grid from "./components/Grid";
import useWindowSize from "./lib/hooks/useWindowSize";
import useSwipe from "./lib/hooks/useSwipe";
import HotKeyContainer from "./containers/HotKeyContainer";
import LeftColumn from "./components/LeftColumn";
import RightColumn from "./components/RightColumn";
import UseSwipeContainer from "./containers/UseSwipeContainer";

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
    start: false,
    pause: true,
  });

  useEffect(() => {
    game.viewUpdater = setViewData;
  }, []);

  const windowSize = useWindowSize();
  const margin = windowSize.width <= 767 ? 10 : 20;
  const squareSize =
    windowSize.width >= 1024 ? 30 : (windowSize.width - margin * 4) / 18;

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

  return (
    <div className="App">
      <h1>Tetris</h1>
      {viewData["start"] ? (
        viewData["pause"] ? (
          <button onClick={() => game.pauseGame()}>resume</button>
        ) : (
          <HotKeyContainer handleKeyPress={handleKeyPress}>
            <UseSwipeContainer swipeActions={swipeActions}>
              <div style={{ display: "flex" }}>
                <LeftColumn
                  margin={margin}
                  squareSize={squareSize}
                  lines={viewData["lines"]}
                  score={viewData["score"]}
                  level={viewData["level"]}
                  data={viewData["holdPiece"]}
                  holdHandler={(e) => {
                    e.stopPropagation();
                    game.swapHoldPiece();
                  }}
                />
                <Grid
                  squareSize={squareSize}
                  width={board.width}
                  height={board.height}
                  viewData={viewData["board"]}
                  highlightRows={viewData["highlight"]}
                />
                <RightColumn
                  margin={margin}
                  squareSize={squareSize}
                  data={viewData["queue"]}
                  pauseHandler={(e) => {
                    e.stopPropagation();
                    game.pauseGame();
                  }}
                />
              </div>
            </UseSwipeContainer>
          </HotKeyContainer>
        )
      ) : (
        <button onClick={() => game.run()}>start</button>
      )}
    </div>
  );
}

export default App;
