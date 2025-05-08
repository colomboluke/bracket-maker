import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {constructBracket, setMatch} from "../CreateBracketAlgo";
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
    // Not state because it's entirely derived from the teams state
    const bracket = constructBracket(teams);

    // TODO: have a incrementVote function here which mutates the bracket variable
    // Also TODO: have each Match object have a votes array. [3, 2] would mean 3 votes for team1, 2 votes for team2
    // incrementVote will take in a matchID and new votes array, and find the corresponding match and replace its existing votes

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
                                                                 voters={voters}/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
