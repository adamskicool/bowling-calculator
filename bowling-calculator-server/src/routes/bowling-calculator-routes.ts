import express from 'express';
let router = express.Router();

// define the home page route
router.get('/', (req: express.Request, res: express.Response) => {
    res.send('Bolwing API entry point!')
})


import { getScoreCard, addRoll } from '../services/bowling-logic';
import { ScoreCard, ErrorResponse } from '../models/interfaces'

/**
 * 
 */
router.get('/scoreCard', (req: express.Request, res: express.Response) => {
    //get the history of allready completed rolls
    let rolls: any = req.headers.rolls;
    let historicRolls: any = JSON.parse(rolls);
    //get the new roll.
    let roll: any = req.headers.roll
    let newRoll: any = parseInt(roll);
    //add the new roll
    let addedNewRoll: number[] = addRoll(historicRolls.data, newRoll);

    let response: ScoreCard | ErrorResponse = getScoreCard(addedNewRoll);
    res.json(response);
})

module.exports = router