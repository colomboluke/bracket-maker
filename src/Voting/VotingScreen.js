import React, {useState} from "react";
import UserRow from "./UserRow";
import "./Voting.css";

export default function VotingScreen({voters, match, incrementVote}) {
    console.log("Matchup: ", match)
    // Tracks which users have voted
    const [votedStates, setVotedStates] = useState(Array(voters.length).fill(0));
    // Whether all users have voted
    const allSelected = votedStates.every(item => item !== 0);
    let choiceOne = match.team1.name;
    let choiceTwo = match.team2.name;

    // TODO: mutate the match by making it state
    const [match, setMatch] = useState(match);
    // Check off that a user has voted
    // Vote of 1 --> vote for team 1
    // Vote of 2 --> vote for team 2
    function handleVote(index, vote) {
        // Backend
        // Create a nextMatchVotes array
        // if vote == 1: match.votes[0] += 1, match.votes[1] -= 1
        // else: opposite
        // incrementVote(nextMatchVotes)
        // Frontend
        const newStates = [...votedStates];
        newStates[index] = vote;
        setVotedStates(newStates);
    }

    const title = <div className={"voter-row"}>
        <div className={"voter-col"}>
            <div className={"option-title"}>{choiceOne}</div>
            <div className={"option-icon"}></div>
        </div>
        <div className={"voter-col"}>
            <span className={"vs"}>VS.</span>
        </div>
        <div className={"voter-col"}>
            <div className={"option-title"}>{choiceTwo}</div>
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
        let votesMap = new Map([[1, 0], [2, 0]]);
        // Count votes
        for (const vote of votedStates) {
            votesMap.set(vote, votesMap.get(vote) + 1);
        }
        // Only return a string if everyone voted
        if (votedStates.every(item => item !== 0)) {
            if (votesMap.get(1) > votesMap.get(2)) { //first option wins
                return choiceOne;
            } else if (votesMap.get(2) > votesMap.get(1)) { //second option wins
                return choiceTwo;
            }
        }
        // Either not everyone voted, or there's a tie
        return "";
    }

    return (
        <div className={"voting-cont"}>
            <div className={"title-cont"}>
                <span className={"title"}>SELECT VOTES</span>
            </div>
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
                        onClick={() => console.log(getWinner())}>NEXT
                </button>
            </div>

        </div>

    )
}