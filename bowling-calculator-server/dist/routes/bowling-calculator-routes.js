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
const bowling_logic_1 = require("../services/bowling-logic");
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
    let addedNewRoll = bowling_logic_1.addRoll(historicRolls.data, newRoll);
    let response = bowling_logic_1.getScoreCard(addedNewRoll);
    res.json(response);
});
module.exports = router;
