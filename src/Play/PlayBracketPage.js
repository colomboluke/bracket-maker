import React, {useState} from 'react';
import VotingScreen from "../Voting/VotingScreen";

export default function PlayBracketPage({title, bracket, voters}) {

    const choices = ["Into the Spiderverse", "Cars"];

    let newTitle = 'Untitled Bracket';
    if (title !== undefined && title !== null) {
        newTitle = title;
    }
    return (
        <>
            <h1>Play Bracket</h1>
            <p>This is the Bracket Page</p>
            <button onClick={() => console.log(newTitle, bracket, voters)}>Test</button>

            <VotingScreen voters={voters} choices={choices}/>


        </>
    );
}
