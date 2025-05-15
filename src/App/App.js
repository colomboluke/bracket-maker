import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import constructBracket from "../BracketAlgos/ConstructBracket";
import Header from "../Header/Header";
import HomePage from "../Home/HomePage";
import SetupPage from "../Setup/SetupPage";
import IdeasPage from "../Ideas/IdeasPage";
import PlayBracketPage from "../Play/PlayBracketPage";

/**
 * Top level component
 */
function App() {
    const [title, setTitle] = useState("");
    const [teams, setTeams] = useState([]);
    const [voters, setVoters] = useState([]);

    // constructBracket(): takes teams array and turns it into a bracket
    // This is tate because it changes over time from user input (vote tallies)
    const [bracket, setBracket] = useState(() => constructBracket(teams));
    useEffect(() => {
        setBracket(constructBracket(teams));
    }, [teams]);

    useEffect(() => {
        // console.log("New bracket state: ", bracket);
    }, [bracket])

    // Given user input, update the votes array for a match
    function handleUpdateVotes(ID, newVoteArr) {
        let nextBracket = bracket.cleanCopy();
        let nextMatch = nextBracket.getMatch(ID);
        // Replace old match with a new one that's the same except for a new vote array
        nextBracket.setMatch(nextMatch.cleanCopy({votes: newVoteArr}));
        setBracket(nextBracket);
    }

    // Update the bracket when there's an update to a Match's winner
    function handleUpdateWinner(matchID, winnerID) {
        let nextBracket = bracket.cleanCopy();
        nextBracket.handleMatchWinner(matchID, winnerID);
        setBracket(nextBracket);
    }

    return (
        <Router>
            <Routes>
                <Route element={<Header title={title}/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="create" element={<SetupPage title={title} setTitle={setTitle}
                                                             teams={teams} setTeams={setTeams}
                                                             voters={voters}
                                                             setVoters={setVoters}
                                                             bracket={bracket}/>}/>
                    <Route path="help" element={<IdeasPage/>}/>
                    <Route path="play" element={<PlayBracketPage title={title} bracket={bracket}
                                                                 voters={voters}
                                                                 updateVotes={handleUpdateVotes}
                                                                 updateWinner={handleUpdateWinner}/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
