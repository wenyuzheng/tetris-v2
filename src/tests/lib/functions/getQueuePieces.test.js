import getQueuePieces from "../../../lib/functions/getQueuePieces";

describe("getQueuePieces", () => {
  test("eg 1", () => {
    const arr = getQueuePieces(5);
    const obj = {};
    const invalid = false;

    arr.forEach((e) => {
      if (obj[e] > 2) {
        invalid = true;
        return;
      }
      obj[e] ? (obj[e] += 1) : (obj[e] = 1);
    });
    expect(invalid).toEqual(false);
  });
});
