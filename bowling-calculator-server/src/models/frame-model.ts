export { BowlingTermnilogi, Frame, FinalFrame };
import { ScoreCard } from './interfaces';

enum BowlingTermnilogi {
    Strike,
    Spare,
    Normal
}

/**
 * A bowling frame. Each bowling session consists of 10 frames, where each frame consists of either two strokes or
 * one stroke (if the player score a strike on the first stroke), with the exceptoin of the 10th frame that may contain
 * three strokes. This Frame class is meant to model the 9 first frames, the last frame is modelled by the class FinalFrame, 
 * which inherits from this class.
 */
class Frame {
    strokes: number[]; //the strokes for this frame
    pinCount: number = 0; //how many pins was struck down in this frame.
    frameStatus: BowlingTermnilogi; //describes if it was a strike, spare or normal frame.
    nextFrame: any; //pointer to the frame ahead of this one, if last frame --> nextFrame is null.

    /**
     * 
     * @param strokes The bowling strokes associated with this frame
     * @param nextFrame Pointer to the frame ahead of this frame, if such frame exists, otherwise null
     */
    constructor(strokes: number[], nextFrame: any) {
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
        })
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
        } else {
            return this.nextFrame.strokes[0];
        }
    }

    /**
     * Used when calculating framScore for strike
     */
    getNextFramesPinCount() {
        if (this.nextFrame == null) {
            return 0;
        } else {
            return this.nextFrame.pinCount;
        }
    }

    /**
     * Used when calculating framScore for double strike
     */
    getNextNextFramesFirstPinCount() {
        if (this.nextFrame == null) {
            return 0;
        } else {
            return this.nextFrame.getNextFramesFirstPinCount();
        }
    }

    calculateFrameScore() {
        let score: number = 0;
        if (this.frameStatus == BowlingTermnilogi.Strike) {
            let strikesAhead = this.numberOfStrikesAhead();
            if (strikesAhead == 0) {
                score = 10 + this.getNextFramesPinCount();
            } else if (strikesAhead == 1) {
                score = 20 + this.getNextNextFramesFirstPinCount();
            } else {
                score = 30;
            }
        } else if (this.frameStatus == BowlingTermnilogi.Spare) {
            score = 10 + this.getNextFramesFirstPinCount();
        } else {
            score = this.pinCount;
        }
        return score;
    }
}

/**
 * This is the FinalFrame class. It models the 10th frame in a round of bowling.
 */
class FinalFrame extends Frame {
    strikesInARow: number = 0; //keeps a track of how many strikes in a row this last frame has.

    constructor(strokes: number[], nextFrame: any) {
        super(strokes, nextFrame);

        for (var i = 0; i < strokes.length; i++) {
            if (strokes[i] == 10) {
                this.strikesInARow += 1;
            } else {
                break;
            }
        }
    }

    numberOfStrikesAhead() {
        return this.strikesInARow - 1;
    }

    calculateFrameScore() {
        return this.pinCount;
    }
}