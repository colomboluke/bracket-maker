import React from "react";
import {safeGet} from "../Utils";

// Displays a single matchup of two teams in the bracket
export default function ClickableMatchup({team1, team2, matchID, onClick}) {

    return (
        <div className={"matchup"} onClick={() => onClick(matchID)}>
            <li className={"spacer top"}>&nbsp;</li>

            <li className={"game game-top"}>
                <span className={"team-seed"}>{safeGet(team1, "id")}</span>
                <span className={"team-name"}>{safeGet(team1, "name")}</span>
                <span className={"team-votes"}>{safeGet(team1, "votes")}</span>
            </li>
            <li className={"game game-spacer"}>&nbsp;</li>
            <li className={"game game-bottom"}>
                <span className={"team-seed"}>{safeGet(team2, "id")}</span>
                <span className={"team-name"}>{safeGet(team2, "name")}</span>
                <span className={"team-votes"}>{safeGet(team2, "votes")}</span>
            </li>
            <li className={"spacer bottom"}>&nbsp;</li>
        </div>
    )

}