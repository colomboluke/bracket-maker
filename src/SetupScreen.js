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

    const [bracket, setBracket] = useState({round: 1, matches: [], nextRound: []});
    // Update matches whenever teams change
    useEffect(() => {
        let roundId = 1; //Accumulator for the round id, starting at 1
        // console.log("# teams: " + teams.length, "num rounds: " + getNumOfRounds(teams.length), Math.pow(2, getNumOfRounds(teams.length)) / 2);
        // createMatches(teams, 0);
    }, [teams]);

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

    function getMatchByIdBracket(wholeBracket, id) {
        if (!wholeBracket) {
            return null;
        }
        for (const match of wholeBracket.matches) {
            if (match.id === id) {
                return match;
            }
        }
        return getMatchByIdBracket(wholeBracket.nextRound, id);
    }

    function getMatchByIdList(listOfMatches, id) {
        for (const match of listOfMatches) {
            if (match.id === id) {
                return match;
            }
        }
        return null;
    }

    function assignMatchIds(curMatchesList, nextMatchesList) {
        // Loop through each of the nextMatches, if it has an opening, give it the id of a current
        // match, starting with the highest current id
        let curIdCounter = curMatchesList[curMatchesList.length - 1].id;
        for (let i = 0; i < nextMatchesList.length; i++) {
            let curMatch = nextMatchesList[i];
            if (nextMatchesList[i].team1 == null) {
                getMatchByIdList(curMatchesList, curIdCounter).nextMatchId = nextMatchesList[i].id;
                curIdCounter--;
            }
            if (nextMatchesList[i].team2 == null) {
                getMatchByIdList(curMatchesList, curIdCounter).nextMatchId = nextMatchesList[i].id;
                curIdCounter--;
            }
        }
    }

    function getNumMatchesInRound(numTeams) {
        if (numTeams === 0 || numTeams === 1) {
            return 0;
        }
        else {
            return Math.pow(2, getNumOfRounds(numTeams)) / 2
        }
    }

    // Pad given array with nulls until it reaches the desired length
    function padArray(targetLength, curLength, array) {
        for (let i = 0; i < targetLength - curLength; i++) {
            array.push(null);
        }
        return array;
    }



    function constructBracket() {
        let totalRounds = getNumOfRounds(teams.length);
        let numByes = (teams.length <= 1) ? 0 :
                      Math.pow(2, getNumOfRounds(teams.length)) - teams.length;
        let initialBracket = null; // If 0 teams, there is no bracket
        // If 1 team, just one round with one (incomplete) match
        if (totalRounds === 1 && teams.length === 1) {
            // TODO: figure out what winner should be in this case
            initialBracket = {round: 1, matches: [{id: 1, winner: null, team1: teams[0], team2: null,
                    nextMatchId: null}], nextRound: null};
        }
        // MAIN CASE: 2+ teams
        else {
            let matchIdCounter = 0;
            // Pair together the highest and lowest seed, repeat until there's 1 or 0 teams left
            // loPointer: index of worst team not yet added
            // hiPointer: index of best team not yet added
            function pairTeams(teamsList, loPointer, hiPointer) {
                let matchesToReturn = [];
                while (hiPointer - loPointer >= 1) {
                    let curMatch = {id: matchIdCounter++, winner: null, team1: teamsList[loPointer],
                        team2: teamsList[hiPointer]};
                    matchesToReturn.push(curMatch);
                    loPointer++;
                    hiPointer--;
                }
                if (hiPointer === loPointer) { //if odd number of matches
                    let curMatch = {id: matchIdCounter++, winner: null, team1: teamsList[loPointer],
                        team2: null};
                    matchesToReturn.push(curMatch);
                }
                return matchesToReturn;
            }
            function buildRoundRecursive(teamsInRound, roundNum, byeFlag, numTotalTeams) {
                // If this is the first round after a bye, pad teams until we get to x/2, where
                // x is the number of teams the wildcard round would have if it was full
                if (byeFlag) {
                    teamsInRound = padArray(getNumMatchesInRound(teams.length),
                                            teamsInRound.length, teamsInRound);
                }
                if (teamsInRound.length === 1) { //if there's only one team left for some reason
                    // TODO: figure out what winner should be in this case
                    return {round: 1, matches: [{id: 1, winner: null, team1: teams[0], team2: null,
                            nextMatchId: null}], nextRound: null};
                }
                let nextRoundTeams = [];
                for (let i = 0; i < (teamsInRound.length) / 2; i++) {
                    nextRoundTeams.push(null);    //add placeholder for winner of this match
                }
                let curMatches = [];
                let nextRound = null;
                curMatches = pairTeams(teamsInRound, 0, teamsInRound.length - 1);
                if (curMatches.length > 1) {    //recurse if this isn't the finals
                    nextRound = buildRoundRecursive(nextRoundTeams, roundNum + 1, false);
                    // Assign nextMatchIds iff we recurse (finals match will have no nextMatchId)
                    assignMatchIds(curMatches, nextRound.matches);
                }
                return {round: roundNum, matches: curMatches, nextRound: nextRound};
            }
            //If there are any byes, add a wildcard round to the start
            if (numByes > 0) {
                // Build first round from the teams w/o byes
                let firstRoundMatches = pairTeams(teams, numByes, teams.length - 1);
                let nextRound = buildRoundRecursive(teams.slice(0, numByes), 1, true, teams.length);
                // Assign nextMatchIds for first round, based on next round matches
                assignMatchIds(firstRoundMatches, nextRound.matches);
                initialBracket = {round: 0, matches: firstRoundMatches,
                    nextRound: nextRound};
            }
            else {
                initialBracket = buildRoundRecursive(teams, 0);
            }
        }
        return initialBracket;
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