import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Board from "./lib/classes/Board";
import Game from "./lib/classes/Game";
import generatePiece from "./lib/functions/generatePiece";
import Grid from "./components/Grid";
import useWindowSize from "./lib/hooks/useWindowSize";
import HotKeyContainer from "./containers/HotKeyContainer";
import LeftColumn from "./components/LeftColumn";
import RightColumn from "./components/RightColumn";
import UseSwipeContainer from "./containers/UseSwipeContainer";
import PausePage from "./components/PausePage";

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
    music: false,
    sound: false,
  });

  useEffect(() => {
    game.viewUpdater = setViewData;
  }, []);

  const windowSize = useWindowSize();
  const margin = windowSize.width <= 767 ? 10 : 20;
  const squareSize =
    windowSize.width >= 1024 ? 30 : (windowSize.width - margin * 4) / 18;

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
          <PausePage
            resumeHandler={(e) => {
              e.stopPropagation();
              game.pauseGame();
            }}
          />
        ) : (
          <HotKeyContainer handleKeyPress={handleKeyPress}>
            <UseSwipeContainer
              swipeRight={() => game.movePiece("right")}
              swipeLeft={() => game.movePiece("left")}
              swipeDown={() => game.movePiece("down")}
              swipeUp={() => game.swapHoldPiece()}
              onClick={() => game.rotatePiece()}
              fastDown={() => game.hardDropPiece()}
            >
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
                  isMusicOn={viewData["music"]}
                  isSoundOn={viewData["sound"]}
                  pauseHandler={(e) => {
                    e.stopPropagation();
                    game.pauseGame();
                  }}
                  musicHandler={(e) => {
                    e.stopPropagation();
                    game.playMusic();
                    e.target.blur();
                  }}
                  soundHandler={(e) => {
                    e.stopPropagation();
                    game.onOffSound();
                    e.target.blur();
                  }}
                />
              </div>
            </UseSwipeContainer>
          </HotKeyContainer>
        )
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            game.run();
          }}
        >
          start
        </button>
      )}
    </div>
  );
}

export default App;
