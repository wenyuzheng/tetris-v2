import Cell from "../../lib/Cell";

describe("Cell", () => {
  test("moveDown", () => {
    const cell = new Cell(1, 1, "blue");
    cell.moveDown();
    expect(cell.y).toEqual(2);
  });
});
