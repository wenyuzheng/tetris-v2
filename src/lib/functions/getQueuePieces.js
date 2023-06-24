import _ from "lodash";
import pieces from "../constants/Pieces";

export default (number) => {
  const array = [];
  for (let i = 0; i < number; i++) {
    const piece = _.sample(Object.keys(pieces));
    while (array.filter((e) => e === piece).length === 2) {
      piece = _.sample(Object.keys(pieces));
    }
    array.push(piece);
  }

  return array;
};
