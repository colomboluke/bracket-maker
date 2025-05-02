import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Ideas from './Ideas';
import Header from "./Header";
import SetupScreen from "./SetupScreen";
import PlayBracketScreen from "./PlayBracketScreen";
import constructBracket from "./CreateBracketAlgo";

function App() {
    const [title, setTitle] = useState("");
    const [teams, setTeams] =
        useState([]);
    const [voters, setVoters] = useState([]);

    // Bracket algorithm: takes teams array and turns it into a bracket
    let bracket = constructBracket(teams);

    return (
        <Router>
            <Routes>
                <Route element={<Header title={title}/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="create" element={<SetupScreen title={title} setTitle={setTitle}
                                                               teams={teams} setTeams={setTeams}
                                                               voters={voters}
                                                               setVoters={setVoters}
                    bracket={bracket}/>}/>
                    <Route path="help" element={<Ideas/>}/>
                    <Route path="play" element={<PlayBracketScreen title={title} bracket={bracket}
                                                                   voters={voters}/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
