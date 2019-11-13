import { inspect } from "util";

import { buildLayout} from '../vanilla-js/data-parser.js'
import regressionData from "../vanilla-js/tree-data.js";
import classificationData from "../vanilla-js/tree-data-classification.js";

const regressionLayout = buildLayout(regressionData);
const classificationLayout = buildLayout(classificationData);

// console.log(inspect(regressionLayout, { depth: 10, colors: true }));
console.log(inspect(classificationLayout, { depth: 10, colors: true }));
