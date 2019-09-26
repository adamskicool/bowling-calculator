<template>
  <div class="frame-standard">
    <div class="frame-number display-in-center" id="frame-number">
      <p>{{this.frameNumber}}</p>
    </div>
    <div class="first-shot display-in-center" id="first-shot">
      <p v-if="!isStrike()">{{this.firstShot}}</p>
    </div>
    <div class="second-shot display-in-center" id="second-shot">
      <p v-if="!isStrike() && !isSpare()">{{this.secondShot}}</p>
      <p v-if="isStrike()">X</p>
      <p v-if="isSpare()">/</p>
    </div>
    <div class="points display-in-center" id="points">
      <p>{{this.points}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["frameNumber", "firstShot", "secondShot", "points"],
  methods: {
    /**
     * This function determines weather or not a this frame is a strike or not.
     */
    isStrike() {
      if (this.firstShot == 10) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * This function determines weather or not a this frame is a spare or not.
     */
    isSpare() {
      if (this.firstShot + this.secondShot == 10 && !this.isStrike()) {
        return true;
      } else {
        return false;
      }
    }
  }
});
</script>

<style scoped>
.frame-standard {
  display: grid;
  grid-template-areas:
    "d d"
    "a b"
    "c c";
  grid-template-columns: 35px 35px;
  grid-template-rows: 20px 35px 35px;
  border: 2px solid black;
  border-right: 1px solid black;
}

.first-shot {
  grid-area: a;
}
.second-shot {
  grid-area: b;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
}
.points {
  grid-area: c;
}
.frame-number {
  grid-area: d;
  border-bottom: 2px solid black;
}
</style>