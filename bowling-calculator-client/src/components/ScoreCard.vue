<template>
  <div class="score-card box">
    <!-- This background uses the frames components by only passing the frameNumbers,
    this is done to create an empty grid. -->
    <div class="background">
      <frame-standard v-bind:frameNumber="1" />
      <frame-standard v-bind:frameNumber="2" />
      <frame-standard v-bind:frameNumber="3" />
      <frame-standard v-bind:frameNumber="4" />
      <frame-standard v-bind:frameNumber="5" />
      <frame-standard v-bind:frameNumber="6" />
      <frame-standard v-bind:frameNumber="7" />
      <frame-standard v-bind:frameNumber="8" />
      <frame-standard v-bind:frameNumber="9" />
      <frame-final v-bind:frameNumber="10" />
      <!-- Also use a stateless component for displaying the total score of the scorecard -->
      <total-score v-bind:totalScore="this.$store.getters.total" />
    </div>
    <div class="actual-frames">
      <div v-for="frame in this.$store.getters.scoreCard" v-bind:key="frame.frameNumber">
        <frame-standard
          v-if="frame.frameNumber < 10"
          v-bind:firstShot="frame.strokes[0]"
          v-bind:secondShot="frame.strokes[1]"
          v-bind:points="frame.accumulatedScore"
        />
        <frame-final
          v-else
          v-bind:firstShot="frame.strokes[0]"
          v-bind:secondShot="frame.strokes[1]"
          v-bind:thirdShot="frame.strokes[2]"
          v-bind:points="frame.accumulatedScore"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FrameStandard from "./ScoreCardComponents/FrameStandard.vue";
import FrameFinal from "./ScoreCardComponents/FrameFinal.vue";
import TotalScore from "./ScoreCardComponents/TotalScore.vue";
import Vue from "vue";

export default Vue.extend({
  components: { FrameStandard, FrameFinal, TotalScore },
  data() {
    return {};
  },
  methods: {
    getBowlingSet() {
      return this.$store.getters.bowlingSet;
    }
  }
});
</script>

<style scoped>
.score-card {
  width: auto;
  height: auto;
  display: flex;
}

.background {
  position: relative;
  display: flex;
}

.actual-frames {
  display: flex;
  position: absolute;
}
</style>