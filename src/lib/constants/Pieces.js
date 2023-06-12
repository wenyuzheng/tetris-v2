const square = {
  shape: [
    [1, 1],
    [1, 1],
  ],
  color: "red",
};

const tube = {
  shape: [[1, 1, 1, 1]],
  color: "blue",
  centerIndex: 1,
};

const leftL = {
  shape: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  color: "orange",
  centerIndex: 1,
};

const rightL = {
  shape: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  color: "green",
  centerIndex: 1,
};

const hat = {
  shape: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  color: "purple",
  centerIndex: 2,
};

const leftStep = {
  shape: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  color: "yellow",
  centerIndex: 1,
};

const rightStep = {
  shape: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  color: "cyan",
  centerIndex: 1,
};

const pieces = { square, tube, leftL, rightL, hat, leftStep, rightStep };

export default pieces;
