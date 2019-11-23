<script>
import flow from 'lodash.flow';

import { buildLayout } from '../vanilla-js/data-parser.js';
import DecisionTreeItem from './decision-tree-item.vue';

const formatPercent = new Intl.NumberFormat(`en`, {
    style: `percent`,
    minimumFractionDigits: 2,
}).format;

function filterInteger(value) {
    return !Number.isInteger(value);
}
function cutIntegerPart(value) {
    value = Math.abs(value);
    return value - Math.trunc(value);
}
function unicValues(array) {
    return [...new Set(array)];
}

const getScaleFactor = flow(
    (key, array) => array.map((node) => node[key]),
    (array) => array.filter(filterInteger),
    (array) => array.map(cutIntegerPart),
    (array) => unicValues(array),
    (array) => 1 / array.reduce((acc, value) => acc * value, 1),
);

export default {
    name: `decistion-tree`,
    components: { DecisionTreeItem },
    props: {
        tree: { type: Object, required: true },
    },
    data() {
        return { d3LeafSize: [1, 2] };
    },
    computed: {
        leafSize() {
            const [width, height] = this.d3LeafSize;
            return { width, height };
        },
        d3ArrayTree() {
            return buildLayout(this.tree, this.d3LeafSize);
        },
        arrayTree() {
            const layout = this.d3ArrayTree;
            // extents is the max size
            const { extents } = layout;
            const topShit = Math.abs(extents.left);
            const nodes = [];
            layout.each((d3Node) => {
                const { children, size, ...data } = d3Node.data;
                nodes.push({
                    _id: `${d3Node.x}-${d3Node.y}`,
                    xSize: d3Node.xSize,
                    ySize: d3Node.ySize,
                    x: d3Node.x,
                    y: d3Node.y,
                    data,
                });
            });
            return {
                topShit,
                extents,
                width: Math.abs(extents.left) + Math.abs(extents.right),
                height: Math.abs(extents.top) + Math.abs(extents.bottom),
                nodes,
            };
        },
        dimensions() {
            const { extents } = this.d3ArrayTree;
            const { nodes } = this.arrayTree;
            const scaleWitdhFactor = getScaleFactor(`y`, nodes);
            const scaleHeightFactor = getScaleFactor(`x`, nodes);
            const extendWidth = Math.abs(extents.top) + Math.abs(extents.bottom);
            const extendHeight = Math.abs(extents.left) + Math.abs(extents.right);
            return {
                extents,
                topShit: Math.abs(extents.left),
                scaleWitdhFactor,
                scaleHeightFactor,
                extendWidth,
                extendHeight,
                columns: Math.round(extendWidth * scaleWitdhFactor),
                rows: Math.round(extendHeight * scaleHeightFactor),
            };
        },
        treeStyle() {
            return {
                'grid-template-columns': `repeat(${this.dimensions.columns}, minmax(0, 1fr))`,
            };
        },
    },
};
</script>

<template>
    <section class="decision-tree">
        <aside class="decision-tree__aside">
            columns: {{dimensions.columns}}
            <br />
            rows: {{dimensions.rows}}
        </aside>
        <div class="tree" :style="treeStyle">
            <decision-tree-item
                v-for="node in arrayTree.nodes"
                :key="node._id"
                :node="node"
                :scale-col-factor="dimensions.scaleWitdhFactor"
                :scale-row-factor="dimensions.scaleHeightFactor"
                :top-shit="dimensions.topShit"
            >
                <strong>{{node._id}}</strong>
                <br />
                {{ node.data.text || `avg. value: ${node.data.value}`}}
            </decision-tree-item>
        </div>
        <!-- <div class="tree">
    <aside class="connectors">
      <ol
        class="connectors__section"
        v-for="(section, sectionIndex) in arrayTree"
        :key="`connectors-${sectionIndex}`"
      >
        <li class="connectors__item" v-for="leaf in section" :key="`connector-${leaf.id}`">
          <svg viewBox="0 0 2 12" preserveAspectRatio="none" class="connectors__lines">
            <path class="connectors__line connectors__line--yes" d="M 0,6  C 1,6 1,3 2,3" />
            <path class="connectors__line connectors__line--no" d="M 0,6  C 1,6 1,9 2,9" />
          </svg>
        </li>
      </ol>
        </aside>-->
    </section>
</template>

<style lang="scss" scoped>
.decision-tree {
    --tree-gutter: 0 1rem;
    --tree-yes: hsl(81, 44%, 50%);
    --tree-no: #b93c3c;
    --tree-decision-background: rgb(126, 198, 226);
    --tree-result-background: orange;

    position: relative;
    padding: 5rem 0 0;
}
.decision-tree__aside {
    position: absolute;
    top: 1rem;
    left: 1rem;
}

//
// TREE
//

.tree {
    display: grid;
    // min-height: 100vh;
    grid-template-rows: repeat(5, minmax(0, 1fr));
    grid-gap: 0 3rem;
    padding: 1rem;
}

.tree__section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 0 0 var(--tree-column-width);
    width: var(--tree-column-width);
    list-style: none;
    margin: 0;
    padding: 0 var(--tree-gutter);
}
.tree__leaf {
    padding: 0.5rem;
    background: var(--tree-decision-background);
    text-align: center;
}
.tree__section:last-child .tree__leaf {
    background: var(--tree-result-background);
}
.tree__section:last-child .tree__leaf:nth-child(odd) {
    margin-top: 1rem;
    margin-bottom: 0.25rem;
}
.tree__section:last-child .tree__leaf:nth-child(even) {
    margin-top: 0.25rem;
    margin-bottom: 1rem;
}

//
// CONNECTORS
//

.connectors {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    pointer-events: none;
    overflow: hidden;
    margin: 0;
}
.connectors__section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 0 0 var(--tree-column-width);
    width: var(--tree-column-width);
    margin: 0;
    padding: 0 var(--tree-gutter);
    list-style: none;
    align-items: flex-end;
}
.connectors__item {
    flex: 1 0 auto;
    width: calc(var(--tree-gutter) * 2);
    transform: translateX(100%);
    position: relative;
}
// .connectors__lines {
//   position: absolute;
//   width: 100%;
//   top: 0;
//   bottom: 0;
//   height: 100%;
// }
// .connectors__line {
//   stroke-width: 1.5;
//   stroke: black;
//   fill: none;
//   // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/vector-effect
//   // https://www.w3.org/TR/SVGTiny12/painting.html#NonScalingStroke
//   // https://stackoverflow.com/a/1304602
//   vector-effect: non-scaling-stroke;
// }
// .connectors__line--yes {
//   stroke: var(--tree-yes);
// }
// .connectors__line--no {
//   stroke: var(--tree-no);
// }
.connectors__section:last-child {
    // keep the last section to be rightfully positioned
    visibility: hidden;
}
.connectors__section:nth-last-child(2) .connectors__item {
    margin-top: 0.66rem;
    margin-bottom: 0.66rem;
}
</style>
