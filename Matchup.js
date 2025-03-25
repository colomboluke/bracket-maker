import React from "react";

// A single matchup of two teams in the bracket
// Hidden flag = this is a dummy matchup, hide it
export default function Matchup({team1, team2, hiddenFlag}) {
    //Gets the property of the object unless object is null, in which case it returns null
    function safeGet(object, property) {
        if (object !== null) {
            if (property === "id") {
                return object[property] + 1 + ".";
            }
            return object[property];
        }
        return "";
    }

    // return (
    //     <div className={"match"}>
    //         <div className={"match-top"}>
    //             <div className={"match-seed"}>{safeGet(team1, "id")}</div>
    //             <div className={"match-team"}>{safeGet(team1, "name")}</div>
    //             <div className={"match-score"}>{safeGet(team1, "votes")}</div>
    //         </div>
    //         <div className={"match-bottom"}>
    //             <div className={"match-seed"}>{safeGet(team2, "id")}</div>
    //             <div className={"match-team"}>{safeGet(team2, "name")}</div>
    //             <div className={"match-score"}>{safeGet(team2, "votes")}</div>
    //         </div>
    //     </div>
    // )
    if (hiddenFlag) {
        return (
            <>
                <li className={"hidden spacer"}>&nbsp;</li>

                <li className={"hidden game game-top"}>
                    <span className={"hidden team-seed"}>{safeGet(team1, "id")}</span>
                    <span className={"hidden team-name"}>{safeGet(team1, "name")}</span>
                    <span className={"hidden team-votes"}>{safeGet(team1, "votes")}</span>
                </li>
                <li className={"hidden game game-spacer"}>&nbsp;</li>
                <li className={"hidden game game-bottom"}>
                    <span className={"hidden team-seed"}>{safeGet(team2, "id")}</span>
                    <span className={"hidden team-name"}>{safeGet(team2, "name")}</span>
                    <span className={"hidden team-votes"}>{safeGet(team2, "votes")}</span>
                </li>
                <li className={"hidden spacer"}>&nbsp;</li>
            </>
        )
    }
    return (
        <>
            <li className={"spacer"}>&nbsp;</li>

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
            <li className={"spacer"}>&nbsp;</li>
        </>
    )
}