import flow from 'lodash.flow';
import { flextree } from 'd3-flextree';

function filterInteger(value) {
    return !Number.isInteger(value);
}
function cutIntegerPart(value) {
    value = Math.abs(value);
    return value - Math.trunc(value);
}
function uniqueValues(array) {
    return [...new Set(array)];
}
export const getScaleFactor = flow(
    (key, array) => array.map((node) => node[key]),
    (array) => array.filter(filterInteger),
    (array) => array.map(cutIntegerPart),
    (array) => uniqueValues(array),
    (array) => 1 / array.reduce((acc, value) => acc * value, 1),
);

function buildTreeDataForD3Layout(node, [xSize, ySize] = [1, 1]) {
    const isLastResult = node.left == null && node.right == null;
    const { left, right, ...cleanData } = node;
    const computedNode = {
        size: [xSize, ySize],
        ...cleanData,
    };
    if (isLastResult) return computedNode;

    const children = [];
    if (node.left != null) children.push(buildTreeDataForD3Layout(node.left));
    if (node.right != null) children.push(buildTreeDataForD3Layout(node.right));
    computedNode.children = children;
    return computedNode;
}

const layout = flextree();

export const buildD3Tree = flow(
    buildTreeDataForD3Layout,
    layout.hierarchy,
    layout,
)


export function d3LayoutToArray(d3Layout) {
    // https://github.com/klortho/d3-flextree
    const layout = d3Layout;
    const nodes = [];
    layout.each((d3Node) => {
        const { children, size, ...data } = d3Node.data;
        const currentIndex = nodes.length;
        nodes.push({
            _id: `${d3Node.x}-${d3Node.y}`,
            currentIndex,
            node: d3Node,
            parent: d3Node.parent,
            isLast: !d3Node.hasChildren,
            parentIndex: nodes.findIndex((previousNodes) => previousNodes.node === d3Node.parent),
            xSize: d3Node.xSize,
            ySize: d3Node.ySize,
            x: d3Node.x,
            y: d3Node.y,
            data,
        });
    });
    return nodes;
}