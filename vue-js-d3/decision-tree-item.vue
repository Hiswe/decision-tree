<script>
export default {
  name: `decision-tree-item`,
  props: {
    node: { type: Object, required: true },
    topShit: { type: Number, default: 0 },
    scaleColFactor: { type: Number, default: 1 },
    scaleRowFactor: { type: Number, default: 1 }
  },
  computed: {
    componentClasses() {
      return { "tree__pouic--leaf": this.node.data.isLastResult };
    },
    position() {
      const { node, topShit, scaleColFactor, scaleRowFactor } = this;
      const rowStart = Math.round((node.x + topShit) * scaleRowFactor - 1);
      const rowSize = Math.round(node.xSize * scaleRowFactor);
      const colStart = Math.round(node.y * scaleColFactor + 1);
      const colSize = Math.round(node.ySize * scaleColFactor);
      return { colStart, colSize, rowStart, rowSize };
    },
    componentStyles() {
      const { position } = this;
      return {
        "grid-column": `${position.colStart} / span ${position.colSize}`,
        "grid-row": `${position.rowStart} / span ${position.rowSize}`
      };
    }
  }
};
</script>

<template>
  <div class="tree__pouic" :class="componentClasses" :style="componentStyles">
    <strong>{{node._id}}</strong>
    <br />
    {{ node.data.text || `avg. value: ${node.data.value}`}}
  </div>
</template>

<style lang="scss" scoped>
.tree__pouic {
  margin: 1rem 0;
  outline: 1px solid blue;
}
.tree__pouic--leaf {
  outline: 1px solid red;
}
</style>
