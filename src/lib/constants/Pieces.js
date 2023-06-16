const square = {
  shape: [
    [1, 1],
    [1, 1],
  ],
  color: "#ffff00",
};

const tube = {
  shape: [[1, 1, 1, 1]],
  color: "#00ffff",
  centerIndex: 1,
};

const leftL = {
  shape: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  color: "#ff7f00",
  centerIndex: 1,
};

const rightL = {
  shape: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  color: "#0000ff",
  centerIndex: 1,
};

const hat = {
  shape: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  color: "#800080",
  centerIndex: 2,
};

const leftStep = {
  shape: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  color: "#00ff00",
  centerIndex: 1,
};

const rightStep = {
  shape: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  color: "#ff0000",
  centerIndex: 1,
};

const pieces = { square, tube, leftL, rightL, hat, leftStep, rightStep };

export default pieces;
