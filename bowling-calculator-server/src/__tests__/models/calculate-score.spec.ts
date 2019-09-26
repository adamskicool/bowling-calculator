import { calculateScore } from '../../services/bowling-logic';

describe("Test that the scoring function is working correctly", () => {
    test("All strikes", () => {
        let rolls = [10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 10];
        expect(calculateScore(rolls)).toEqual(300);
    })

    test("Combination of strikes, spares and normal frames", () => {
        let rolls = [10, 0, 5, 5, 4, 0];
        expect(calculateScore(rolls)).toEqual(38);
    })

    test("Full game without strikes or spares", () => {
        let rolls = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        expect(calculateScore(rolls)).toEqual(20);
    })
})