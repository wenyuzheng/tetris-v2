import styled from "styled-components";

const StyledGrid = styled.div`
  width: ${(props) => props.squareSize * props.width}px;
  height: ${(props) => props.squareSize * props.height}px;
  display: grid;
  grid-template-rows: repeat(${(props) => props.height}, 1fr);
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
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

const Grid = ({ width, height, viewData }) => {
  const squareSize = 50;

  const xIndices = [...Array(width).keys()];
  const yIndices = [...Array(height).keys()].reverse();

  return (
    <StyledGrid squareSize={squareSize} width={width} height={height}>
      {xIndices.map((i) => {
        return yIndices.map((j) => {
          const cell = hasCell(i, j, viewData);
          return (
            <div
              key={`${i}-${j}}`}
              style={{
                backgroundColor: cell === false ? "#3a3b3c" : cell.color,
              }}
            />
          );
        });
      })}
    </StyledGrid>
  );
};

export default Grid;
