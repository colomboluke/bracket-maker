import "./PlayableBracket.css";
import ClickableMatchup from "./ClickableMatch";
import Matchup from "../PreviewBracket/Matchup";
import WinnerStub from "./WinnerStub";

/**
 * Takes in the data from one round and renders it, then recursively renders the next round.
 * The right side of the setup screen, giving a preview of what the bracket will look like.
 * @param roundData
 * @returns {JSX.Element|null}
 */

export default function PlayableBracket({bracket, onClick, getVoteCounts}) {

    // The final winner of the bracket
    let ultimateWinner;

    // Renders the bracket recursively, turning each Match into either a Matchup or
    //  ClickableMatchup component
    function renderRound(roundData) {
        if (roundData == null) { //end of bracket, display the winner
            return (
                <WinnerStub teamName={ultimateWinner ? ultimateWinner.name : ""}/>
            )
        } else {
            // TODO: I don't think curRound is necessary anymore
            let curRound = roundData.roundID;
            return (
                <>
                    <div className={"round"}>
                        {/*if the match has Teams, make it clickable, otherwise normal*/}
                        {roundData.matches.map((match, index) => {
                            if (match.team1 !== null && match.team2 !== null) {
                                //if this is final match, update the ultimate winner
                                getUltimateWinner(roundData, match);
                                return <ClickableMatchup key={index} team1={match.team1}
                                                         team2={match.team2} className={curRound}
                                                         matchID={match.id} onClick={onClick}
                                                         winner={match.winner} votesTally={getVoteCounts(match.votes)}/>;
                            } else {
                                return <Matchup key={index} team1={match.team1}
                                                team2={match.team2} className={curRound}/>;
                            }
                        })}
                    </div>
                    {renderRound(roundData.nextRound, curRound + 1)}
                </>
            )
        }
    }

    function getUltimateWinner(roundData, match) {
        if (!roundData.nextRound) {
            if (match.winner === 1) {
                ultimateWinner = match.team1;
            } else if (match.winner === 2) {
                ultimateWinner = match.team2;
            }
        }
    }

    return (
        <div className={"tournament"}>
            {renderRound(bracket)}
        </div>

    )
}