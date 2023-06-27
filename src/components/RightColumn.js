import Grid from "./Grid";

const RightColumn = ({
  margin,
  squareSize,
  data,
  pauseHandler,
  musicHandler,
  soundHandler,
  isMusicOn,
  isSoundOn,
}) => {
  return (
    <div
      style={{
        marginLeft: margin,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ margin: "auto" }}>
        <h3>Queue</h3>
        <Grid
          squareSize={(squareSize / 3) * 2}
          width={4}
          height={20}
          viewData={data}
          noGrid={true}
        />
      </div>

      <button onClick={musicHandler}>
        {isMusicOn ? "Music Off" : "Music On"}
      </button>
      <button onClick={soundHandler}>
        {isSoundOn ? "Sound Off" : "Sound On"}
      </button>
      <button onClick={pauseHandler}>Pause</button>
    </div>
  );
};

export default RightColumn;
