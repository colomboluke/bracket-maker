import React from 'react';
import {useState} from "react";
import Team from "./Team";
import {FaShuffle} from "react-icons/fa6";
import Settings from "./Settings";
import {Link} from "react-router-dom";
import Matchup from "./Matchup";

export default function SetupScreen({setTitle, title}) {
    const testTeams = [{id: 0, name: "Luke", votes: 0}, {id: 1, name: "Jake", votes: 0},
        {id: 2, name: "Luke2", votes: 0}, {id: 3, name: "Zach", votes: 0}, {id: 4, name: "Aidan", votes: 0},
        {id: 5, name: "Gabe", votes: 0}, {id: 6, name: "Ivan", votes: 0}, {id: 7, name: "Levi", votes: 0},
        {id: 8, name: "Connor", votes: 0}];
    // const [teams, setTeams] =
    //     useState([{id: 0, name: "Team 1", votes: 0}]);
    const [teams, setTeams] =
        useState(testTeams);
    let numTeams = teams.length;
    const [desc, setDesc] = useState("");
    // TODO: make this a list instead? idk it makes more sense to me as a map
    const [matchups, setMatchups] = useState(new Map(
        [[6, null], [5, null], [4, null], [3, null], [2, null], [1, null]]));

    // ~~~~ Modifying State Functions ~~~~

    function updateTeam(index, newName) {
        setTeams(prevTeams => {
            const updatedTeams = [...prevTeams];
            updatedTeams[index] = {...updatedTeams[index], name: newName};
            return updatedTeams;
        });
    }

    function createTeam() {
        let name = "Team " + (teams.length + 1)
        setTeams([...teams, {id: teams.length, name: name, votes: 0}]);
    }

    function changeNumTeams(targetNum) {
        if (targetNum === teams.length) {
            return;
        }
        if (targetNum > teams.length) { //Add more teams
            for (let i = teams.length; i < targetNum; i++) {
                createTeam();
            }
        }
        if (targetNum < teams.length) { //Take away teams
            for (let i = targetNum; i < teams.length; i++) {
                let lastID = teams.slice(-1)[0].id;
                removeTeam(lastID);
            }
        }
    }

    function removeTeam(index) {
        let nextTeams = [...teams];
        nextTeams = [...nextTeams.slice(0, index), ...nextTeams.slice(index + 1)];
        setTeams(nextTeams);
    }

    function shuffleTeams() {
        let nextTeams = [...teams];
        for (let i = nextTeams.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = nextTeams[i];
            nextTeams[i] = nextTeams[j];
            nextTeams[j] = temp;
        }
        setTeams(nextTeams);
    }

    // ~~~~ Bracket Functions ~~~~

    const [rounds, setRounds] = useState(0);

    // Determine how many rounds there are, based on the number of teams
    function determineNumOfRounds() {
        for (let i = teams.length; i > 0; i--) {
            if (Number.isInteger(Math.log2(i))) {
                setRounds(Math.log2(i));
                return Math.log2(i);
            }
        }
    }

    // Given the list of teams, structure it into a list of matchups (each matchup is a list of length 2)
    function createMatchups() {
        let hiPointer = teams.length - 1;
        let loPointer = 0;
        //Map where each key is the round (6 for 64, 5 for 32, etc), and each value is the teams who
        // exist in that round
        let matchupsList = [];
        let nextMatchups = new Map(matchups);
        while (hiPointer - loPointer >= 1) {
            matchupsList.push([teams[loPointer], teams[hiPointer]]);
            console.log("HERE", teams[loPointer], teams[hiPointer]);
            loPointer++;
            hiPointer--;
        }
        // TODO: if a matchup is only length 1, move it to the next round
        // If there's an odd number of matchups, make the last one a matchup of length 1
        if (hiPointer === loPointer) {
            matchupsList.push([teams[loPointer]]);    // Add the last matchup, which is currently incomplete
        }
        console.log("Step 1:\t", matchupsList);

        // If there are 8 teams, set them to round 3, etc
        nextMatchups.set(determineNumOfRounds(), matchupsList);
        setMatchups(nextMatchups);
        console.log("Step 2:\t", nextMatchups, nextMatchups.get(3));
    }


    return (
        <div className={"setup-cont"}>
            <div className={"setup-left"}>
                <button onClick={() => createMatchups()}>Testing button</button>
                <h1 className={"setup-title"}>Create Bracket</h1>
                <div className={"setup-top-cont"}>
                    <h3 className={"t"}>Bracket Settings</h3>
                    <Link to={"/play"} className={"link start-btn-cont"}>
                        <button className={"start-btn"}>Start Bracket</button>
                    </Link>
                </div>
                <Settings numTeams={numTeams} changeNumTeams={changeNumTeams} title={title}
                          setTitle={setTitle} desc={desc} setDesc={setDesc}/>
                <h3>Participants</h3>
                <div className={"team-add-grid"}>
                    <div className={"ta-header seed"}>Seed</div>
                    <div className={"ta-header name"}>Name</div>
                    <div className={"ta-header icon"}>Icon</div>
                    <div className={"ta-header color"}>Color</div>
                    <div className={"ta-header remove"}></div>
                    {/*TODO: Add a rearrange icon, and a delete button only when hovering*/}
                    {teams.map((team, index) => (
                        <Team key={index} index={index} name={team.name}
                              updateName={updateTeam} removeTeam={removeTeam}></Team>
                    ))}
                    {teams.length > 0 ? (<button className={"blue-button shuffle-btn"}
                                                 onClick={() => shuffleTeams()}>
                        <FaShuffle className={"shuffle-icon"}/>
                    </button>) : (<></>)}
                    <button className={"blue-button add-team-btn"}
                            onClick={() => createTeam()}>Add
                        Participant
                    </button>
                </div>
            </div>
            <div className={"setup-right"}>
                <div className={"bracket-preview"}>
                    {/*TODO: clean this up using map or something*/}
                    {/*Round of 64*/}
                    {/*{rounds > 5 && (<div className={"bracket-round "}>*/}
                    {/*    {Array(32).fill("").map((item, index) => (*/}
                    {/*        <Matchup key={index} cssclassName={"round-64"} team1={2} index={index}/>))}*/}
                    {/*</div>)}*/}
                    {/*Round of 32*/}
                    {/*{rounds > 4 && (<div className={"bracket-round "}>*/}
                    {/*    {Array(16).fill("").map((item, index) => (*/}
                    {/*        <Matchup key={index} className={"round-32"}/>))}*/}
                    {/*</div>)}*/}
                    {/*Round of 16*/}
                    {/*{rounds > 3 && (<div className={"bracket-round "}>*/}
                    {/*    {matchups.get(4).map((item, index) => (*/}
                    {/*        // <Matchup key={index} className={"round-16"} team1={item.name} index={index}/>*/}
                    {/*        <li key={index}>{item.name}</li>*/}
                    {/*    ))}*/}
                    {/*</div>)}*/}
                    {/*Quarterfinals*/}
                    {rounds > 2 && (<div className={"bracket-round "}>
                        {matchups.get(3).map((matchup, index) => (
                            <Matchup key={index} className={"round-8"} team1={matchup[0].name}
                                     team2={matchup.length > 1 ? matchup[1].name : ""}/>
                            // <li key={index}>{item.id}</li>
                        ))}
                    </div>)}
                    {/*Semifinals*/}
                    {/*{rounds > 1 && (<div className={"bracket-round "}>*/}
                    {/*    {Array(2).fill("").map((item, index) => (*/}
                    {/*        <Matchup key={index} className={"round-4"} team1={item.name}/>))}*/}
                    {/*</div>)}*/}
                    {/*Finals*/}
                    {/*{rounds > 0 && (<div className={"bracket-round round-last"}>*/}
                    {/*    {Array(1).fill("").map((item, index) => (*/}
                    {/*        <Matchup key={index} className={"round-2"} team1={item.name}/>))}*/}
                    {/*</div>)}*/}
                </div>
            </div>
        </div>
    );
}