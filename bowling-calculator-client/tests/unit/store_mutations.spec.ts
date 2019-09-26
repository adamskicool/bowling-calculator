import { mutations } from '../../src/store'

describe("Test the fetching process when adding a new roll", () => {

    test("Valid fetched data when adding a new roll is stored correctly in the store", async () => {
        //mock the state
        let state = {
            historicRolls: [],
            scoreCard: [],
            totalScore: 0
        }

        return mutations.addRoll(state, 1).then(() => {
            expect(state.historicRolls).toEqual([1, 2, 3])
            expect(state.totalScore).toEqual(6)
            expect(state.scoreCard).toEqual([])
        });
    })

    test("Reset mutation works as expected", () => {
        let state = {
            historicRolls: [1, 2, 3],
            scoreCard: [],
            totalScore: 6
        }
        let resetState = {
            historicRolls: [],
            scoreCard: [],
            totalScore: 0
        }

        mutations.resetBowlingSet(state);
        expect(state).toEqual(resetState);
    })
})
