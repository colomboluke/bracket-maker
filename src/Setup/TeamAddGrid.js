import TeamRow from "./TeamRow";
import {FaShuffle} from "react-icons/fa6";
import React from "react";

export default function TeamAddGrid({teams, updateTeamName, changeNumTeams, shuffleTeams, createTeam}) {

    return (
        <div className={"team-add-grid"}>
            <div className={"ta-header seed"}>Seed</div>
            <div className={"ta-header name"}>Name</div>
            <div className={"ta-header icon"}>Icon</div>
            <div className={"ta-header color"}>Color</div>
            <div className={"ta-header remove"}></div>
            {teams.map((team, index) => (
                <TeamRow key={index} index={index} name={team.name}
                         updateName={updateTeamName}
                         onRemove={() => changeNumTeams(teams.length - 1)}></TeamRow>
            ))}
            {teams.length > 0 ? (<button className={"blue-button shuffle-btn"}
                                         onClick={() => shuffleTeams()}>
                <FaShuffle className={"shuffle-icon"}/>
            </button>) : (<></>)}
            <button className={"blue-button add-team-btn"}
                    onClick={() => createTeam()}>Add
                Team
            </button>
        </div>
    )
}