<template>
  <div class="bowling-calculator-view">
    <div class="controlls">
      <ScoreInput />
    </div>
    <div class="score-cards">
      <ScoreCard />
    </div>
  </div>
</template>

<script lang="ts">
import ScoreCard from "../components/ScoreCard.vue";
import ScoreInput from "../components/ScoreInput.vue";
import Vue from "vue";

export default Vue.extend({
  components: { ScoreCard, ScoreInput }
});
</script>

<style scoped>
.bowling-calculator-view {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.score-cards {
  width: auto;
}
</style>