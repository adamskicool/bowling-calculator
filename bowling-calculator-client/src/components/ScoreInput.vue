<template>
  <div class="score-input">
    <input
      v-for="button in this.buttons"
      v-bind:key="button"
      type="button"
      v-bind:value="button"
      v-on:click="addRollToStore(button)"
    />
    <input type="button" value="Reset score" v-on:click="resetBowlingSet()" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  methods: {
    addRollToStore(roll: number) {
      // console.log("adding score " + this.score);
      this.$store.commit("addRoll", roll);
    },
    resetBowlingSet() {
      this.$store.commit("resetBowlingSet");
    }
  }
});
</script>

<style scoped>
</style>