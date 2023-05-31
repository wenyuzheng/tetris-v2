const Cell = ({ position, color = "white" }) => {
  const [x, y] = position;

  const style = {
    width: 20,
    height: 20,
    backgroundColor: color,
  };

  return <div style={style}>{y}</div>;
};

export default Cell;
