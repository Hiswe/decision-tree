<script>
import flow from 'lodash.flow';
import resize from 'vue-resize-directive';

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
    directives: { resize },
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
            // https://github.com/klortho/d3-flextree
            const layout = this.d3ArrayTree;
            const nodes = [];
            layout.each((d3Node) => {
                const { children, size, ...data } = d3Node.data;
                const currentIndex = nodes.length;
                nodes.push({
                    _id: `${d3Node.x}-${d3Node.y}`,
                    currentIndex,
                    node: d3Node,
                    parent: d3Node.parent,
                    parentIndex: nodes.findIndex((previousNodes) => previousNodes.node === d3Node.parent),
                    xSize: d3Node.xSize,
                    ySize: d3Node.ySize,
                    x: d3Node.x,
                    y: d3Node.y,
                    data,
                });
            });
            return nodes;
        },
        dimensions() {
            const { extents } = this.d3ArrayTree;
            const scaleWitdhFactor = getScaleFactor(`y`, this.arrayTree);
            const scaleHeightFactor = getScaleFactor(`x`, this.arrayTree);
            const extendWidth = Math.abs(extents.top) + Math.abs(extents.bottom);
            const extendHeight = Math.abs(extents.left) + Math.abs(extents.right);
            return {
                extents,
                topShit: Math.abs(extents.left) * scaleHeightFactor,
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
    methods: {
        // we need to compute links between node when DOM is ready 
        // • https://www.vuescript.com/vue-directive-window-resize-events/
        computeLinkSize() {
            this.$refs.treeItems.forEach(treeItem => treeItem.computeLinkSize())
        }
    }
};
</script>

<template>
    <section class="decision-tree">
        <aside class="decision-tree__aside">
            columns: {{ dimensions.columns }}
            <br />
            rows: {{ dimensions.rows }}
        </aside>
        <div class="decision-tree__content" :style="treeStyle" v-resize:debounce.50="computeLinkSize">
            <decision-tree-item
                v-for="node in arrayTree"
                :key="node._id"
                :node="node"
                :scale-col-factor="dimensions.scaleWitdhFactor"
                :scale-row-factor="dimensions.scaleHeightFactor"
                :top-shit="dimensions.topShit"
                ref="treeItems"
                
            >
                <strong>{{ node._id }}</strong>
                <br />
                {{ node.data.text || `avg. value: ${node.data.value}` }}
            </decision-tree-item>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.decision-tree {
    --tree-column-gutter: 5rem;
    --tree-yes: hsl(81, 44%, 50%);
    --tree-no: #b93c3c;
    --tree-decision-background: rgb(126, 198, 226);
    --tree-result-background: orange;

    position: relative;
    padding: 5rem 1rem 1rem;
}
.decision-tree__aside {
    position: absolute;
    top: 1rem;
    left: 1rem;
}
.decision-tree__content {
    display: grid;
    grid-template-rows: repeat(5, minmax(0, 1fr));
    grid-gap: 0 var(--tree-column-gutter);
    outline: 1px solid grey;
}
</style>
