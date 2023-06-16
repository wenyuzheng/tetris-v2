import "./Square.css";

const Square = ({ color, isHighlight }) => {
  const classname = isHighlight && color ? "flashHighlight" : "";

  return (
    <div
      className={classname}
      style={{ backgroundColor: color ? color : "#3a3b3c" }}
    />
  );
};

export default Square;
