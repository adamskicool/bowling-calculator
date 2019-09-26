<template functional>
  <div class="total-score">
    <div class="banner display-in-center">
      <p>Total:</p>
    </div>
    <div class="score display-in-center">
      <p>{{props.totalScore}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    totalScore: Number
  }
});
</script>

<style scoped>
.total-score {
  display: grid;
  grid-template-areas:
    "a"
    "b";
  grid-template-rows: 30px 60px;
  grid-template-columns: 70px;
  border: 2px solid black;
  border-left: none;
}
.banner {
  grid-area: a;
  border-bottom: 2px solid black;
}
.score {
  grid-area: b;
}
</style>