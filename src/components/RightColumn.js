import Grid from "./Grid";

const RightColumn = ({ margin, squareSize, data, pauseHandler }) => {
  return (
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
        <Grid squareSize={squareSize} width={4} height={12} viewData={data} />
      </div>
      <button onClick={pauseHandler}>Pause</button>
    </div>
  );
};

export default RightColumn;
