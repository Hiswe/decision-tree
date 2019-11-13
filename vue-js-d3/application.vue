<script>
import REGRESSION_TREE from "../vanilla-js/tree-data.js";
import CLASSIFICATION_TREE from "../vanilla-js/tree-data-classification.js";
import DecisionTree from "./decision-tree.vue";

export default {
  name: `application`,
  components: { DecisionTree },
  data() {
    return {
      // tree: REGRESSION_TREE
      tree: CLASSIFICATION_TREE
    };
  }
};
</script>


<template >
  <main class="container">
    <decision-tree :tree="tree" />
  </main>
</template>

<style lang="scss" scoped>
</style>
