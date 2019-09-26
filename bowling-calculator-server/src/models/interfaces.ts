export { ScoreCardEntry, ErrorResponse, ScoreCard }

interface ScoreCardEntry {
    frameNumber: number,
    strokes: number[],
    frameScore: number,
    accumulatedScore: number
}


interface ScoreCard {
    validRoll: boolean,
    scoreCard: ScoreCardEntry[],
    historicRolls: number[],
    totalScore: number
}


interface ErrorResponse {
    validRoll: boolean,
    message: string
}