"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
// define the home page route
router.get('/', (req, res) => {
    res.send('Bolwing API entry point!');
});
const bowling_model_1 = require("../services/bowling-model");
/**
 *
 */
router.get('/scoreCard', (req, res) => {
    //get the history of allready completed rolls
    let rolls = req.headers.rolls;
    let historicRolls = JSON.parse(rolls);
    //get the new roll.
    let roll = req.headers.roll;
    let newRoll = parseInt(roll);
    //add the new roll
    let addedNewRoll = bowling_model_1.addRoll(historicRolls.data, newRoll);
    //check if the rolls are a valid sequence of rolls
    if (bowling_model_1.validSequenceOfRolls(addedNewRoll)) {
        res.json(bowling_model_1.getScoreCard(addedNewRoll));
    }
    else {
        //send some error message that the user entered a faulty sequence
        res.json({ historicRolls: addedNewRoll });
    }
    // res.json(getScoreCard(historicRolls.data));
});
module.exports = router;
