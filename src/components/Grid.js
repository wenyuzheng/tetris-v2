import styled from "styled-components";

const StyledGrid = styled.div`
  width: ${(props) => props.squareSize * props.board.width}px;
  height: ${(props) => props.squareSize * props.board.height}px;
  display: grid;
  grid-template-rows: repeat(${(props) => props.board.height}, 1fr);
  grid-template-columns: repeat(${(props) => props.board.width}, 1fr);
  gap: 1px;
  background-color: black;
  float: left;
  grid-auto-flow: column;
`;

const hasCell = (i, j, cells) => {
  for (const cell of cells) {
    if (cell.x === i && cell.y === j) return cell;
  }
  return false;
};

const Grid = ({ board, piece }) => {
  const squareSize = 50;

  const xIndices = [...Array(board.width).keys()];
  const yIndices = [...Array(board.height).keys()].reverse();

  return (
    <StyledGrid squareSize={squareSize} board={board}>
      {xIndices.map((i) => {
        return yIndices.map((j) => {
          const cells = board.cells.concat(piece.cells);
          const cell = hasCell(i, j, cells);
          if (cell !== false) {
            return (
              <div key={`${i}-${j}}`} style={{ backgroundColor: cell.color }} />
            );
          }
          return (
            <div key={`${i}-${j}}`} style={{ backgroundColor: "#a4a4a4" }}>
              {`${i}-${j}`}
            </div>
          );
        });
      })}
    </StyledGrid>
  );
};

export default Grid;
