import { flextree } from "d3-flextree";

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

const layout = flextree();

export function buildTreeForD3Layout(node, [xSize, ySize] = [1, 1]) {
  const isLastResult = node.left == null && node.right == null;
  const data = isLastResult
    ? {
        value: node.value[0],
        samples: node.samples
      }
    : {
        text: `${node.feature} ${node.rule} ${node.value}`,
        samples: node.samples
      };
  const computedNode = {
    size: [xSize, ySize],
    isLastResult,
    ...data
  };

  if (isLastResult) return computedNode;
  const children = [];
  if (node.left != null) children.push(buildTreeForD3Layout(node.left));
  if (node.right != null) children.push(buildTreeForD3Layout(node.right));

  computedNode.children = children;

  return computedNode;
}

export function buildLayout(tree) {
  return layout(layout.hierarchy(buildTreeForD3Layout(tree)))
}
