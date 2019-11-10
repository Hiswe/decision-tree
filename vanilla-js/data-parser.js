export function treeToArray(level, index = 0, result = []) {
  const isLastResult = level.left == null;
  if (isLastResult) return result;
  const ownLevel = {
    text: `${level.feature} ${level.rule} ${level.value}`
  };
  result[index] = result[index] || [];
  result[index].push(ownLevel);

  treeToArray(level.left, index + 1, result);
  treeToArray(level.right, index + 1, result);
  return result;
}
