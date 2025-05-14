import React from 'react';
import {useState} from "react";
import {FaShuffle} from "react-icons/fa6";
import {Link, useNavigate} from "react-router-dom";
import "./Setup.css";
import PreviewBracket from "../PreviewBracket/PreviewBracket";
import Settings from "./Settings";
import VoterRow from "./VoterRow";
import TeamRow from "./TeamRow";

export default function SetupPage({title, setTitle, teams, setTeams, bracket, voters, setVoters}) {

    const [desc, setDesc] = useState("");

    // ~~~~ Modifying State Functions ~~~~

    // Give a team a new name
    function updateTeamName(index, newName) {
        setTeams(prevTeams => {
            let updatedTeams = [...prevTeams];
            updatedTeams[index] = {...updatedTeams[index], name: newName};
            return updatedTeams;
        });
    }

    function updateVoter(oldName, newName) {
        let nextVoters = [...voters];
        for (let voter of nextVoters) {
            if (voter.name === oldName) {
                voter.name = newName;
            }
        }
        setVoters(nextVoters);
    }

    const names = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel",
                   "india", "juliette", "kilo", "lima", "mike", "november", "oscar", "papa",
                   "quebec", "romeo", "sierra", "tango", "uniform", "victor", "whisky", "x-ray",
                   "yankee", "zulu"]

    // Create a new team, with a seed one higher than the current highest and a default name
    function createTeam() {
        // TODO: change this back to just "Team 1", etc, so we can extend past 26 teams
        let newName = "Team " + names[(teams.length)].charAt(0).toUpperCase()
                      + names[(teams.length)].slice(1);
        let lastTeam = teams.length > 0 ? teams.slice(-1)[0] : null;
        if (lastTeam) {
            // If the new name-to-be already exists, add 1 to it
            if (lastTeam.name === newName) {
                newName = "Team " + (parseInt(lastTeam.name.slice(-1)) + 1);
            }
        }
        setTeams([...teams, {id: teams.length, name: newName}]);
    }

    // Given a target number of teams, add or remove teams to meet that target
    function changeNumTeams(targetNum) {
        if (targetNum === teams.length) {
            return;
        }
        if (targetNum > teams.length) { //Add more teams
            for (let i = teams.length; i < targetNum; i++) {
                createTeam();
            }
        }
        if (targetNum < teams.length) { //Remove teams
            for (let i = targetNum; i < teams.length; i++) {
                let lastID = teams.slice(-1)[0].id;
                removeTeam(lastID);
            }
        }
    }

    function changeNumVoters(targetNum) {
        if (targetNum === voters.length) {
            return;
        }
        if (targetNum > voters.length) { //Add more teams
            for (let i = voters.length; i < targetNum; i++) {
                createVoter();
            }
        }
        if (targetNum < voters.length) { //Remove teams
            for (let i = targetNum; i < voters.length; i++) {
                let lastName = voters.slice(-1)[0].name;
                removeVoter(lastName);
            }
        }
    }

    function createVoter() {
        let newName = "Voter " + (voters.length + 1);
        let lastVoter = voters.length > 0 ? voters.slice(-1)[0] : null;
        if (lastVoter) {
            // If the new name-to-be already exists, add 1 to it
            if (lastVoter.name === newName) {
                newName = "Voter " + (parseInt(lastVoter.name.slice(-1)) + 1);
            }
        }
        setVoters([...voters, {name: newName, history: []}]);
    }

    function removeVoter(name) {
        let nextVoters = [...voters];
        nextVoters = nextVoters.filter(item => item.name !== name);
        setVoters(nextVoters);
    }

    // Remove a team
    function removeTeam(index) {
        let nextTeams = [...teams];
        nextTeams = [...nextTeams.slice(0, index), ...nextTeams.slice(index + 1)];
        setTeams(reSeed(nextTeams));
    }

    // Randomize the order of the existing teams
    function shuffleTeams() {
        let nextTeams = [...teams];
        for (let i = nextTeams.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = nextTeams[i];
            nextTeams[i] = nextTeams[j];
            nextTeams[j] = temp;
        }
        setTeams(reSeed(nextTeams));
    }

    // Re-distribute the seeds of all existing teams
    // Seeds will always go from 0-n (n = num teams), with no gaps
    function reSeed(teamsList) {
        for (let i = 0; i < teamsList.length; i++) {
            teamsList[i].id = i;
        }
        return teamsList;
    }

    // Whether the bracket is ready to start
    // Needs to have 2+ teams, and an odd number of voters greater than 1
    let allowToStart = checkStartReqs();
    let startBtnStyle = allowToStart ? "start-btn-able" : "start-btn-disabled";
    function checkStartReqs() {
        return teams.length >= 2 && (voters.length % 2 !== 0);
    }

    const navigate = useNavigate();
    // Navigate to PlayBracketPage if we're allowed to start. Otherwise, show error message
    function handleStartClick() {
        const twoPlusTeams = teams.length >= 2;
        const oddNumVoters = voters.length % 2 !== 0;
        if (allowToStart) {
            navigate('/play');
        } else { //error handling
            if (!twoPlusTeams) {
                alert("A bracket needs at least two teams");
            } else if (!oddNumVoters) {
                alert("A voting bracket needs an odd number of voters. How else will we solve ties?");
            }
        }
    }

    return (
        <div className={"setup-cont"}>
            <div className={"setup-left"}>
                <button onClick={() => {
                    console.log("Teams:", teams);
                    console.log("Voters:", voters);
                    console.log("Bracket:", bracket);
                }}>Testing button
                </button>
                <h1 className={"setup-title"}>Create Bracket</h1>
                <div className={"setup-top-cont"}>
                    <h3 className={"t"}>Bracket Settings</h3>
                    <button className={`start-btn ${startBtnStyle}`} onClick={handleStartClick}>Start Bracket</button>
                </div>
                <Settings numTeams={teams.length} changeNumTeams={changeNumTeams}
                          numVoters={voters.length} changeNumVoters={changeNumVoters} title={title}
                          setTitle={setTitle} desc={desc} setDesc={setDesc}/>
                <h3>Teams</h3>
                <div className={"team-add-grid"}>
                    <div className={"ta-header seed"}>Seed</div>
                    <div className={"ta-header name"}>Name</div>
                    <div className={"ta-header icon"}>Icon</div>
                    <div className={"ta-header color"}>Color</div>
                    <div className={"ta-header remove"}></div>
                    {/*TODO: Add a rearrange icon, and a delete button only when hovering*/}
                    {teams.map((team, index) => (
                        <TeamRow key={index} index={index} name={team.name}
                                 updateName={updateTeamName} removeTeam={removeTeam}></TeamRow>
                    ))}
                    {teams.length > 0 ? (<button className={"blue-button shuffle-btn"}
                                                 onClick={() => shuffleTeams()}>
                        <FaShuffle className={"shuffle-icon"}/>
                    </button>) : (<></>)}
                    <button className={"blue-button add-team-btn"}
                            onClick={() => createTeam()}>Add
                        Team
                    </button>
                </div>
                <h3>Voters</h3>
                <div className={"voter-add-grid"}>
                    <div className={"ta-header name"}>Name</div>
                    <div className={"ta-header icon"}>Icon</div>
                    <div className={"ta-header color"}>Color</div>
                    <div className={"ta-header remove"}></div>
                    {voters.map((voter, index) => (
                        <VoterRow key={index} name={voter.name}
                                  updateName={updateVoter} removeVoter={removeVoter}></VoterRow>
                    ))}
                    <button className={"blue-button add-voter-btn"}
                            onClick={() => createVoter()}>Add Voter
                    </button>
                </div>
            </div>
            <div className={"setup-right"}>
                <PreviewBracket bracket={bracket} roundWidth={200}/>
            </div>
        </div>
    );
}