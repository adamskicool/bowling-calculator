export { ScoreCardEntry, ErrorResponse, ValidResponse }

/**
 * Represents how a scorecard entry should look like.
 */
interface ScoreCardEntry {
    frameNumber: number,
    strokes: number[],
    frameScore: number,
    accumulatedScore: number
}

/**
 * Describes what the server response should look like when processeing of the recieved
 * bowling data was successful.
 */
interface ValidResponse {
    validRoll: boolean,
    scoreCard: ScoreCardEntry[],
    historicRolls: number[],
    totalScore: number
}

/**
 * Describes what the server response should look like when processing of the recieved 
 * bowling data failed.
 */
interface ErrorResponse {
    validRoll: boolean,
    message: string
}