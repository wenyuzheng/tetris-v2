import Board from "../../../lib/classes/Board";
import Cell from "../../../lib/classes/Cell";

describe("Board", () => {
  it("addCells eg1", () => {
    const cells = [new Cell(0, 1), new Cell(1, 1), new Cell(3, 2)];
    const board = new Board(4, 4, []);
    board.addCells(cells);
    expect(board.cellsArr).toEqual([
      new Cell(0, 1),
      new Cell(1, 1),
      new Cell(3, 2),
    ]);
  });

  it("addCells eg2", () => {
    const cells = [new Cell(0, 1), new Cell(1, 1), new Cell(3, 2)];
    const board = new Board(4, 4, [new Cell(2, 1), new Cell(0, 2)]);
    board.addCells(cells);
    expect(board.cellsArr).toEqual([
      new Cell(2, 1),
      new Cell(0, 2),
      new Cell(0, 1),
      new Cell(1, 1),
      new Cell(3, 2),
    ]);
  });

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

  test("isPositionValid outside board left", () => {
    const board = new Board(4, 4, []);
    const result = board.isPositionValid(-1, 1);
    expect(result).toEqual(false);
  });

  test("isPositionValid outside board right", () => {
    const board = new Board(4, 4, []);
    const result = board.isPositionValid(4, 1);
    expect(result).toEqual(false);
  });

  test("isPositionValid outside board down", () => {
    const board = new Board(4, 4, []);
    const result = board.isPositionValid(2, -1);
    expect(result).toEqual(false);
  });

  test("isPositionValid inside board eg1", () => {
    const board = new Board(4, 4, []);
    const result = board.isPositionValid(3, 3);
    expect(result).toEqual(true);
  });

  test("isPositionValid inside board eg2", () => {
    const board = new Board(4, 4, []);
    const result = board.isPositionValid(1, 1);
    expect(result).toEqual(true);
  });

  test("isPositionValid meet cell eg1", () => {
    const board = new Board(4, 4, [new Cell(1, 1)]);
    const result = board.isPositionValid(1, 1);
    expect(result).toEqual(false);
  });

  test("isPositionValid meet cell eg2", () => {
    const board = new Board(4, 4, [new Cell(1, 1)]);
    const result = board.isPositionValid(1, 0);
    expect(result).toEqual(true);
  });

  // test("moveCurrPiece right", () => {
  //   const piecePositions = [
  //     [0, 2],
  //     [1, 2],
  //     [1, 0],
  //     [2, 0],
  //   ];
  //   const piece = new Piece(piecePositions);
  //   const board = new Board(4, 4, [], piece);
  //   board.moveCurrPiece("right");
  //   const result = piece.cells;
  //   const expected = [
  //     new Cell(1, 2),
  //     new Cell(2, 2),
  //     new Cell(2, 0),
  //     new Cell(3, 0),
  //   ];
  //   expect(result).toEqual(expected);
  // });

  // test("moveCurrPiece left", () => {
  //   const piecePositions = [
  //     [1, 2],
  //     [2, 2],
  //     [2, 0],
  //     [3, 0],
  //   ];
  //   const piece = new Piece(piecePositions);
  //   const board = new Board(4, 4, [], piece);
  //   board.moveCurrPiece("left");
  //   const result = piece.cells;
  //   const expected = [
  //     new Cell(0, 2),
  //     new Cell(1, 2),
  //     new Cell(1, 0),
  //     new Cell(2, 0),
  //   ];
  //   expect(result).toEqual(expected);
  // });

  // test("moveCurrPiece down", () => {
  //   const piecePositions = [
  //     [0, 2],
  //     [1, 2],
  //     [1, 1],
  //     [2, 1],
  //   ];
  //   const piece = new Piece(piecePositions);
  //   const board = new Board(4, 4, [], piece);
  //   board.moveCurrPiece("down");
  //   const result = piece.cells;
  //   const expected = [
  //     new Cell(0, 1),
  //     new Cell(1, 1),
  //     new Cell(1, 0),
  //     new Cell(2, 0),
  //   ];
  //   expect(result).toEqual(expected);
  // });

  // test("isValidToMove down eg1", () => {
  //   const piecePositions = [
  //     [0, 1],
  //     [1, 1],
  //     [1, 0],
  //     [2, 0],
  //   ];
  //   const piece = new Piece(piecePositions);
  //   const board = new Board(4, 4, [], piece);
  //   const result = board.isValidToMoveCurrPiece("down");
  //   expect(result).toEqual(false);
  // });

  // test("isValidToMove down eg2", () => {
  //   const piecePositions = [
  //     [0, 2],
  //     [1, 2],
  //     [1, 1],
  //     [2, 1],
  //   ];
  //   const piece = new Piece(piecePositions);
  //   const board = new Board(4, 4, [], piece);
  //   const result = board.isValidToMoveCurrPiece("down");
  //   expect(result).toEqual(true);
  // });

  // test("isValidToMove left eg1", () => {
  //   const piecePositions = [
  //     [0, 1],
  //     [1, 1],
  //     [1, 0],
  //     [2, 0],
  //   ];
  //   const piece = new Piece(piecePositions);
  //   const board = new Board(4, 4, [], piece);
  //   const result = board.isValidToMoveCurrPiece("left");
  //   expect(result).toEqual(false);
  // });

  // test("isValidToMove left eg2", () => {
  //   const piecePositions = [
  //     [1, 2],
  //     [2, 2],
  //     [2, 0],
  //     [3, 0],
  //   ];
  //   const piece = new Piece(piecePositions);
  //   const board = new Board(4, 4, [], piece);
  //   const result = board.isValidToMoveCurrPiece("left");
  //   expect(result).toEqual(true);
  // });

  // test("isValidToMove right eg1", () => {
  //   const piecePositions = [
  //     [0, 1],
  //     [1, 1],
  //     [1, 0],
  //     [2, 0],
  //   ];
  //   const piece = new Piece(piecePositions);
  //   const board = new Board(3, 4, [], piece);
  //   const result = board.isValidToMoveCurrPiece("right");
  //   expect(result).toEqual(false);
  // });

  // test("isValidToMove right eg2", () => {
  //   const piecePositions = [
  //     [0, 1],
  //     [1, 1],
  //     [1, 0],
  //     [2, 0],
  //   ];
  //   const piece = new Piece(piecePositions);
  //   const board = new Board(4, 4, [], piece);
  //   const result = board.isValidToMoveCurrPiece("right");
  //   expect(result).toEqual(true);
  // });
});
