import styled from "styled-components";
import Square from "./Square";

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

const Grid = ({ squareSize, width, height, viewData, highlightRows = [] }) => {
  const xIndices = [...Array(width).keys()];
  const yIndices = [...Array(height).keys()].reverse();

  return (
    <StyledGrid squareSize={squareSize} width={width} height={height}>
      {xIndices.map((i) => {
        return yIndices.map((j) => {
          const color = viewData[`${i}-${j}`];
          return (
            <Square
              key={`${i}-${j}}`}
              color={color && color !== "ghost" ? color : "#3a3b3c"}
              isHighlight={highlightRows.includes(j)}
              isGhost={color === "ghost"}
            />
          );
        });
      })}
    </StyledGrid>
  );
};

export default Grid;
