import "./Square.css";

const Square = ({ color, isHighlight, isGhost }) => {
  const classname = isHighlight && color ? "flashHighlight" : "";

  return (
    <div
      className={classname}
      style={{
        backgroundColor: color,
        border: isGhost ? `1px solid ${isGhost}` : null,
      }}
    />
  );
};

export default Square;
