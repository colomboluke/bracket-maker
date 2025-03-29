import Matchup from "./Matchup";
import HiddenMatchup from "./HiddenMatchup";

//The right side of the set up screen, giving a preview of what the bracket will look like
export default function BracketPreview({bracket}) {
    /**
     * Takes in the data from one round and renders it, then recursively renders the next round
     * @param roundData
     * @returns {JSX.Element|null}
     */

    let numRounds = 0;

    function countNumRounds(bracket) {
        numRounds += 1;
        if (bracket.nextRound !== null && bracket.nextRound !== undefined) {
            countNumRounds(bracket.nextRound);
        }
    }

    countNumRounds(bracket);
    let idealNumOfMatches = numRounds;

    function renderRound(roundData) {
        if (roundData == null || roundData.matches.length === 0) {
            return null;
        } else {
            // console.log(roundData.matches)
            // Round number, where 0 is first round, n is the nth round
            let roundNum = roundData.roundNum;
            // 2^(number of teams in this round)
            let idealNumOfMatches = (Math.pow(2, numRounds - roundNum) / 2);
            let dummyArray = [];
            // Fill it with unique numbers to give each HiddenMatchup a unique key
            for (let i = 0; i < idealNumOfMatches - roundData.matches.length; i++) {
                dummyArray.push(i);
            }
            // TODO: generate matches to make up for this discrepancy but just hide them in CSS
            return (
                <>
                    <div className={"round"}>
                        {/*Generate actual matches*/}
                        {roundData.matches.map((match, index) => (
                            <Matchup key={index} team1={match.team1}
                                     team2={match.team2} className={roundNum}></Matchup>))}
                        {/* Generate dummy matches for proper spacing*/}
                        {dummyArray.map((index) => (<HiddenMatchup key={index}/>))}
                    </div>
                    {renderRound(roundData.nextRound, roundNum + 1)}
                </>
            )
        }
    }

    return (
        <div className={"tournament"}>
            {renderRound(bracket)}
        </div>

    )
}