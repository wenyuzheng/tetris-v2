import Board from "../../lib/Board";
import Cell from "../../lib/Cell";

describe("Board", () => {
  it("removeSingleFullRow eg1", () => {
    const cellsArr = [
      new Cell(0, 1),
      new Cell(1, 1),
      new Cell(3, 1),
      new Cell(0, 0),
      new Cell(1, 0),
      new Cell(2, 0),
      new Cell(3, 0),
    ];
    const board = new Board(4, 4, cellsArr);
    board.removeSingleFullRow(0);
    const expected = [new Cell(0, 0), new Cell(1, 0), new Cell(3, 0)];
    const result = board.cellsArr;
    expect(result).toEqual(expected);
  });

  it("removeSingleFullRow eg2", () => {
    const cellsArr = [
      new Cell(0, 2),
      new Cell(0, 1),
      new Cell(1, 1),
      new Cell(2, 1),
      new Cell(3, 1),
      new Cell(1, 0),
      new Cell(2, 0),
      new Cell(3, 0),
    ];
    const board = new Board(4, 4, cellsArr);
    board.removeSingleFullRow(1);
    const expected = [
      new Cell(0, 1),
      new Cell(1, 0),
      new Cell(2, 0),
      new Cell(3, 0),
    ];
    const result = board.cellsArr;
    expect(result).toEqual(expected);
  });

  it("removeFullRows eg1", () => {
    const cellsArr = [
      new Cell(0, 2),
      new Cell(0, 1),
      new Cell(1, 1),
      new Cell(2, 1),
      new Cell(3, 1),
      new Cell(0, 0),
      new Cell(1, 0),
      new Cell(2, 0),
      new Cell(3, 0),
    ];
    const board = new Board(4, 4, cellsArr);
    board.removeFullRows();
    const expected = [new Cell(0, 0)];
    const result = board.cellsArr;
    expect(result).toEqual(expected);
  });

  it("removeFullRows eg2", () => {
    const cellsArr = [
      new Cell(0, 2),
      new Cell(1, 2),
      new Cell(2, 2),
      new Cell(3, 2),
      new Cell(0, 1),
      new Cell(1, 1),
      new Cell(0, 0),
      new Cell(1, 0),
      new Cell(2, 0),
      new Cell(3, 0),
    ];
    const board = new Board(4, 4, cellsArr);
    board.removeFullRows();
    const expected = [new Cell(0, 0), new Cell(1, 0)];
    const result = board.cellsArr;
    expect(result).toEqual(expected);
  });

  it("removeFullRows eg3", () => {
    const cellsArr = [
      new Cell(2, 2),
      new Cell(0, 1),
      new Cell(1, 1),
      new Cell(2, 1),
      new Cell(3, 1),
      new Cell(0, 0),
      new Cell(2, 0),
      new Cell(3, 0),
    ];
    const board = new Board(4, 4, cellsArr);
    board.removeFullRows();
    const expected = [
      new Cell(2, 1),
      new Cell(0, 0),
      new Cell(2, 0),
      new Cell(3, 0),
    ];
    const result = board.cellsArr;
    expect(result).toEqual(expected);
  });
});
