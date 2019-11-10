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
}


