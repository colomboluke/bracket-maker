import React, {useEffect, useRef, useState} from "react";
import UserRow from "./UserRow";
import "./Voting.css";

// TODO: make this less coupled with App/CreateBracketAlgo
// TODO: handle users clicking on a future round match that has no teams yet
export default function VotingScreen({match, voters, votedStates, setVotedStates, updateVotes, onWinnerChange, onClose}) {
    console.log("Matchup: ", match, votedStates)

    // Using useRef instead of State
    const [winner, setWinner] = useState(null);

    // Update the winner when the votes change
    // TODO: right now, when you choose a winner in one match then switch to the next, it gets an error because there's a null winner
    useEffect(() => {
        // console.log("Votes changed, updating winner", votedStates)
        const newWinner = getWinner();
        console.log("New winner: ", newWinner, "Old winner: ", winner, newWinner === winner);
        if (newWinner !== winner) {
            setWinner(newWinner);
            let winnerIDArg;
            // Update winner to be 0 if team 1 wins, 1 if team2 wins
            if (newWinner.id === match.team1.id) {
                winnerIDArg = 0;
            } else if (newWinner.id === match.team2.id) {
                winnerIDArg = 1;
            } else {
                throw new Error(`Winner ID ${newWinner.id} does not match either team1 (${match.team1.id}) or team2 (${match.team2.id})`)
            }
            onWinnerChange(match.id, winnerIDArg); //tell parent to update bracket
        }

        // Returns the Team that the majority of users have voted for
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
                    return match.team1;
                } else if (votesMap.get(2) > votesMap.get(1)) { //second option wins
                    return match.team2;
                }
            }
            // Either not everyone voted, or there's a tie
            return null;
        }
    }, [votedStates, winner, onWinnerChange, match.id, match.team1, match.team2]);

    // Whether all users have voted
    const allSelected = votedStates.every(item => item !== 0);
    let choiceOne = match.team1.name;
    let choiceTwo = match.team2.name;

    // Handle a user voting for one team in a match
    // TODO: right now this is creating a new votesArray and counting all past votes every time
    //  there's a new vote. To make it faster, it should only count new votes
    function handleVote(voterIdx, vote) {
        // console.log(`User ${voterIdx} voted for ${vote}`)
        // Backend
        let newVoteArray = [0,0];
        for (let i = 0; i < votedStates.length; i++) {
            if (votedStates[i] === 1) { // a vote for team 1
                newVoteArray[0] += 1;
            } else if (votedStates[i] === 2) { // a vote for team 2
                newVoteArray[1] += 1;
            }
        }
        updateVotes(match.id, newVoteArray)
        // Frontend
        const newStates = [...votedStates];
        newStates[voterIdx] = vote;
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

    function getWinnerString() {
        if (winner === null) {
            return "";
        } else {
            return winner.name;
        }
    }

    return (
        <div className={"voting-cont"}>
            <div className={"title-cont"}>
                <span className={"title"}>SELECT VOTES</span>
                <button onClick={onClose} className={"close-btn"}>X</button>
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
                <span className={"winner-text"}>WINNER: {getWinnerString()}</span>
                <button className={`next-matchup-button ${nextBtnActive}`} disabled={!allSelected}
                        onClick={onClose}>NEXT
                </button>
            </div>

        </div>

    )
}