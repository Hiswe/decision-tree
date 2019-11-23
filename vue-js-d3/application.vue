<script>
import REGRESSION_TREE from "../vanilla-js/tree-data.js";
import CLASSIFICATION_TREE from "../vanilla-js/tree-data-classification.js";
import DecisionTree from "./decision-tree.vue";

const REGRESSION = `regression`
const CLASSIFICATION = `classification`

const TREES = {
  [REGRESSION]: REGRESSION_TREE,
  [CLASSIFICATION]: CLASSIFICATION_TREE
}

export default {
  name: `application`,
  components: { DecisionTree },
  data() {
    return {
      treeName: CLASSIFICATION,
    };
  },
  computed: {
    treeNames() {
      return Object.keys(TREES)
    },
    tree() {
      return TREES[this.treeName]
    }
  }
};
</script>


<template >
  <main class="container">
    <select v-model="treeName" class="tree-select">
      <option v-for="name in treeNames" :key="name" :value="name" v-text="name" />
    </select>
    <decision-tree :tree="tree" />
  </main>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  padding-top: 2rem;
}
.tree-select {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 2;
}
</style>
