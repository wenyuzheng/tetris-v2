import Cell from "../../lib/Cell";

describe("Cell", () => {
  test("moveDown", () => {
    const cell = new Cell(1, 1, "blue");
    cell.moveDown();
    expect([cell.x, cell.y]).toEqual([1, 0]);
  });

  test("rotateClockwise eg1", () => {
    const cell = new Cell(3, 1, "blue");
    const centerPosition = [0, 0];
    cell.rotateClockwise(centerPosition);
    expect([cell.x, cell.y]).toEqual([1, -3]);
  });

  test("rotateClockwise eg2", () => {
    const cell = new Cell(3, 1, "blue");
    const centerPosition = [2, 0];
    cell.rotateClockwise(centerPosition);
    expect([cell.x, cell.y]).toEqual([3, -1]);
  });

  test("rotateClockwise eg3", () => {
    const cell = new Cell(2, 5, "blue");
    const centerPosition = [1, -2];
    cell.rotateClockwise(centerPosition);
    expect([cell.x, cell.y]).toEqual([8, -3]);
  });
});
