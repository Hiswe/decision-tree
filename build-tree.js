import TREE from "./tree-data.js";
import { treeToArray } from "./data-parser.js";

const result = treeToArray(TREE);
// console.log(treeToArray(TREE));

function buildTree(tree) {
  return tree.map(buildWrapper).join(`\n`);
}

function buildWrapper(stepsData) {
  return `<ol class="wrapper">
  ${buildNodes(stepsData)}
</ol>`;
}

function buildNodes(stepsData) {
  return stepsData.map(step => `<li>${step.text}</li>`).join(`\n`);
}

document.querySelector(`#main`).innerHTML = buildTree(result);
// console.log(buildTree(result))
