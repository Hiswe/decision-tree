export const result = [
  [{ text: `grade <= 8.500` }],
  [{ text: `lat <= 47.534` }, { text: `sqft_living <= 4062.500` }]
];

export function treeToArray(level, index= 0, previousResult = []) {
  const isLastResult = level.left == null
  if (isLastResult) return previousResult
  const ownLevel = {
    text: `${level.feature} ${level.rule} ${level.value}`
  }
  previousResult[index] = previousResult[index] || []
  previousResult[index].push(ownLevel)

  treeToArray(level.left, index + 1, previousResult)
  treeToArray(level.right, index + 1, previousResult)
  return previousResult
// const isLastNode =
}


