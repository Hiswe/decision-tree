export function treeToArray(level, index = 0, result = []) {
  const isLastResult = level.left == null;

  const ownLevel = !isLastResult ? {
    text: `${level.feature} ${level.rule} ${level.value}`,
    samples: level.samples,
  } : {
    value: level.value[0],
    samplesPercentage: level.samples / result[0][0].samples,
  };
  result[index] = result[index] || [];
  result[index].push(ownLevel);

  if (isLastResult) return result;

  treeToArray(level.left, index + 1, result);
  treeToArray(level.right, index + 1, result);
  return result;
}
