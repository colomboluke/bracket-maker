import React, {useEffect, useState} from 'react';
import BracketPlay from "./BracketPlay";
import VotingScreen from "../Voting/VotingScreen";

export default function PlayBracketPage({title, bracket, voters}) {

    const choices = ["Into the Spiderverse", "Cars"];

    const [mousePos, setMousePos] = useState({x: 0, y: 0})

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    let newTitle = 'Untitled Bracket';
    if (title !== undefined && title !== null) {
        newTitle = title;
    }
    return (
        <>
            <h1>Play Bracket</h1>
            <button onClick={() => console.log(newTitle, bracket, voters)}>Test</button>
            <BracketPlay bracket={bracket}/>
            {/*<p>Mouse position: X: {mousePos.x} Y: {mousePos.y}</p>*/}
            {/*<VotingScreen voters={voters} choices={choices}/>*/}


        </>
    );
}
