"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_model_1 = require("../models/frame-model");
let addRoll = (historicRolls, newRoll) => {
    let addedHistoricRolls = historicRolls;
    //if we knocked down all the pins we need to check if it was a strike in the first 9 frames. 
    //If so also add a 0 to historic calls.
    if (historicRolls.length < 18 && historicRolls.length % 2 == 0 && newRoll == 10) {
        addedHistoricRolls.push(newRoll);
        historicRolls.push(0);
    }
    else {
        addedHistoricRolls.push(newRoll);
    }
    return addedHistoricRolls;
};
exports.addRoll = addRoll;
let validSequenceOfRolls = (historicRolls) => {
    //if there are to many roll, its is unvalid
    if (historicRolls.length > 21) {
        return false;
    }
    //for each roll, check that it is valid.
    for (var i = 0; i < historicRolls.length; i++) {
        //all rolls has to be in range (0, 10)
        if (historicRolls[i] < 0 || historicRolls[i] > 10) {
            return false;
        }
        //if the roll is in frame 1-9
        if (i < 18) {
            //if it is the second roll, adding the rolls can not be more than 10
            if (i % 2 == 1 && historicRolls[i] + historicRolls[i - 1] > 10) {
                return false;
            }
        }
        /*
        if we are in the second shot of the last frame, it is valid unless
        the score of the first and second shot combined is above 10... given that the first shot was not a strike.
        */
        else if (i == 19) {
            if (historicRolls[i - 1] != 10) {
                if (historicRolls[i] + historicRolls[i - 1] > 10) {
                    return false;
                }
            }
        }
        /*
        If we are in the third shot of the last frame, it is valid unless
        the score the first and second shot isn't combined 10 or 20... given that the first shot was not a strike.
        */
        else if (i == 20) {
            if (historicRolls[i - 2] != 10) {
                if (historicRolls[i - 2] + historicRolls[i - 1] != 10 && historicRolls[i - 2] + historicRolls[i - 1] != 20) {
                    return false;
                }
            }
        }
    }
    return true;
};
exports.validSequenceOfRolls = validSequenceOfRolls;
/**
 * This function calculates the score of a bowling scorecard.
 * @param rolls
 */
let calculateScore = (rolls) => {
    let frames = convertRollsToFrames(rolls);
    let total = 0;
    frames.forEach(frame => {
        total += frame.calculateFrameScore();
        // console.log(total);
    });
    return total;
    // return framesToJSON(frames);
};
exports.calculateScore = calculateScore;
let getScoreCard = (rolls) => {
    let frames = convertRollsToFrames(rolls);
    return {
        scoreCard: framesToJSON(frames),
        historicRolls: rolls
    };
};
exports.getScoreCard = getScoreCard;
/**
 * This function converts a number of bowling rolls to bowling frames, that is it groups the rolls in
 * 9 pairs of two and lastly a pair or tripple depending on if the bowler managed to get a spare or a strike
 * in the 10th frames first two rolls.
 * @param rolls Array of number that represent bowling rolls.
 */
let convertRollsToFrames = (rolls) => {
    //split up the array inte chunks of two, representing earch frame
    //if there is enough roles to begin the 10th frame that chunk uses a bigger chunk of 3.
    let historicFrames = [];
    for (var i = 0; i < rolls.length; i += 2) {
        if (i == 18) { //if we reach the last frame.
            let frame = rolls.slice(i, i + 3);
            historicFrames.push(frame);
            break;
        }
        let frame = rolls.slice(i, i + 2);
        if (frame == []) {
            break;
        }
        else {
            historicFrames.push(frame);
        }
    }
    //Using the historicFrames that we just parsed, traverse the array backwards to feed each new Frame object with a pointer 
    //to the frame ahead of it.
    let frames = [];
    let nextFrame = null;
    for (var i = historicFrames.length - 1; i >= 0; i--) {
        let currentFrame;
        //if we have all the frames.
        if (i == 9) {
            currentFrame = new frame_model_1.FinalFrame(historicFrames[i], nextFrame);
        }
        else {
            currentFrame = new frame_model_1.Frame(historicFrames[i], nextFrame);
        }
        frames.unshift(currentFrame);
        nextFrame = currentFrame;
    }
    return frames;
};
let framesToJSON = (frames) => {
    let array = [];
    let accumulatedScore = 0;
    let frameNumber = 0;
    frames.forEach(frame => {
        frameNumber++;
        let frameScore = frame.calculateFrameScore();
        accumulatedScore += frameScore;
        let strokes = frame.strokes;
        array.push({
            "frameNumber": frameNumber,
            "strokes": strokes,
            "frameScore": frameScore,
            "accumulatedScore": accumulatedScore
        });
    });
    return array;
};
