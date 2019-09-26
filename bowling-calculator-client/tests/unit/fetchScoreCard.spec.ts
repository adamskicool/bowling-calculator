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

    //TODO
    test("Invalid feched data does not effect the state", () => {

    })
})