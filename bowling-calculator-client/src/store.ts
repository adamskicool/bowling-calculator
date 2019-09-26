import Vue from 'vue'
import Vuex from 'vuex'
import { fetchScoreCard } from './services/bowlingAPIFetch'

Vue.use(Vuex)


const state = {
  // bowlingSet: new BowlingSet()
  historicRolls: [],
  scoreCard: [],
  totalScore: 0
}

export const mutations = {
  /**
     * Add a roll to the bowlingset and update its scorecard.
     * @param state 
     * @param newRoll the amount of pins that the roll knocked over.
     */
  addRoll: (state: any, newRoll: number) => {
    return fetchScoreCard(state.historicRolls, newRoll)
      .then(result => {
        if (result.data.validRoll) {
          state.historicRolls = result.data.historicRolls
          state.scoreCard = result.data.scoreCard
          state.totalScore = result.data.totalScore
        }
      })
  },
  /**
   * Reset the bowling set, that is restore the bowlingset to its original state, which is empty.
   * @param state 
   */
  resetBowlingSet: (state: any) => {
    state.historicRolls = [];
    state.scoreCard = [];
    state.totalScore = 0;
  }
}

export const actions = {

}

export const getters = {
  scoreCard(state: any) {
    return state.scoreCard;
  },
  total(state: any): number {
    return state.totalScore;
  }
}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
