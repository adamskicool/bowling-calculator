/**
 * Mock call to axios.get.
 */

export default {
    get: jest.fn(() => {
        let testFrames = {
            validRoll: true,
            scoreCard: [],
            historicRolls: [1, 2, 3],
            totalScore: 6
        }
        return Promise.resolve({ data: testFrames })
    })
}