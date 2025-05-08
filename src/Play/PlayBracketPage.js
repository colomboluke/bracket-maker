import React, {useEffect, useState} from 'react';
import PlayableBracket from "./PlayableBracket";
import VotingScreen from "../Voting/VotingScreen";
import {getMatch, setMatch} from "../CreateBracketAlgo";

export default function PlayBracketPage({title, bracket, voters}) {

    // TODO: track the currently selected match (using its ID)
    const [selectedMatchID, setSelectedMatchID] = useState(null);
    let selectedMatch = getMatch(bracket, selectedMatchID);
    const choices = ["Into the Spiderverse", "Cars"];

    let newTitle = 'Untitled Bracket';
    if (title !== undefined && title !== null) {
        newTitle = title;
    }

    function handleMatchClick(matchID) {
        setSelectedMatchID(matchID);
        console.log(matchID + " clicked");
    }

    // TODO: figure out how to count a vote on the backend
    setMatch({...bracket}, 0, {
        id: 0, winner: null,
        team1: {id: 0, name: "Team 1", votes: 1}, team2: {id: 0, name: "Team 1", votes: 1},
        nextMatchID: 4
    });

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
        <VotingScreen voters={voters} match={[selectedMatch.team1, selectedMatch.team2]}
                      incrementVote={incrementVote}/>

    return (
        <div className={"play-bracket-cont"}>
            <h1>{title}</h1>
            <button onClick={() => console.log(bracket, voters)}>Log bracket</button>
            <button onClick={() => console.log(test)}>Set new match</button>
            <PlayableBracket bracket={bracket} onClick={handleMatchClick}/>
            {/*TODO: access a match of the bracket using the matchID*/}
            {votingScreen}
        </div>
    );
}
