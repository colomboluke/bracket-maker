import React from "react";

// A single matchup of two teams in the bracket
// Hidden flag = this is a dummy matchup, hide it
export default function Matchup({team1, team2}) {
    //Gets the property of the object unless object is null, in which case it returns null
    // Also formats the seed to add a period at the end
    function safeGet(object, property) {
        if (object !== null && object !== undefined) {
            if (property === "id") {
                return object[property] + 1 + ".";
            }
            return object[property];
        }
        return "";
    }

    return (
        <>
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
        </>
    )
}