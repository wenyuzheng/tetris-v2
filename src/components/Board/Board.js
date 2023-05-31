import Cell from "./Cell";
import styled from "styled-components";

const Board = () => {
  const numRows = 18;
  const numCols = 10;

  const Grid = styled.div``;

  return (
    <div>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div key={rowIndex}>
          {Array.from({ length: numCols }).map((_, colIndex) => (
            <Cell
              key={`${rowIndex}_${colIndex}`}
              position={[rowIndex, colIndex]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
