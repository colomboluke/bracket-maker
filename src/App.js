import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Ideas from './Ideas';
import Header from "./Header";
import SetupScreen from "./SetupScreen";

function App() {
    return (
        <Router>
                <Routes>
                    <Route element={<Header/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="create" element={<SetupScreen />} />
                        <Route path="help" element={<Ideas />} />
                    </Route>
                </Routes>
        </Router>
    );
}

export default App;
