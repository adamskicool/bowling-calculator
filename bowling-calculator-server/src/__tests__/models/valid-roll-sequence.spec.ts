import { addRoll, validSequenceOfRolls } from '../../services/bowling-logic';

describe("Test function for adding a new roll", () => {
    let historicRolls: number[];
    beforeEach(() => {
        historicRolls = [];
    })

    test("adding first roll", () => {
        let addedRoll: number[] = addRoll(historicRolls, 1)
        expect(addedRoll.length).toEqual(1);
    })

    test("adding a strike within the first 9 frames should add two rolls, a 10 and a 0", () => {
        let addedRoll: number[] = addRoll(historicRolls, 10)
        expect(addedRoll.length).toEqual(2);
        expect(addedRoll).toEqual([10, 0]);
    })

    test("Adding strikes in the last frame should not add an extra 0", () => {
        historicRolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //zeros for the first 9 frames.
        let addedRoll: number[] = addRoll(historicRolls, 10);
        expect(addedRoll.length).toEqual(19);
    })
})


describe("Test validation of bowling strike sequences", () => {

    test("Will not approve of negative rolls", () => {
        let rolls = [-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        expect(validSequenceOfRolls(rolls)).toBeFalsy();
    })

    test("Catches cases where a regular frame has to many points", () => {
        let rolls = [10, 0, 5, 5];
        expect(validSequenceOfRolls(rolls)).toBeTruthy();
        rolls = [10, 1, 5, 5];
        expect(validSequenceOfRolls(rolls)).toBeFalsy();
    })

    test("Not more than 21 rolls", () => {
        let rolls = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        expect(validSequenceOfRolls(rolls)).toBeFalsy();
    })
    /**
     * Testing the last 3 shots more extensively as they contain the most corner cases.
     */
    test("Two ending strikes", () => {
        let rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10]
        expect(validSequenceOfRolls(rolls)).toBeTruthy();
    })

    test("Ending with two strikes and valid third shot", () => {
        let rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 1]
        expect(validSequenceOfRolls(rolls)).toBeTruthy();
    })

    test("Ending with two strikes and invalid third shot", () => {
        let rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 11]
        expect(validSequenceOfRolls(rolls)).toBeFalsy();
    })

    test("Three ending strikes", () => {
        let rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10]
        expect(validSequenceOfRolls(rolls)).toBeTruthy();
    })

    test("Ending with spare and strike", () => {
        let rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 10]
        expect(validSequenceOfRolls(rolls)).toBeTruthy();
    })

    test("Ending with a strike and a spare", () => {
        let rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5, 5]
        expect(validSequenceOfRolls(rolls)).toBeTruthy();
    })

    test("Ending with no spares or strikes", () => {
        let rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1]
        expect(validSequenceOfRolls(rolls)).toBeTruthy();
    })

    test("Ending with no spares or strikes wrong", () => {
        let rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1]
        expect(validSequenceOfRolls(rolls)).toBeFalsy();
    })

    test("Ending with strike and two invalid strikes", () => {
        let rolls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5, 6]
        expect(validSequenceOfRolls(rolls)).toBeFalsy();
    })
})