import React from 'react';
import {useState} from "react";
import Team from "./Team";
import {FaShuffle} from "react-icons/fa6";
import Settings from "./Settings";

// TODO: - fix shuffling/removing teams
//  - move 'Create Bracket' over to the left?
export default function SetupScreen({setTitle, title}) {
    const [teams, setTeams] =
        useState([{id: 0, name: "Team 1", votes: 0}]);
    let numTeams = teams.length;
    const [desc, setDesc] = useState("");

    function updateTeam(id, newName) {
        setTeams(prevTeams => prevTeams.map(item =>
                                                item.id === id ? {...item, name: newName} : item));
        console.log(teams);
    }

    function createTeam() {
        let name = "Team " + (teams.length + 1)
        setTeams([...teams, {id: teams.length, name: name, votes: 0}]);
        console.log(teams);
    }

    function changeNumTeams(targetNum) {
        if (targetNum === teams.length) {
            // console.log("reached");
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

    //Give teams new seeds (IDs) depending on their order in the variable `teams`
    function reseed() {
        let nextTeams = [...teams];
        nextTeams.map((item, idx) => {
            item.id = idx;
            return item;
        });
        setTeams(nextTeams);
    }

    function removeTeam(id) {
        console.log("removing team", id, teams);
        let nextTeams = [...teams];
        nextTeams = nextTeams.filter(team => team.id !== id);
        // After shuffling, give teams new IDs (seeds)
        // reseed();
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
        // reseed();
        setTeams(nextTeams);
        console.log(nextTeams, teams);
    }

    return (
        <div className={"setup-cont"}>
            <div className={"setup-left"}>
                <h1 className={"setup-title"}>Create Bracket</h1>
                <h3>Bracket Settings</h3>
                <Settings numTeams={numTeams} changeNumTeams={changeNumTeams} title={title}
                          setTitle={setTitle} desc={desc} setDesc={setDesc}/>
                <h3>Participants</h3>
                <div className={"team-add-grid"}>
                    <div className={"ta-header seed"}>Seed</div>
                    <div className={"ta-header name"}>Name</div>
                    <div className={"ta-header icon"}>Icon</div>
                    <div className={"ta-header color"}>Color</div>
                    <div className={"ta-header remove"}></div>
                    {/*TODO: Add a rearrange icon and delete only button when hovering*/}
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
            <div className={"bracket-preview"}>
                <div className={"match"}></div>
            </div>
        </div>
    );
}