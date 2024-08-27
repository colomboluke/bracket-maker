import React, {useEffect} from 'react';
import {useState} from "react";
import Team from "./Team";
import {FaShuffle} from "react-icons/fa6";
import Settings from "./Settings";
import {Link} from "react-router-dom";
import Matchup from "./Matchup";

export default function SetupScreen({setTitle, title}) {
    const testTeams = [{id: 0, name: "Luke", votes: 0}, {id: 1, name: "Jake", votes: 0},
        {id: 2, name: "Luke2", votes: 0}, {id: 3, name: "Zach", votes: 0},
        {id: 4, name: "Aidan", votes: 0},
        {id: 5, name: "Gabe", votes: 0}, {id: 6, name: "Ivan", votes: 0},
        {id: 7, name: "Levi", votes: 0}];
    const [teams, setTeams] =
        useState([]);
    let numTeams = teams.length;
    const [desc, setDesc] = useState("");
    const [matchIDcounter, setMatchIDcounter] = useState(0);

    const [bracket, setBracket] = useState({round: 1, matches: [], nextRound: []});
    // Update matches whenever teams change
    useEffect(() => {
        let roundId = 1; //Accumulator for the round id, starting at 1
        getNumOfRounds(teams.length);
        // createMatches(teams, 0);
    }, [teams]);

    function assignMatchIds(curMatchesList, nextMatchesList) {
        // console.log(curMatchesList.map(match => match.id), nextMatchesList.map(match => match.id))
        for (let i = 0; i < curMatchesList.length; i+=1) {
            curMatchesList[i].nextMatchId = nextMatchesList[Math.floor(i / 2)].id;
            curMatchesList[i].nextMatchId = nextMatchesList[Math.floor(i / 2)].id;
        }
    }

    function constructBracket() {
        //Every round has (2^round)/2 matches in it, except for round 1 (due to byes)
        let totalRounds = getNumOfRounds(teams.length);
        let numByes = (teams.length <= 1) ? 0 :
                      Math.pow(2, getNumOfRounds(teams.length)) - teams.length;
        // console.log(teams.length + " teams", rounds);

        let initialBracket = null; // If 0 teams, there is no bracket
        // If 1 team, there's just one round with one (incomplete) match
        if (totalRounds === 1 && teams.length === 1) {
            // TODO: figure out what winner should be in this case
            initialBracket = {round: 1, matches: [{id: 1, winner: null, team1: teams[0], team2: null,
                    nextMatchId: null}], nextRound: null};
        }
        // MAIN CASE: 2+ teams
        else {
            let matchIdCounter = 0;
            // TODO: make sure this is changing properly (might need to make it state)
            function buildFirstRoundMatches(numByes) {
                // console.log("Building round 1", matchIdCounter);
                let firstRoundMatches = [];
                // Create matches, using the teams that don't get byes
                let hiPointer = teams.length - 1; //index of worst team not yet added
                let loPointer = numByes; //index of best team not yet added
                // console.log(loPointer, hiPointer, numByes, numFirstRoundTeams);
                // Should always be an even number of teams in the first round, so these will never meet
                while (hiPointer - loPointer >= 1) {
                    let curMatch = {id: matchIdCounter++, winner: null, team1: teams[loPointer],
                        team2: teams[hiPointer]};
                    firstRoundMatches.push(curMatch);
                    loPointer++;
                    hiPointer--;
                }
                // let teamsWithByes = teams.slice(0, numByes);
                // let nextRoundMatches = [];
                // console.log("First round matches: ", firstRoundMatches)
                return firstRoundMatches;
            }
            function buildRoundRecursive(teamsInRound, roundNum, byeFlag) {

                if (teamsInRound.length === 1) { //if there's only one team left for some reason
                    // TODO: figure out what winner should be in this case
                    return {round: 1, matches: [{id: 1, winner: null, team1: teams[0], team2: null,
                            nextMatchId: null}], nextRound: null};
                }
                // If teamsInRound.length !== power of 2, pad the end with nulls to represent the
                // wildcard spots
                if (byeFlag) {
                    teamsInRound.push(null);    //if there was a bye, we always add at least 1
                    while (!Number.isInteger(Math.log2(teamsInRound.length))) {
                        teamsInRound.push(null);
                    }
                }
                console.log("Building round " + roundNum, teamsInRound, matchIdCounter);
                let hiPointer = teamsInRound.length - 1;
                let loPointer = 0;
                let curMatches = [];
                // If this is the first round after the wildcard round and there's an odd number
                // of teams in it, seed #1 needs to get the first match, to play the worst seed
                if (byeFlag && teamsInRound.length % 2 === 1) {
                    let curMatch = {id: matchIdCounter++, winner: null, team1: teamsInRound[loPointer],
                        team2: null};
                    curMatches.push(curMatch);
                    loPointer = 1;
                }
                let nextRoundTeams = [];
                while (hiPointer - loPointer >= 1) {
                    let curMatch = {id: matchIdCounter++, winner: null, team1: teamsInRound[loPointer],
                        team2: teamsInRound[hiPointer]};
                    curMatches.push(curMatch);
                    nextRoundTeams.push(null);    //placeholder for winner of this match
                    loPointer++;
                    hiPointer--;
                }
                if (hiPointer === loPointer) { //odd number of matches
                    let curMatch = {id: matchIdCounter++, winner: null, team1: teamsInRound[loPointer],
                        team2: null};
                    curMatches.push(curMatch);
                }
                console.log("Matches in round " + roundNum, curMatches);
                let nextRound = null;
                if (curMatches.length > 1) {    //recurse if this isn't the finals
                    // console.log("Recursing with " + nextRoundTeams.length + " matches")
                    nextRound = buildRoundRecursive(nextRoundTeams, roundNum + 1, false);
                    // Assign nextMatchIds iff we recurse
                    // TODO: this means the finals will have no nextMatchId, which I think is ok
                    assignMatchIds(curMatches, nextRound.matches);
                }

                return {round: roundNum, matches: curMatches, nextRound: nextRound};
            }
            //If there are any byes, add a wildcard round to the start
            if (numByes > 0) {
                // console.log("Building first round with teams", teams.slice(numByes), teams.slice(0, numByes));
                let firstRoundMatches = buildFirstRoundMatches(numByes);
                // console.log(teams.slice(0, numByes));
                let nextRound = buildRoundRecursive(teams.slice(0, numByes), 1, true);
                // Assign nextMatchIds for first round, based on next round matches
                // console.log(firstRound, teams.slice(numByes));
                // assignMatchIds(firstRound, nextRound.matches);
                initialBracket = {round: 0, matches: firstRoundMatches,
                    nextRound: nextRound};
            }
            else {
                initialBracket = buildRoundRecursive(teams, 0);
            }
        }
        return initialBracket;
    }



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

    // Determine how many rounds there are, based on the number of teams
    function getNumOfRounds(numTeams) {
        if (numTeams === 0) {
            return 0;
        }
        if (numTeams === 1) {
            return 1;
        }
        // Else, find the highest power of 2 that's less than numTeams
        return Math.ceil(Math.log2(numTeams));
    }

    return (
        <div className={"setup-cont"}>
            <div className={"setup-left"}>
                <button onClick={() => console.log(constructBracket())}>Testing button</button>
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

                </div>
            </div>
        </div>
    );
}