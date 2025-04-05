import Matchup from "./Matchup";

/**
 * Takes in the data from one round and renders it, then recursively renders the next round.
 * The right side of the setup screen, giving a preview of what the bracket will look like.
 * @param roundData
 * @returns {JSX.Element|null}
 */

export default function BracketPreview({bracket}) {

    function renderRound(roundData) {
        if (roundData == null || roundData.matches.length === 0) {
            return null;
        } else {
            // Round number, where 0 is first round, n is the nth round
            let roundNum = roundData.roundNum;
            return (
                <>
                    <div className={"round"}>
                        {/*Generate actual matches*/}
                        {roundData.matches.map((match, index) => (
                            <Matchup key={index} team1={match.team1}
                                     team2={match.team2} className={roundNum}></Matchup>))}
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