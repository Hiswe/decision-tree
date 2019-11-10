<script>
import Vue from "vue";

export default {
  data() {
    return {
      bundler: "Parcel"
    };
  }
};
</script>


<template >
  <div class="container">
    Hello {{bundler}}
    </div>

</template>

<style lang="scss" scoped>
.container {
  color: green;
}
</style>
