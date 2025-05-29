import TeamRow from "./TeamRow";
import {FaShuffle} from "react-icons/fa6";
import React from "react";
import "./TeamOrVoterAddGrid.css";

export default function TeamAddGrid({
                                        teams,
                                        updateTeamName,
                                        shuffleTeams,
                                        createTeam, resetTeams, removeTeam, setTeamImage
                                    }) {

    return (
        <div className={"add-cont"}>
            <div className={"add-row team-add-row"}>
                <div className={"ta-header seed"}>Seed</div>
                <div className={"ta-header name"}>Name</div>
                <div className={"ta-header icon"}>Icon</div>
                <div className={"ta-header remove"}></div>
            </div>
            {teams.map((team, index) => (
                <TeamRow key={index} index={index} name={team.name}
                         updateName={updateTeamName}
                         onRemove={() => removeTeam(index)} setTeamImage={setTeamImage}
                         teamImage={team.image}></TeamRow>
            ))}
            <div className={"buttons-cont"}>
                {teams.length > 0 && (<button className={"blue-button shuffle-btn"}
                                              onClick={() => shuffleTeams()}>
                    <FaShuffle className={"shuffle-icon"}/>
                </button>)}
                <button className={"blue-button add-team-btn"}
                        onClick={() => createTeam()}>Add
                    Contender
                </button>
                {teams.length > 0 && <button className={"blue-button reset-teams-btn"}
                                             onClick={() => resetTeams()}>Reset</button>}

            </div>
        </div>
    )
}