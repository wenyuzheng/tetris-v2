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

const Grid = ({ width, height, viewData }) => {
  const squareSize = 30;

  const xIndices = [...Array(width).keys()];
  const yIndices = [...Array(height).keys()].reverse();

  return (
    <StyledGrid squareSize={squareSize} width={width} height={height}>
      {xIndices.map((i) => {
        return yIndices.map((j) => {
          const cell = viewData[`${i}-${j}`];
          return (
            <div
              key={`${i}-${j}}`}
              style={{
                backgroundColor: cell === undefined ? "#3a3b3c" : cell,
              }}
            />
          );
        });
      })}
    </StyledGrid>
  );
};

export default Grid;
