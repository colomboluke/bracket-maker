import TeamRow from "./TeamRow";
import {FaShuffle} from "react-icons/fa6";
import React from "react";
import "./TeamOrVoterAddGrid.css";
import DragAndDrop from "../Setup/DragAndDrop";

export default function TeamAddGrid({
                                        teams,
                                        updateTeamName,
                                        shuffleTeams,
                                        createTeam, resetTeams, removeTeam, setTeamImage, handleDragEnd
                                    }) {

    return (
        <DragAndDrop teams={teams} handleDragEnd={handleDragEnd} removeTeam={removeTeam}/>
    )
}