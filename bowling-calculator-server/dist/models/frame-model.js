"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BowlingTermnilogi;
(function (BowlingTermnilogi) {
    BowlingTermnilogi[BowlingTermnilogi["Strike"] = 0] = "Strike";
    BowlingTermnilogi[BowlingTermnilogi["Spare"] = 1] = "Spare";
    BowlingTermnilogi[BowlingTermnilogi["Normal"] = 2] = "Normal";
})(BowlingTermnilogi || (BowlingTermnilogi = {}));
exports.BowlingTermnilogi = BowlingTermnilogi;
/**
 * A bowling frame. Each bowling session consists of 10 frames, where each frame consists of either two strokes or
 * one stroke (if the player score a strike on the first stroke), with the exceptoin of the 10th frame that may contain
 * three strokes. This Frame class is meant to model the 9 first frames, the last frame is modelled by the class FinalFrame,
 * which inherits from this class.
 */
class Frame {
    /**
     *
     * @param strokes The bowling strokes associated with this frame
     * @param nextFrame Pointer to the frame ahead of this frame, if such frame exists, otherwise null
     */
    constructor(strokes, nextFrame) {
        this.pinCount = 0; //how many pins was struck down in this frame.
        this.strokes = strokes;
        this.nextFrame = nextFrame;
        //figure out what type of bowling frame we are dealing with.
        if (strokes[0] == 10) {
            this.frameStatus = BowlingTermnilogi.Strike;
        }
        else if (strokes[0] + strokes[1] == 10) {
            this.frameStatus = BowlingTermnilogi.Spare;
        }
        else {
            this.frameStatus = BowlingTermnilogi.Normal;
        }
        strokes.forEach(stroke => {
            this.pinCount += stroke;
        });
    }
    /**
     * This function counts how many strikes lay ahead of the current frame.
     */
    numberOfStrikesAhead() {
        //if there's no next frame, there are no strikes ahead.
        if (this.nextFrame == null) {
            return 0;
        }
        //if there is a next frame there may be strikes ahead.
        else {
            //if there is a strike ahead, look further ahead.
            if (this.nextFrame.frameStatus == BowlingTermnilogi.Strike) {
                return 1 + this.nextFrame.numberOfStrikesAhead();
            }
            //if there is no strike in the next frame return 0, 
            else {
                return 0;
            }
        }
    }
    /**
     * Used when calculating frameScore for spare
     */
    getNextFramesFirstPinCount() {
        if (this.nextFrame == null) {
            return 0;
        }
        else {
            return this.nextFrame.strokes[0];
        }
    }
    /**
     * Used when calculating framScore for strike
     */
    getNextFramesPinCount() {
        if (this.nextFrame == null) {
            return 0;
        }
        else {
            return this.nextFrame.pinCount;
        }
    }
    /**
     * Used when calculating framScore for double strike
     */
    getNextNextFramesFirstPinCount() {
        if (this.nextFrame == null) {
            return 0;
        }
        else {
            return this.nextFrame.getNextFramesFirstPinCount();
        }
    }
    calculateFrameScore() {
        let score = 0;
        if (this.frameStatus == BowlingTermnilogi.Strike) {
            let strikesAhead = this.numberOfStrikesAhead();
            if (strikesAhead == 0) {
                score = 10 + this.getNextFramesPinCount();
            }
            else if (strikesAhead == 1) {
                score = 20 + this.getNextNextFramesFirstPinCount();
            }
            else {
                score = 30;
            }
        }
        else if (this.frameStatus == BowlingTermnilogi.Spare) {
            score = 10 + this.getNextFramesFirstPinCount();
        }
        else {
            score = this.pinCount;
        }
        return score;
    }
}
exports.Frame = Frame;
/**
 * This is the FinalFrame class. It models the 10th frame in a round of bowling.
 */
class FinalFrame extends Frame {
    constructor(strokes, nextFrame) {
        super(strokes, nextFrame);
        this.strikesInARow = 0; //keeps a track of how many strikes in a row this last frame has.
        for (var i = 0; i < strokes.length; i++) {
            if (strokes[i] == 10) {
                this.strikesInARow += 1;
            }
            else {
                break;
            }
        }
    }
    /**
     * Number of strikes ahead is slightly different for the last frame, simply return the amount of strikes that are in a row
     * minus one to account for the first strike.
     */
    numberOfStrikesAhead() {
        return this.strikesInARow - 1;
    }
    /**
     * This final pinns frams score is equal to the amount of pins knocked down!
     */
    calculateFrameScore() {
        return this.pinCount;
    }
}
exports.FinalFrame = FinalFrame;
