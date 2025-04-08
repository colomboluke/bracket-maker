import React, {useState} from 'react';
import "./Voting.css";
import ButtonContainer from "./ButtonContainer";

export default function PlayBracketScreen() {

    return (
        <div >
            <h1>Play Bracket</h1>
            <p>This is the Bracket Page</p>

            <div className={"voting-screen"}>
                <div className={"match-title"}>
                    <h2>Movie 1</h2>
                    <span>VS.</span>
                    <h2>Movie 2</h2>
                </div>
                <div className={"voting-grid"}>
                    <div className={"user-row"}>
                        <span className={"voter-name"}>Jake</span>
                        <ButtonContainer/>
                    </div>
                    <div className={"user-row"}>
                        <span className={"voter-name"}>Luke</span>
                        <ButtonContainer/>
                    </div>
                </div>
            </div>

        </div>
    );
}
