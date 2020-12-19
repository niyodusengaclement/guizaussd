import { difference } from "lodash";
export const findDifference = (a, b) => {
  let changes = [];
  const items = difference(a, b);

  const handleDifference = (iteratee) => {
    for (const item of items) {
      if (iteratee.state_id === item.state_id) {
        return changes.push(iteratee);
      };
    }
  };

  for (const iterator of b) handleDifference(iterator);
  return changes;
};
