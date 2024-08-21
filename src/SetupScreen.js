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

    function initializeEmptyBracket() {
        //Every round has (2^round)/2 matches in it, except for round 1 (due to byes)
        let totalRounds = getNumOfRounds(teams.length);
        let numByes = (teams.length <= 1) ? 0 :
                      Math.pow(2, getNumOfRounds(teams.length)) - teams.length;

        // console.log(teams.length + " teams", rounds);

        let initialBracket;
        // If 0 teams, there is no bracket
        if (totalRounds === 0) {
            initialBracket = null;
        }
        // If 1 team, there's just one round with one (incomplete) match
        else if (totalRounds === 1 && teams.length === 1) {
            // TODO: figure out what winner should be in this case
            initialBracket = {round: 1, matches: [{id: 1, winner: null, team1: teams[0], team2: null,
                    nextMatchId: null}], nextRound: null};
        }
        // 2+ teams
        else {
            // Do the first round, then recurse for the rest of them
            let matchIdCounter = 0;
            let firstRoundMatches = []
            let matchesInFirstRound = (totalRounds === 0) ? 0 :
                                      (Math.pow(2, totalRounds) / 2) - numByes;
            for (let i = 0; i < matchesInFirstRound; i++) {
                firstRoundMatches.push({id: matchIdCounter});
                matchIdCounter++;
            }
            // TODO: figure out this recursion. Should I create the first round manually,
            //  then recurse for the rest of them? Also, should I instead do this whole thing by
            //  having a team/match counter and looping until that's 0 (all are used up)?
            initialBracket = {round: 1, matches: firstRoundMatches,
                nextRound: initializeBracketHelp(2, totalRounds, matchIdCounter)};
        }
        console.log(initialBracket)
    }

    function initializeBracketHelp(curRoundNum, totalRounds, curMatchId) {
        // End case: only one match left
        if (curRoundNum >= totalRounds) {
            console.log("Ending at round " + curRoundNum);
            return {
                round: curRoundNum,
                matches: {id: curMatchId, nextMatchId: null},
                nextRound: null};
        }
        // Standard case
        let matchesInCurRound = Math.pow(2, (totalRounds - curRoundNum + 1)) / 2;
        console.log("Current round: " + curRoundNum, "matches: " + matchesInCurRound);
        let nextRoundMatches = [];
        for (let i = 0; i < matchesInCurRound; i++) {
            nextRoundMatches.push({id: curMatchId, nextMatchId: null});
            curMatchId++;
        }
        return {
            round: curRoundNum,
            matches: nextRoundMatches,
            nextRound: initializeBracketHelp(curRoundNum + 1, totalRounds, curMatchId)
        }
    }

    //Creates the initial matches in round 1, given the list of teams
    function createMatches(teamsList, recurseFlag) {
        let curRoundMatches = []
        // If no more matches, end
        if (!teamsList || teamsList.length === 0) {
            console.log("No teams left")
            return [];
        }

        // Distribute byes: the top seeded teams get preference
        let numByes = (teamsList.length <= 1) ? 0 :
                      Math.pow(2, getNumOfRounds(teamsList.length)) - teamsList.length;
        // If we're recursing, don't do byes anymore
        if (recurseFlag) {
            numByes = 0;
        }
        let byesList = []
        for (let i = 0; i < numByes; i++) {
            byesList.push(teamsList[i]);
        }

        let hiPointer = teamsList.length - 1; // index of the worst seeded team not yet added
        let loPointer = numByes;  // index of the best seeded team not yet added
        let matchesInCurRound = Math.round((teamsList.length - numByes) / 2);
        let matchIDCounterCopy = matchIDcounter;
        while (hiPointer - loPointer >= 1) {
            // nextMatchId is this match's id plus all the additional matches in this round
            // TODO: check and make sure of this ^^
            // TODO: make match IDs one scope level up: they should never repeat (should be state
            // maybe?)
            let curMatch = {
                id: matchIDCounterCopy, winner: null, nextMatchId: matchesInCurRound + loPointer,
                team1: teamsList[loPointer], team2: teamsList[hiPointer]
            };
            setMatchIDcounter(prevState => {
                return prevState + 1
            });
            curRoundMatches.push(curMatch);
            loPointer++;
            hiPointer--;
        }
        // Odd number of matches; one match left out
        if (hiPointer === loPointer) {
            let curMatch = {
                id: matchIDCounterCopy, winner: null, nextMatchId: matchesInCurRound + loPointer,
                team1: teamsList[hiPointer], team2: null
            };
            setMatchIDcounter(prevState => {
                return prevState + 1
            });
            curRoundMatches.push(curMatch);
        }

        console.log("Round " + (recurseFlag + 1), curRoundMatches, "Byes", byesList);
        // TODO: set round one matches, then run this function again on the teams that get byes,
        //  in case any of them play each other
        let nextBracket = {...bracket, matches: curRoundMatches};
        setBracket(nextBracket);
        //if we just ran for the first time, run again
        if (recurseFlag === 0) {
            createMatches(byesList, 1);
        }
    }

    //Given the matches in one round, create its next round (if one exists)
    function createNextRound(matches) {
        let matchesCopy = {...matches};
        let curRound = matchesCopy.round;
        let curTeams = matchesCopy;

        // Base case; we've reached the final round
        if (!matchesCopy) {
            return null;
        }
        // Recursion case

        return createNextRound(matchesCopy.nextRound);
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
                <button onClick={() => initializeEmptyBracket()}>Testing button</button>
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