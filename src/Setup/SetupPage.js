import React from 'react';
import {useNavigate} from "react-router-dom";
import "./Setup.css";
import PreviewBracket from "../PreviewBracket/PreviewBracket";
import Settings from "./Settings";
import Team from "../BracketAlgos/Team";
import TeamAddGrid from "./TeamAddGrid";
import VoterAddGrid from "./VoterAddGrid";

export default function SetupPage({
                                      title,
                                      setTitle,
                                      desc,
                                      setDesc,
                                      teams,
                                      setTeams,
                                      bracket,
                                      voters,
                                      setVoters, onStart
                                  }) {

    // ~~~~ Modifying State Functions ~~~~
    // SetupPage has the power to edit the teams, voters, while PlayPage does not

    // Create a new team, with a seed one higher than the current highest and a default name
    function createTeam() {
        let newName = "Team " + (teams.length + 1);
        let lastTeam = teams.length > 0 ? teams.slice(-1)[0] : null;
        if (lastTeam) {
            // If the new name-to-be already exists, add 1 to it
            if (lastTeam.name === newName) {
                newName = "Team " + (parseInt(lastTeam.name.slice(-1)) + 1);
            }
        }
        const newTeam = new Team(teams.length, newName);
        setTeams([...teams, newTeam]);
    }

    // Give a team a new name
    function updateTeamName(index, newName) {
        let nextTeams = [...teams];
        nextTeams[index].name = newName;
        setTeams(nextTeams);
    }

    // Re-distribute the seeds of all existing teams
    // Seeds will always go from 0-n (n = num teams), with no gaps
    function reSeed(teamsList) {
        for (let i = 0; i < teamsList.length; i++) {
            teamsList[i].id = i;
        }
        return teamsList;
    }

    // Remove a team
    function removeTeam(index) {
        let nextTeams = [...teams];
        nextTeams = [...nextTeams.slice(0, index), ...nextTeams.slice(index + 1)];
        // Re-seed so that we always have a continuous count of seeds, no gaps (e.g. 1,2,4)
        setTeams(reSeed(nextTeams));
    }

    // Given a target number of teams, add or remove teams to meet that target
    function changeNumTeams(targetNum) {
        if (targetNum < 0) {
            return;
        }
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

    // Randomize the order of the existing teams
    function shuffleTeams() {
        let nextTeams = [...teams];
        for (let i = nextTeams.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = nextTeams[i];
            nextTeams[i] = nextTeams[j];
            nextTeams[j] = temp;
        }
        // Re-seed so that it changes the team objects' IDs, not just their order in the teams array
        setTeams(reSeed(nextTeams));
    }

    // Create a new voter with a default name
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

    // Change the name of a voter
    function updateVoterName(oldName, newName) {
        let nextVoters = [...voters];
        for (let voter of nextVoters) {
            if (voter.name === oldName) {
                voter.name = newName;
            }
        }
        setVoters(nextVoters);
    }

    // Remove a voter
    function removeVoter(name) {
        let nextVoters = [...voters];
        nextVoters = nextVoters.filter(item => item.name !== name);
        setVoters(nextVoters);
    }

    // Public facing method to add or remove voters (has guardrails)
    function changeNumVoters(targetNum) {
        if (targetNum < 1 || targetNum > 10) { //arbitrarily capping at 9 just for space
            return;
        }
        if (targetNum === voters.length) {
            return;
        }
        if (targetNum > voters.length) { //Add more voters
            for (let i = voters.length; i < targetNum; i++) {
                createVoter();
            }
        }
        if (targetNum < voters.length) { //Remove voters
            for (let i = targetNum; i < voters.length; i++) {
                let lastName = voters.slice(-1)[0].name;
                removeVoter(lastName);
            }
        }
    }

    // Whether the bracket is ready to start
    // Needs to have 2+ teams, and an odd number of voters greater than 1
    function checkStartReqs() {
        return teams.length >= 2 && (voters.length % 2 !== 0);
    }

    let allowToStart = checkStartReqs();
    let startBtnStyle = allowToStart ? "start-btn-able" : "start-btn-disabled";

    // Navigate to PlayPage if we're allowed to start. Otherwise, show error message
    const navigate = useNavigate();

    function handleStartClick() {
        if (allowToStart) {
            onStart();  // Initialize votes objects now that the voters are set
            navigate('/play');
        } else { //specific error handling
            if (!(teams.length >= 2)) {
                alert("A bracket needs at least two teams.");
            } else if (!(voters.length % 2 !== 0)) {
                alert("A voting bracket needs an odd number of voters, in order to solve ties.");
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
                    <button className={`start-btn ${startBtnStyle}`}
                            onClick={handleStartClick}>Start Bracket
                    </button>
                </div>
                <Settings numTeams={teams.length} changeNumTeams={changeNumTeams}
                          numVoters={voters.length} changeNumVoters={changeNumVoters} title={title}
                          setTitle={setTitle} desc={desc} setDesc={setDesc}/>
                <h3>Teams</h3>
                <TeamAddGrid teams={teams} updateTeamName={updateTeamName}
                             changeNumTeams={changeNumTeams} createTeam={createTeam}
                             shuffleTeams={shuffleTeams}/>
                <h3>Voters</h3>
                <VoterAddGrid voters={voters} changeNumVoters={changeNumVoters}
                              createVoter={createVoter} updateVoterName={updateVoterName}/>
            </div>
            <div className={"setup-right"}>
                <PreviewBracket bracket={bracket} roundWidth={200}/>
            </div>
        </div>
    );
}