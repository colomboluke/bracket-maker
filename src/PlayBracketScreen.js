import React, {useState} from 'react';
import "./Voting.css";
import UserRow from "./UserRow";
import VotingScreen from "./VotingScreen";

export default function PlayBracketScreen({title, bracket, voters}) {

    const choices = ["Into the Spiderverse", "Cars"]

    return (
        <>
            <h1>Play Bracket</h1>
            <p>This is the Bracket Page</p>
            <button onClick={() => console.log(title, bracket, voters)}>Test</button>

            <div className={"voting-cont"}>
                <div className={"title-cont"}>
                    <span className={"title"}>SELECT VOTES</span>
                </div>

                <VotingScreen voters={voters} choices={choices}/>


            </div>

        </>
    );
}
