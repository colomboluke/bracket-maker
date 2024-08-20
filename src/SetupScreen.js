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
    const [rounds, setRounds] = useState(0);
    // const initialMatches = {
    //     round: 1,
    //     matches: createMatches(teams)[0],
    //     nextRound: null
    // }
    const [matches, setMatches] = useState({round: 1, matches: null, nextRound: null});
    // Update matches whenever teams change
    useEffect(() => {
        let roundId = 1; //Accumulator for the round id, starting at 1
        createMatches(teams, roundId, 0);
    }, [teams]);

    //Creates the initial matches in round 1, given the list of teams
    function createMatches(teamsList, roundNum, originalLength) {
        let roundOneMatches = []
        // If no more matches, end
        if (!teamsList || teamsList.length === 0) {
            console.log("No teams left")
            return [];
        }

        // Distribute byes: the top seeded teams get preference
        let numByes = (teamsList.length <= 1) ? 0 :
                      Math.pow(2, getNumOfRounds(teamsList.length)) - teamsList.length;
        let byesList = []
        for (let i = 0; i < numByes; i++) {
            byesList.push(teamsList[i]);
        }

        let hiPointer = teamsList.length - 1; // index of the worst seeded team not yet added
        let loPointer = numByes;  // index of the best seeded team not yet added
        let matchesInCurRound = Math.round(teamsList.length / 2);
        // console.log(matchesInCurRound);
        while (hiPointer - loPointer >= 1) {
            // nextMatchId is this match's id plus all the additional matches in this round
            let curMatch = {
                id: loPointer, winner: null, nextMatchId: matchesInCurRound + loPointer,
                team1: teamsList[loPointer], team2: teamsList[hiPointer]
            };
            roundOneMatches.push(curMatch);
            loPointer++;
            hiPointer--;
        }
        // Odd number of matches; one match left out
        if (hiPointer === loPointer) {
            let curMatch = {
                id: loPointer, winner: null, nextMatchId: matchesInCurRound + loPointer,
                team1: teamsList[hiPointer], team2: null
            };
            roundOneMatches.push(curMatch);
        }
        console.log("Round " + roundNum, roundOneMatches, "Byes", byesList);
        // TODO: set round one matches, then run this function again on the teams that get byes,
        //  in case any of them play each other
        return [roundOneMatches, createMatches(byesList, roundNum + 1, originalLength)];
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
        // If the number of teams is exactly a power of 2, return that power
        if (Number.isInteger(Math.log2(numTeams))) {
            return Math.log2(numTeams);
        }
        // Else, find the highest power of 2 that's less than numTeams
        for (let i = numTeams; i > 0; i--) {
            if (Number.isInteger(Math.log2(i))) {
                return Math.log2(i) + 1;
            }
        }
    }

    return (
        <div className={"setup-cont"}>
            <div className={"setup-left"}>
                <button onClick={() => console.log(matches)}>Testing button</button>
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