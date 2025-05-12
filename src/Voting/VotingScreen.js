import React, {useEffect, useState} from "react";
import UserRow from "./UserRow";
import "./Voting.css";

// TODO: make this less coupled with App/CreateBracketAlgo
// TODO: handle users clicking on a future round match that has no teams yet
export default function VotingScreen({match, voters, updateVotes, updateWinner}) {
    // console.log("Matchup: ", match)

    // Tracks which users have voted
    const [votedStates, setVotedStates] = useState(Array(voters.length).fill(0));
    const [winner, setWinner] = useState(null)

    // Update the winner when the votes change
    useEffect(() => {
        console.log("Votes changed, updating winner", votedStates)
        setWinner(getWinner());
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
    }, [match.team1, match.team2, votedStates]);

    // When we get a new winner, call updateWinner
    // TODO: why is this effect running infinitely?
    // useEffect(() => {
    //     if (winner !== null) {
    //         console.log("New winner detected, updating bracket")
    //         updateWinner(match.id, winner.id)
    //     }
    // }, [match.id, updateWinner, winner]);

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
                        onClick={() => console.log(getWinnerString())}>NEXT
                </button>
            </div>

        </div>

    )
}