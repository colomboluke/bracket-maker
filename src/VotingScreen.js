import React, {useState} from "react";
import UserRow from "./UserRow";

export default function VotingScreen({voters, choices}) {

    // Tracks which users have voted
    const [votedStates, setVotedStates] = useState(Array(voters.length).fill(0));
    // Whether all users have voted
    const allSelected = votedStates.every(item => item !== 0);

    // Check off that a user has voted
    function handleVote(index, vote) {
        const newStates = [...votedStates];
        newStates[index] = vote;
        setVotedStates(newStates);
    }

    const title = <div className={"voter-row"}>
        <div className={"voter-col"}>
            <div className={"option-title"}>{choices[0]}</div>
            <div className={"option-icon"}></div>
        </div>
        <div className={"voter-col"}>
            <span className={"vs"}>VS.</span>
        </div>
        <div className={"voter-col"}>
            <div className={"option-title"}>{choices[1]}</div>
            <div className={"option-icon"}></div>
        </div>
    </div>

    let nextBtnActive = "";
    if (allSelected) {
        nextBtnActive = "active";
    }

    // Returns the choice that the majority of users have voted for
    // If not everyone has voted, return nothing
    function getWinner() {
        console.log(votedStates)
        let votesMap = new Map([[1, 0], [2, 0]]);
        // Count votes
        for (const vote of votedStates) {
            votesMap.set(vote, votesMap.get(vote) + 1);
        }
        console.log(votesMap);
        // Only return a string if everyone voted
        if (votedStates.every(item => item !== 0)) {
            if (votesMap.get(1) > votesMap.get(2)) { //first option wins
                return choices[0];
            } else if (votesMap.get(2) > votesMap.get(1)) {
                return choices[1];
            } else {
                return "";
            }
        }
        return "";

    }

    return (
        <>
            <div className={"voting-grid"}>
                {title}
                <div className={"voting-spacer"}></div>
                {voters.map((voter, idx) => (
                    // TODO: make the left/right buttons greyed out when everyone has voted
                    <UserRow key={idx} voterName={voter.name} index={idx} onClick={handleVote}/>
                ))}
            </div>
            <div className={"voting-footer"}>
                <span className={"winner-text"}>WINNER: {getWinner()}</span>
                <button className={`next-matchup-button ${nextBtnActive}`} disabled={!allSelected}
                        onClick={() => console.log(getWinner())}>NEXT</button>
            </div>

        </>

    )
}