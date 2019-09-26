/**
 * Here resides all the bowling logic. 
 */
import { Frame, FinalFrame } from '../models/frame-model';
import { ScoreCard, ScoreCardEntry, ErrorResponse } from '../models/interfaces';

/**
 * This function adds a new roll to an existing array of rolls. If that roll happens to be a strike
 * in frame 1-9 a roll of zero is also added! An array with the previous rolls and the new roll/rolls is returned.
 * @param historicRolls THe previous rolls
 * @param newRoll The new roll
 */
let addRoll = (historicRolls: number[], newRoll: number): number[] => {
    let addedHistoricRolls = historicRolls;
    //if we knocked down all the pins we need to check if it was a strike in the first 9 frames. 
    //If so also add a 0 to historic calls.
    if (historicRolls.length < 18 && historicRolls.length % 2 == 0 && newRoll == 10) {
        addedHistoricRolls.push(newRoll);
        historicRolls.push(0);
    } else {
        addedHistoricRolls.push(newRoll);
    }
    return addedHistoricRolls;
}


/**
 * This function checks if a given set of rolls is a valid set of bowling rolls. If the set of rolls 
 * are valid true is returned, otherwise false.
 * @param historicRolls Set of rolls.
 */
let validSequenceOfRolls = (historicRolls: number[]): boolean => {
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
        the score the first and second shot isn't combined 10... given that the first shot was not a strike.
        It is also valid unless, given that the first shot was a strike and second shot was not a strike, the second and third shot must be in range (0, 10) or 20
        */
        else if (i == 20) {
            if (historicRolls[i - 2] != 10) {
                if (historicRolls[i - 2] + historicRolls[i - 1] != 10) {
                    return false;
                }
            } else {
                if (historicRolls[i - 1] != 10) {
                    if (historicRolls[i] + historicRolls[i - 1] > 10 && historicRolls[i] + historicRolls[i - 1] != 20) {
                        return false
                    }
                }
            }
        }
    }
    return true;
}


/**
 * This function converts a set of rolls to a scorecard (See ScoreCard interface for details).
 * @param rolls Set of rolls.
 */
let getScoreCard = (rolls: number[]): ScoreCard | ErrorResponse => {
    let valid = validSequenceOfRolls(rolls);//check if valid set of rolls.
    if (valid) { //if valid, send back the scorecard
        let frames: Frame[] = convertRollsToFrames(rolls); //convert roll array to array of frames (Frame[]).
        let total = calculateScore(rolls); //calculate the total score of the rolls.
        return {
            validRoll: true,
            scoreCard: getScoreCardEntries(frames),
            historicRolls: rolls,
            totalScore: total
        };
    }
    //if invalid, send back an ErrorResponse.
    else {
        return {
            validRoll: false,
            message: "Invalid roll!"
        }
    }
}


/**
 * This function calculates the score of a set of bowling rolls. It uses the Frame and FrameFinal classes to model the 
 * problem.
 * @param rolls Set of bowling rolls.
 */
let calculateScore = (rolls: number[]): number => {
    let frames: Frame[] = convertRollsToFrames(rolls);
    let total: number = 0;
    frames.forEach(frame => {
        total += frame.calculateFrameScore();
        // console.log(total);
    })
    return total;
}

/**
 * This function converts a number of bowling rolls to bowling frames, that is it groups the rolls in 
 * 9 pairs of two and lastly a pair or tripple depending on if the bowler managed to get a spare or a strike 
 * in the 10th frames first two rolls.
 * @param rolls Array of number that represent bowling rolls.
 */
let convertRollsToFrames = (rolls: number[]): Frame[] => {
    //split up the array inte chunks of two, representing earch frame
    //if there is enough roles to begin the 10th frame that chunk uses a bigger chunk of 3.
    let historicFrames: number[][] = [];
    for (var i = 0; i < rolls.length; i += 2) {
        if (i == 18) { //if we reach the last frame.
            let frame = rolls.slice(i, i + 3);
            historicFrames.push(frame);
            break;
        }
        let frame = rolls.slice(i, i + 2);
        if (frame == []) {
            break;
        } else {
            historicFrames.push(frame);
        }
    }

    //Using the historicFrames that we just parsed, traverse the array backwards to feed each new Frame object with a pointer 
    //to the frame ahead of it. Note that we are traversing the list backwards to be able to pass each frame the frame in front of it.
    let frames: Frame[] = [];
    let nextFrame: any = null;
    for (var i = historicFrames.length - 1; i >= 0; i--) {
        let currentFrame: Frame;
        //if we have all the frames.
        if (i == 9) {
            currentFrame = new FinalFrame(historicFrames[i], nextFrame);
        } else {
            currentFrame = new Frame(historicFrames[i], nextFrame);
        }
        frames.unshift(currentFrame);
        nextFrame = currentFrame;
    }
    return frames;
}

/**
 * This function converts a set of Frame to a set of ScoreCardEntry. It does this by traversing the list of frames
 * while keeping track of the accumulated score of the frames.
 * @param frames Set of bowling frames
 */
let getScoreCardEntries = (frames: Frame[]): ScoreCardEntry[] => {
    let array: ScoreCardEntry[] = [];
    let accumulatedScore = 0
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
        })
    })
    return array;
}


export { validSequenceOfRolls, calculateScore, getScoreCard, addRoll };