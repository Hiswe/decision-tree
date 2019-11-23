<script>
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
        nodeClasses() {
            return {
                'decision-tree-item__node--no': !this.isParentLower,
                'decision-tree-item__node--root': this.isRoot,
                'decision-tree-item__node--end': this.node.data.isLastResult,
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
            return {
                'transform': `scaleY(${isParentLower ? 1 : -1})`,
                'grid-column': `${parentPosition.colStart} / span ${position.colSize * 2}`,
                'grid-row': `${isParentLower ? position.rowStart : parentPosition.rowStart} / span ${position.rowSize *
                    2}`,
            };
        },
        lineClasses() {
            if (this.isRoot) return false;
            return {
                'decision-tree-item__line--no': !this.isParentLower,
            };
        },
    },
    methods: {
        getGridPosition(d3Node) {
            const { topShit, scaleColFactor, scaleRowFactor } = this;
            const rowStart = Math.round((d3Node.x + topShit) * scaleRowFactor - 1);
            const rowSize = Math.round(d3Node.xSize * scaleRowFactor);
            const colStart = Math.round(d3Node.y * scaleColFactor + 1);
            const colSize = Math.round(d3Node.ySize * scaleColFactor);
            return { colStart, colSize, rowStart, rowSize };
        },
    },
};
</script>

<template>
    <div class="decision-tree-item">
        <div class="decision-tree-item__node" :class="nodeClasses" :style="nodeStyles">
            <slot />
        </div>
        <div class="decision-tree-item__link" :style="lineStyles" v-if="!isRoot">
            <svg viewBox="0 0 2 12" preserveAspectRatio="none" class="decision-tree-item__lines">
                <path
                    class="decision-tree-item__line decision-tree-item__line--yes"
                    d="M 0,6  C 1,6 1,3 2,3"
                    :class="lineClasses"
                />
                <!-- <path class="decision-tree-item__line decision-tree-item__line--no" d="M 0,6  C 1,6 1,9 2,9" /> -->
            </svg>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.decision-tree-item {
    display: contents;
}
.decision-tree-item__node {
    margin: 1rem 0;
    outline: 1px solid;
    align-self: center;
}
.decision-tree-item__node--root {
    outline: 1px solid black;
    background: black;
    color: white;
}
.decision-tree-item__node--no {
    outline: 1px solid red;
}
.decision-tree-item__node--end {
    outline: 1px solid purple;
}
.decision-tree-item__link {
    background: rgba(0, 100, 255, 0.1);
    position: relative;
}
.decision-tree-item__lines {
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
