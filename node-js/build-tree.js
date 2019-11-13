import { inspect } from "util";

import { buildLayout } from "../vanilla-js/data-parser.js";
import regressionData from "../vanilla-js/tree-data.js";
import classificationData from "../vanilla-js/tree-data-classification.js";

const regressionLayout = buildLayout(regressionData);
const classificationLayout = buildLayout(classificationData);

// console.log(inspect(regressionLayout, { depth: 10, colors: true }));
// console.log(inspect(classificationLayout, { depth: 10, colors: true }));
// console.log(classificationLayout.extents)
// classificationLayout.each(node =>
//   console.log(
//     {
//       x: node.x,
//       y: node.y,
//       height: node.height,
//       top: node.top,
//       bottom: node.bottom,
//       left: node.left,
//       right: node.right,
//       extents: node.extents
//     }
//   )
// );
