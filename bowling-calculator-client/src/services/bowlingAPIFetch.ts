export { fetchScoreCard }

import axios from 'axios';

/**
 * This function requests some processing to be made by the server, namely calculating a scorecard.
 * @param rolls An array of integers that represents bowling rolls. Empty entries such as en entry after a strike should be denoted with a 0.
 */
let fetchScoreCard = (historicRolls: number[], newRoll: number) => {
    let config = {
        headers: {
            "Content-Type": "application/json",
            "rolls": JSON.stringify({ data: historicRolls }),
            "roll": newRoll
        }
    };
    return axios.get("http://localhost:5000/bowling-calculator/scoreCard", config);
}