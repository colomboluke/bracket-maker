import React, {useState} from 'react';
import PlayableBracket from "./PlayableBracket";
import VotingScreen from "../Voting/VotingScreen";

export default function PlayPage({title, bracket, voters, onVote, getVoteCounts}) {
    // Track the currently selected match using its ID
    const [selectedMatchID, setSelectedMatchID] = useState(null);
    let selectedMatch = bracket.getMatch(selectedMatchID);

    function handleMatchClick(matchID) {
        setSelectedMatchID(matchID);
    }

    let newTitle = 'Untitled Bracket';
    if (title !== undefined && title !== null && title !== "") {
        newTitle = title;
    }

    return (
        <div className={"play-bracket-cont"}>

            {selectedMatchID !== null && (<div className={"overlay"}></div>)}
            <h1>{newTitle}</h1>
            {/*<input type="color" value={"pick color"}/>*/}
            <button onClick={() => console.log(bracket, voters)}>Log bracket</button>
            <PlayableBracket bracket={bracket} onClick={handleMatchClick} getVoteCounts={getVoteCounts}/>
            {selectedMatch !== null && <VotingScreen voters={voters} match={selectedMatch}
                                                     onVote={onVote}
                                                     onClose={() => setSelectedMatchID(null)}
            />}

        </div>

    );
}
