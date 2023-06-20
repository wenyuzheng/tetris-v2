import Grid from "./Grid";
import StatsDisplay from "./StatsDisplay";

const HoldGrid = ({ squareSize, data, holdHandler }) => {
  return (
    <div onClick={holdHandler}>
      <h3>Hold</h3>
      <Grid squareSize={squareSize} width={4} height={3} viewData={data} />
    </div>
  );
};

const LeftColumn = ({
  margin,
  squareSize,
  lines,
  score,
  level,
  data,
  holdHandler,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginRight: margin,
      }}
    >
      <HoldGrid squareSize={squareSize} data={data} holdHandler={holdHandler} />
      <StatsDisplay lines={lines} score={score} level={level} />
    </div>
  );
};

export default LeftColumn;
