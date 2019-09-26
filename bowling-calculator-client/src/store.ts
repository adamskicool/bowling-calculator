import Vue from 'vue'
import Vuex from 'vuex'
import { fetchScoreCard } from './services/bowlingAPIFetch'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // bowlingSet: new BowlingSet()
    historicRolls: [],
    scoreCard: [],
    totalScore: 0
  },
  mutations: {
    /**
     * Add a roll to the bowlingset and update its scorecard.
     * @param state 
     * @param newRoll the amount of pins that the roll knocked over.
     */
    addRoll(state, newRoll) {
      fetchScoreCard(state.historicRolls, newRoll)
        .then(result => {
          if (result.data.validRoll) {
            state.historicRolls = result.data.historicRolls
            state.scoreCard = result.data.scoreCard
            state.totalScore = result.data.totalScore
          } else {
            alert(result.data.message)
          }
        })
    },
    /**
     * Reset the bowling set, that is restore the bowlingset to its original state, which is empty.
     * @param state 
     */
    resetBowlingSet(state) {
      state.historicRolls = [];
      state.scoreCard = [];
    }
  },
  actions: {

  },
  getters: {

    scoreCard(state) {
      return state.scoreCard;
    },
    total(state): number {
      return state.totalScore;
    }
  }
})
