<script>
import debounce from 'lodash.debounce';

function getElementHeight($el) {
    const height = $el.offsetHeight;
    const computedStyles = getComputedStyle($el, null);
    const margins = [`marginTop`, `marginBottom`]
        .map((cssProperty) => computedStyles[cssProperty])
        .map((cssValue) => Number.parseInt(cssValue, 10))
        .reduce((acc, value) => acc + value, 0);
    return height + margins;
}

export default {
    name: `decision-tree-item`,
    props: {
        node: { type: Object, required: true },
        topShit: { type: Number, default: 0 },
        scaleColFactor: { type: Number, default: 1 },
        scaleRowFactor: { type: Number, default: 1 },
    },
    computed: {
        isRoot() {
            return this.node.parent == null;
        },
        position() {
            return this.getGridPosition(this.node);
        },
        parentPosition() {
            if (this.isRoot) return false;
            const parentPosition = this.getGridPosition(this.node.parent);
            return parentPosition;
        },
        isParentLower() {
            if (this.isRoot) return false;
            return this.parentPosition.rowStart - this.position.rowStart > 0;
        },
        nodeContentClasses() {
            return {
                'decision-tree-item__node-content--no': !this.isParentLower,
                'decision-tree-item__node-content--root': this.isRoot,
                'decision-tree-item__node-content--end': this.node.data.isLastResult,
            };
        },
        nodeStyles() {
            const { position } = this;
            return {
                'grid-column': `${position.colStart} / span ${position.colSize}`,
                'grid-row': `${position.rowStart} / span ${position.rowSize}`,
            };
        },

        lineStyles() {
            if (this.isRoot) return false;
            const { position, parentPosition, isParentLower } = this;
            const rowStart = Math.min(position.rowStart, parentPosition.rowStart);
            const rowEnd = Math.max(position.rowStart, parentPosition.rowStart) + position.rowSize;
            return {
                'transform': `scaleY(${isParentLower ? 1 : -1})`,
                'grid-column': `${parentPosition.colStart} / ${position.colStart + position.colSize}`,
                'grid-row': `${rowStart} / ${rowEnd}`,
            };
        },
        lineClasses() {
            if (this.isRoot) return false;
            return {
                'decision-tree-item__line--no': !this.isParentLower,
            };
        },
    },
    created() {
        // TODO: maybe improve with
        // https://www.vuescript.com/vue-directive-window-resize-events/
        this.computeLinkSize = debounce(this.computeLinkSize, 50);
    },
    mounted() {
        window.requestAnimationFrame(() => this.computeLinkSize());
        window.addEventListener(`resize`, this.computeLinkSize);
        // console.log(this.getWrapper)
    },
    beforeDestroy() {
        window.removeEventListener(`resize`, this.computeLinkSize);
    },
    methods: {
        getGridPosition(d3Node) {
            const { topShit, scaleColFactor, scaleRowFactor } = this;
            const rowStart = Math.round((d3Node.x + topShit) * scaleRowFactor);
            const rowSize = Math.round(d3Node.xSize * scaleRowFactor);
            const colStart = Math.round(d3Node.y * scaleColFactor + 1);
            const colSize = Math.round(d3Node.ySize * scaleColFactor);
            return { colStart, colSize, rowStart, rowSize };
        },
        // we can't get the real height of the boxes until they are in the DOM
        computeLinkSize() {
            if (this.isRoot) return false;
            const { isParentLower, node } = this;
            const $treeRoot = this.$el.parentNode
            const parentNode = $treeRoot.querySelector(`.decision-tree-item:nth-child(${node.parentIndex + 1}) .decision-tree-item__node`);
            const currentNode = this.$el.querySelector(`.decision-tree-item__node`);
            const parentNodeHeight = getElementHeight(parentNode) / 2;
            const currentNodeHeight = getElementHeight(currentNode) / 2;
            const { svg } = this.$refs;
            svg.style.height = `calc(100% - ${currentNodeHeight + parentNodeHeight}px)`;
            svg.style.top = `${isParentLower ? currentNodeHeight : parentNodeHeight}px`;
            svg.style.bottom = `${isParentLower ? parentNodeHeight : currentNodeHeight}px`;
        },
    },
};
</script>

<template>
    <div class="decision-tree-item">
        <div class="decision-tree-item__node" :style="nodeStyles">
            <div class="decision-tree-item__node-content" :class="nodeContentClasses">
                <slot />
            </div>
        </div>
        <div
            class="decision-tree-item__link"
            :style="lineStyles"
            :class="{'decision-tree-item__link--no': !isParentLower,}"
            v-if="!isRoot"
        >
            <svg
                viewBox="0 0 2 2"
                preserveAspectRatio="none"
                class="decision-tree-item__svg"
                ref="svg"
            >
                <!-- https://css-tricks.com/svg-path-syntax-illustrated-guide/ -->
                <path
                    class="decision-tree-item__line decision-tree-item__line--yes"
                    stroke="black"
                    stroke-width="1"
                    fill="none"
                    d="M 0,2 C 1,2 1,0 2,0"
                    :class="lineClasses"
                />
            </svg>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.decision-tree-item {
    display: contents;
}
.decision-tree-item__node {
    margin: .5rem 0;
    display: flex;
    align-items: center;
    outline: 1px solid pink;
}
.decision-tree-item__node-content {
    outline: 1px solid;
    align-self: center;
    width: 100%;
}
.decision-tree-item__node-content--no {
    outline: 1px solid red;
}
.decision-tree-item__node-content--end {
    outline: 1px solid purple;
}
.decision-tree-item__node-content--root {
    outline: 1px solid black;
    background: black;
    color: white;
}
.decision-tree-item__link {
    position: relative;
    transform-origin: center center;
    pointer-events: none;
}
.decision-tree-item__link--no {
    // background: rgba(255, 50, 0, 0.1);
}
.decision-tree-item__svg {
    position: absolute;
    width: var(--tree-column-gutter);
    transform: translateX(-50%);
    left: 50%;
    top: 0;
    bottom: 0;
    height: 100%;
}
.decision-tree-item__line {
    stroke-width: 1.5;
    stroke: black;
    fill: none;
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/vector-effect
    // https://www.w3.org/TR/SVGTiny12/painting.html#NonScalingStroke
    // https://stackoverflow.com/a/1304602
    vector-effect: non-scaling-stroke;
}
.decision-tree-item__line--yes {
    stroke: var(--tree-yes);
}
.decision-tree-item__line--no {
    stroke: var(--tree-no);
}
</style>
