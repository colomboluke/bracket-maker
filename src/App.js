import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Ideas from './Ideas';
import Header from "./Header";
import SetupScreen from "./SetupScreen";
import PlayBracket from "./PlayBracket";

function App() {
    const [title, setTitle] = useState("");

    return (
        <Router>
                <Routes>
                    <Route element={<Header title={title}/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="create" element={<SetupScreen title={title} setTitle={setTitle}/>} />
                        <Route path="help" element={<Ideas />} />
                        <Route path="play" element={<PlayBracket />} />
                    </Route>
                </Routes>
        </Router>
    );
}

export default App;
