import "./PlayableBracket.css";
import ClickableMatchup from "./ClickableMatch";
import Matchup from "../Setup/Matchup";

/**
 * Takes in the data from one round and renders it, then recursively renders the next round.
 * The right side of the setup screen, giving a preview of what the bracket will look like.
 * @param roundData
 * @returns {JSX.Element|null}
 */

export default function PlayableBracket({bracket, onClick}) {

    function renderRound(roundData) {
        if (roundData == null || roundData.matches.length === 0) {
            return null;
        } else {
            // Round number, where 0 is first round, n is the nth round
            let roundNum = roundData.roundNum;
            return (
                <>
                    <div className={"round"}>
                        {/*if the match has Teams, make it a clickable, otherwise normal*/}
                        {roundData.matches.map((match, index) => {
                            if (match.team1 !== null && match.team2 !== null) {
                                return <ClickableMatchup key={index} team1={match.team1}
                                                         team2={match.team2} className={roundNum}
                                                         matchID={match.id} onClick={onClick} winner={match.winner}/>;
                            } else {
                                return <Matchup key={index} team1={match.team1}
                                                team2={match.team2} className={roundNum}/>;
                            }
                        })}
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