import VoterRow from "./VoterRow";
import React from "react";

export default function VoterAddGrid({voters, updateVoterName, createVoter, removeVoter}) {

    return (
        <div className={"add-cont"}>
            <div className={"add-row voter-add-row"}>
                <div className={"ta-header name"}>Name</div>
                <div className={"ta-header icon"}>Icon</div>
                <div className={"ta-header color"}>Color</div>
                <div className={"ta-header remove"}></div>
            </div>
            {voters.map((voter, index) => (
                <VoterRow key={index} name={voter.name}
                          updateName={updateVoterName}
                          onRemove={() => removeVoter(voter.name)}></VoterRow>
            ))}
            <div className={"buttons-cont"}>
                <button className={"blue-button add-voter-btn"}
                        onClick={() => createVoter()}>Add Voter
                </button>
            </div>
        </div>
    )
}