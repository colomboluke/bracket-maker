import React, {useEffect, useState} from 'react';
import PlayableBracket from "./PlayableBracket";
import VotingScreen from "../Voting/VotingScreen";
import {getMatch} from "../BracketAlgos";

export default function PlayBracketPage({title, bracket, voters, updateVotes, updateWinner}) {
    // Track the currently selected match using its ID
    const [selectedMatchID, setSelectedMatchID] = useState(null);
    // Tracks which users have voted
    const [votedStates, setVotedStates] = useState(Array(voters.length).fill(0));
    // When selectedMatchID changes, reset the votes (use has chosen a new match to vote on)
    useEffect(() => {
        setVotedStates(Array(voters.length).fill(0));
    }, [selectedMatchID, voters.length])
    let selectedMatch = getMatch(bracket, selectedMatchID);

    let newTitle = 'Untitled Bracket';
    if (title !== undefined && title !== null && title !== "") {
        newTitle = title;
    }

    function handleMatchClick(matchID) {
        setSelectedMatchID(matchID);
    }

    // // Adjusts the vote by given value for given team in a given match
    // function incrementVote(matchID, team, value) {
    //     if (value !== 1 && value !== -1) {
    //         throw new Error("Can only increment votes by 1 or -1")
    //     }
    //     let match = getMatch(bracket, matchID);
    //     if (team === 1) {
    //         match.team1.votes += value;
    //     } else if (team === 2) {
    //         match.team2.votes += value;
    //     } else {
    //         throw new Error("Team value must be either 1 or 2")
    //     }
    // }

    let votingScreen;
    selectedMatch === null ? votingScreen = <></> : votingScreen =
        <VotingScreen key={selectedMatchID} voters={voters} match={selectedMatch}
                      votedStates={votedStates} setVotedStates={setVotedStates}
                      updateVotes={updateVotes} onWinnerChange={updateWinner}
                      onClose={() => setSelectedMatchID(null)}/>

    return (
        <div className={"play-bracket-cont"}>

            {selectedMatchID !== null && (<div className={"overlay"}></div>)}
            <h1>{newTitle}</h1>
            <button onClick={() => console.log(bracket, voters)}>Log bracket</button>
            <button onClick={() => console.log(getMatch(bracket, 2))}>Test find match</button>
            <button onClick={() => updateVotes(2, [1, 0])}>Test update votes</button>
            <PlayableBracket bracket={bracket} onClick={handleMatchClick}/>
            {votingScreen}

        </div>

    );
}
