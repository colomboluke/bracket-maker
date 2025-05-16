import React from "react";
import {matchupSafeGet} from "../Utils";
import "./PlayableMatchup.css";

// Displays a single matchup of two teams in the bracket
export default function ClickableMatchup({team1, team2, matchID, onClick, winner, votesTally}) {

    console.log(matchID, votesTally, winner);
    function getVotesString() {
        return `${votesTally.team1} - ${votesTally.team2}`;
    }

    // Style the text differently based on which team is the winner
    const topStyle = winner === 1 ? "team-winner" : ""
    const bottomStyle = winner === 2 ? "team-winner" : ""

    return (
        <div className={"matchup"} onClick={() => onClick(matchID)}>
            <li className={"spacer top"}>&nbsp;</li>

            <li className={`game game-top ${topStyle}`}>
                <span className={"team-seed"}>{matchupSafeGet(team1, "id")}</span>
                <span className={"team-name"}>{matchupSafeGet(team1, "name")}</span>
                <span className={"team-votes"}>{matchupSafeGet(team1, "votes")}</span>
            </li>
            {winner !== null && <span className={"votes-tally"}>{getVotesString()}</span>}
            <li className={"game game-spacer"}>&nbsp;</li>

            <li className={`game game-bottom ${bottomStyle}`}>
                <span className={"team-seed"}>{matchupSafeGet(team2, "id")}</span>
                <span className={"team-name"}>{matchupSafeGet(team2, "name")}</span>
                <span className={"team-votes"}>{matchupSafeGet(team2, "votes")}</span>
            </li>

            <li className={"spacer bottom"}>&nbsp;</li>
        </div>
    )

}