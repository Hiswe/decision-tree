<script>
import TREE from "../vanilla-js/tree-data.js";
import DecisionTree from "./decision-tree.vue";

export default {
  name: `application`,
  components: { DecisionTree },
  data() {
    return {
      tree: TREE
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
