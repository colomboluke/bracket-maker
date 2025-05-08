import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {constructBracket, updateVotes} from "../CreateBracketAlgo";
import Header from "../Header/Header";
import HomePage from "../Home/HomePage";
import SetupPage from "../Setup/SetupPage";
import IdeasPage from "../Ideas/IdeasPage";
import PlayBracketPage from "../Play/PlayBracketPage";

function App() {
    const [title, setTitle] = useState("");
    const [teams, setTeams] =
        useState([]);
    const [voters, setVoters] = useState([]);

    // Bracket algorithm: takes teams array and turns it into a bracket
    // This is tate because it changes over time from user input (vote tallies)
    const [bracket, setBracket] = useState(() => constructBracket(teams));
    useEffect(() => {
        setBracket(constructBracket(teams));
    }, [teams]);

    // Given user input, update the votes array for a match
    function handleUpdateVotes(ID, newVoteArr) {
        let nextBracket = updateVotes({...bracket}, ID, newVoteArr);
        console.log("Updated bracket: ", nextBracket)
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
                                                                 voters={voters} updateVotes={handleUpdateVotes}/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
