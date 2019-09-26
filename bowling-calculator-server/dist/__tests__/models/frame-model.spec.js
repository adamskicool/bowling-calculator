"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_model_1 = require("../../models/frame-model");
/**
 * Testing the classes Frame and FinalFrame. Most likely the tests in this test suite should be extended.
 */
describe("Testing the class Frame and FinalFrame", () => {
    let frame5 = new frame_model_1.FinalFrame([10, 10, 10], null);
    let frame4 = new frame_model_1.Frame([10, 0], frame5);
    let frame3 = new frame_model_1.Frame([10, 0], frame4);
    let frame2 = new frame_model_1.Frame([1, 9], frame3);
    let frame1 = new frame_model_1.Frame([1, 2], frame2);
    test("pincount", () => {
        expect(frame1.pinCount).toEqual(3);
        expect(frame2.pinCount).toEqual(10);
        expect(frame3.pinCount).toEqual(10);
        expect(frame4.pinCount).toEqual(10);
        expect(frame5.pinCount).toEqual(30);
    });
    test("Frames get correct Bowling terminologi, that is they are correctly classified as strike, spare and normal", () => {
        expect(frame1.frameStatus).toEqual(frame_model_1.BowlingTermnilogi.Normal);
        expect(frame2.frameStatus).toEqual(frame_model_1.BowlingTermnilogi.Spare);
        expect(frame3.frameStatus).toEqual(frame_model_1.BowlingTermnilogi.Strike);
    });
    test("strikes number of in comming frames ahead", () => {
        expect(frame1.numberOfStrikesAhead()).toEqual(0);
        expect(frame2.numberOfStrikesAhead()).toEqual(5);
        expect(frame3.numberOfStrikesAhead()).toEqual(4);
        expect(frame4.numberOfStrikesAhead()).toEqual(3);
        expect(frame5.numberOfStrikesAhead()).toEqual(2);
    });
    test("calculate score of frames", () => {
        expect(frame1.calculateFrameScore()).toEqual(3);
        expect(frame2.calculateFrameScore()).toEqual(20);
        expect(frame3.calculateFrameScore()).toEqual(30);
        expect(frame4.calculateFrameScore()).toEqual(30);
        expect(frame5.calculateFrameScore()).toEqual(30);
    });
});
