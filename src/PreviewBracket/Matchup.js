import React from "react";
import {matchupSafeGet} from "../Utils.mjs";

// Displays a single matchup of two teams in the bracket
export default function Matchup({team1, team2}) {



    return (
        <div className={"matchup"}>
            <li className={"spacer top"}>&nbsp;</li>

            <li className={"game game-top"}>
                <span className={"team-seed"}>{matchupSafeGet(team1, "id")}</span>
                <span className={"team-name"}>{matchupSafeGet(team1, "name")}</span>
                <span className={"team-votes"}>{matchupSafeGet(team1, "votes")}</span>
            </li>
            <li className={"game game-spacer"}>&nbsp;</li>
            <li className={"game game-bottom"}>
                <span className={"team-seed"}>{matchupSafeGet(team2, "id")}</span>
                <span className={"team-name"}>{matchupSafeGet(team2, "name")}</span>
                <span className={"team-votes"}>{matchupSafeGet(team2, "votes")}</span>
            </li>
            <li className={"spacer bottom"}>&nbsp;</li>
        </div>
    )

}