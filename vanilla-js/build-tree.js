import TREE from "./tree-data.js";
import { treeToArray } from "./data-parser.js";

const formatPercent = new Intl.NumberFormat(`en`, { style: `percent`, minimumFractionDigits: 2 }).format;

const result = treeToArray(TREE);

const cssColumnWidth = `--tree-column-width: ${formatPercent(1 / result.length)}`

function buildTree(tree) {
  return `<section class="tree" style="${cssColumnWidth}">
${tree.map(buildWrapper).join(`\n`)}
</section>`;
}
function buildWrapper(stepsData) {
  return `<ol class="tree__section">
${buildNodes(stepsData)}
</ol>`;
}
function buildNodes(stepsData) {
  return stepsData
    .map(step => step.text ? `<li class="tree__item">${step.text}</li>` : `<li class="tree__item">${step.value}<br> (${formatPercent(step.samplesPercentage)})</li>`)
    .join(`\n`);
}

function buildConnectors(tree) {
  return `<section class="connectors" style="${cssColumnWidth}">
${tree.map(buildConnectorWrapper).join(`\n`)}
</section>`;
}
function buildConnectorWrapper(stepsData) {
  return `<ol class="connectors__section">
${buildConnectorNodes(stepsData)}
</ol>`;
}
// https://css-tricks.com/svg-path-syntax-illustrated-guide/
function buildConnectorNodes(stepsData) {
  return stepsData
    .map(
      step => `<li class="connectors__item">
<svg viewBox="0 0 2 12" preserveAspectRatio="none">
<path
  d="M 0,6
  C 1,6 1,3 2,3"
/>
<path
  d="M 0,6
  C 1,6 1,9 2,9"
/>
</svg>
</li>`
    )
    .join(`\n`);
}

document.querySelector(`#main`).innerHTML = `
${buildTree(result)}
${buildConnectors(result)}
`;
