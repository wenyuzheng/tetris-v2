const StatsBox = ({ title, stats }) => {
  return (
    <div style={{ margin: 10 }}>
      <h4 style={{ margin: 5 }}>{title}</h4>
      <h5 style={{ margin: 5 }}>{stats}</h5>
    </div>
  );
};

const StatsDisplay = ({ lines, score, level }) => {
  return (
    <div style={{ border: "2px black solid" }}>
      <StatsBox title="Lines" stats={lines} />
      <StatsBox title="Score" stats={score} />
      <StatsBox title="Level" stats={level} />
    </div>
  );
};

export default StatsDisplay;
