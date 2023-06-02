import Cell from "../../../lib/classes/Cell";

describe("Cell", () => {
  it("moveDown", () => {
    const cell = new Cell(1, 1, "blue");
    cell.moveDown();
    expect([cell.x, cell.y]).toEqual([1, 0]);
    expect(cell).toEqual(new Cell(1, 0, "blue"));
  });

  test("moveLeft", () => {
    const cell = new Cell(1, 1, "blue");
    cell.moveLeft();
    expect([cell.x, cell.y]).toEqual([0, 1]);
  });

  test("moveRight", () => {
    const cell = new Cell(1, 1, "blue");
    cell.moveRight();
    expect([cell.x, cell.y]).toEqual([2, 1]);
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
