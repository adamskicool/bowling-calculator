<template>
  <div class="frame-final">
    <div class="frame-number display-in-center" id="frame-number">
      <p>{{this.frameNumber}}</p>
    </div>
    <div class="first-shot display-in-center" id="first-shot">
      <p v-if="!allPins(this.firstShot)">{{this.firstShot}}</p>
      <p v-else>X</p>
    </div>
    <div class="second-shot display-in-center" id="second-shot">
      <p v-if="allPins(this.firstShot) && allPins(this.secondShot)">X</p>
      <p v-else-if="!allPins(this.firstShot) && allPins(this.firstShot + this.secondShot)">/</p>
      <p v-else>{{this.secondShot}}</p>
    </div>
    <div class="third-shot display-in-center" id="third-shot">
      <!-- If [strike, spare], show spare -->
      <p
        v-if="allPins(this.firstShot) && !allPins(this.secondShot) && allPins(this.secondShot + this.thirdShot)"
      >/</p>
      <!-- [spare, strike], show strike -->
      <p
        v-else-if="allPins(this.thirdShot) && allPins(this.firstShot + this.secondShot) && !allPins(this.firstShot)"
      >X</p>
      <!-- if [strike, strike, strike], show strike -->
      <p
        v-else-if="allPins(this.firstShot) && allPins(this.secondShot) && allPins(this.thirdShot)"
      >X</p>
      <!-- else just show the number -->
      <p v-else>{{this.thirdShot}}</p>
    </div>
    <div class="points display-in-center" id="points">
      <p>{{this.points}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["frameNumber", "firstShot", "secondShot", "thirdShot", "points"],
  methods: {
    //check if any of the shots are strikes
    allPins(roll: number) {
      if (roll == 10) {
        return true;
      } else {
        return false;
      }
    }
  }
});
</script>

<style scoped>
.frame-final {
  display: grid;
  grid-template-areas:
    "e e e"
    "a b c"
    "d d d";
  grid-template-columns: 25px 25px 25px;
  grid-template-rows: 20px 35px 35px;
  border: 2px solid black;
}
.second-shot,
.third-shot {
  border-left: 2px solid black;
  border-bottom: 2px solid black;
}
.first-shot {
  grid-area: a;
}
.second-shot {
  grid-area: b;
}
.third-shot {
  grid-area: c;
}
.points {
  grid-area: d;
}
.frame-number {
  grid-area: e;
  border-bottom: 2px solid black;
}
</style>