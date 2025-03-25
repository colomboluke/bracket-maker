import React from "react";

// A single matchup of two teams in the bracket
// Hidden flag = this is a dummy matchup, hide it
export default function HiddenMatchup() {

    return (
        <>
            <li className={"spacer"}>&nbsp;</li>

            <li className={"game game-top hidden"}>
                <span className={"team-seed"}>{}</span>
                <span className={"team-name"}>{}</span>
                <span className={"team-votes"}>{}</span>
            </li>
            <li className={"game game-spacer hidden"}>&nbsp;</li>
            <li className={"game game-bottom hidden"}>
                <span className={"team-seed"}>{}</span>
                <span className={"team-name"}>{}</span>
                <span className={"team-votes"}>{}</span>
            </li>
            <li className={"spacer"}>&nbsp;</li>
        </>
    )
}