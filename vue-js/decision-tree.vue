<script>
import { treeToArray } from "../vanilla-js/data-parser.js";

const formatPercent = new Intl.NumberFormat(`en`, { style: `percent`, minimumFractionDigits: 2 }).format;

export default {
  name: `decistion-tree`,
  props: {
    tree: { type: Object, required: true }
  },
  computed: {
    arrayTree() {
      return treeToArray(this.tree).map((section, sectionIndex) => {
        return section.map((item, itemIndex) => ({
          ...item,
          id: `${sectionIndex}-${itemIndex}`
        }));
      });
    },
    style() {
      return {
        "--tree-column-width": formatPercent(1 / this.arrayTree.length)
      };
    }
  }
};
</script>

<template>
  <section class="decision-tree" :style="style">
    <div class="tree">
      <ol
        class="tree__section"
        v-for="(section, sectionIndex) in arrayTree"
        :key="`section-${sectionIndex}`"
      >
        <li class="tree__leaf" v-for="leaf in section" :key="leaf.id">
          <span v-if="leaf.text">{{ leaf.text }}</span>
          <span v-else>avg. value: {{leaf.value | number}} <br />(samples: {{leaf.samplesPercentage | percent}})</span>
        </li>
      </ol>
    </div>
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
    </aside>
  </section>
</template>

<style lang="scss" scoped>
.decision-tree {
  --tree-gutter: 1rem;
  --tree-yes: hsl(81, 44%, 50%);
  --tree-no: #b93c3c;
  position: relative;
}

//
// TREE
//

.tree {
  display: flex;
  min-height: 100vh;
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
  background: rgb(126, 198, 226);
  text-align: center;
}
.tree__section:last-child .tree__leaf {
  background: orange;
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
.connectors__lines {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  height: 100%;
}
.connectors__line {
  stroke-width: 1.5;
  stroke: black;
  fill: none;
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/vector-effect
  // https://www.w3.org/TR/SVGTiny12/painting.html#NonScalingStroke
  // https://stackoverflow.com/a/1304602
  vector-effect: non-scaling-stroke;
}
.connectors__line--yes {
  stroke: var(--tree-yes);
}
.connectors__line--no {
  stroke: var(--tree-no);
}
.connectors__section:last-child {
  // keep the last section to be rightfully positioned
  visibility: hidden;
}
.connectors__section:nth-last-child(2) .connectors__item {
  margin-top: 0.66rem;
  margin-bottom: 0.66rem;
}
</style>
