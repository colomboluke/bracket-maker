import React, {useState} from 'react';
import "./Voting.css";
import UserRow from "./UserRow";
import VotingGrid from "./VotingGrid";

export default function PlayBracketScreen() {

    const voters = ["Luke", "Jake", "Zach", "Ivan", "Aidan"]

    return (
        <>
            {/*<h1>Play Bracket</h1>*/}
            {/*<p>This is the Bracket Page</p>*/}

            <div className={"voting-cont"}>
                <div className={"title-cont"}>
                    <span className={"title"}>SELECT VOTES</span>
                </div>

                <VotingGrid voters={voters}/>

                <div className={"voting-footer"}>
                    <button className={"next-matchup-button"}>NEXT MATCHUP</button>
                </div>
            </div>

        </>
    );
}
