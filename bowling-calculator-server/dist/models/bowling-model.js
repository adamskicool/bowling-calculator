"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BowlingTermnilogi;
(function (BowlingTermnilogi) {
    BowlingTermnilogi[BowlingTermnilogi["Strike"] = 0] = "Strike";
    BowlingTermnilogi[BowlingTermnilogi["Spare"] = 1] = "Spare";
    BowlingTermnilogi[BowlingTermnilogi["Normal"] = 2] = "Normal";
})(BowlingTermnilogi || (BowlingTermnilogi = {}));
/**
 * A bowling frame. Each bowling session consists of 10 frames, where each frame consists of either two strokes or
 * one stroke (if the player score as strike on the first stroke), with the exceptoin of the 10th frame that may house
 * three strokes.
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
        console.log("Pins: " + this.pinCount);
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
    getNextNextFramesPinCount() {
        if (this.nextFrame == null) {
            return 0;
        }
        else {
            return this.nextFrame.getNextFramesPinCount();
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
                score = 20 + this.getNextNextFramesPinCount();
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
    toJSON() {
        return {
            strokes: this.strokes,
            frameScore: this.calculateFrameScore()
        };
    }
}
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
    numberOfStrikesAhead() {
        return this.strikesInARow;
    }
    calculateFrameScore() {
        return this.pinCount;
    }
}
/**
 * This function converts a number of bowling rolls to bowling frames
 * @param historicRolls Array of number that represent bowling rolls.
 */
let processRollsToFrames = (historicRolls) => {
    let historicFrames = [];
    for (var i = 0; i < historicRolls.length; i += 2) {
        if (i == 18) {
            console.log("Made it to the last one!");
            let frame = historicRolls.slice(i, i + 3);
            historicFrames.push(frame);
            break;
        }
        let frame = historicRolls.slice(i, i + 2);
        if (frame == []) {
            break;
        }
        else {
            historicFrames.push(frame);
        }
    }
    return historicFrames;
};
let calculateScore = (historicRolls) => {
    let historicFramesProcessed = processRollsToFrames(historicRolls);
    let frames = [];
    //we start at the back of the bowling series, this makes it easier to calculate points, due to the nature of the scoring system in bowling.
    let nextFrame = null;
    for (var i = historicFramesProcessed.length - 1; i >= 0; i--) {
        let currentFrame;
        //if we have all the frames.
        if (i == 9) {
            currentFrame = new FinalFrame(historicFramesProcessed[i], nextFrame);
        }
        else {
            currentFrame = new Frame(historicFramesProcessed[i], nextFrame);
        }
        frames.unshift(currentFrame);
        nextFrame = currentFrame;
    }
    let total = 0;
    frames.forEach(frame => {
        total += frame.calculateFrameScore();
        console.log(total);
    });
    // return total;
    return framesToJSON(frames);
};
exports.calculateScore = calculateScore;
let framesToJSON = (frames) => {
    let array = [];
    frames.forEach(frame => {
        array.push(frame.toJSON());
    });
    return array;
};
