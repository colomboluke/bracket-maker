import React, {useEffect} from 'react';
import {useState} from "react";
import Team from "./Team";
import {FaShuffle} from "react-icons/fa6";
import Settings from "./Settings";
import {Link} from "react-router-dom";
import Matchup from "./Matchup";
import BracketPreview from "./BracketPreview";

export default function SetupScreen({setTitle, title}) {
    const [teams, setTeams] =
        useState([]);
    let numTeams = teams.length;
    const [desc, setDesc] = useState("");

    const [bracket, setBracket] = useState({roundNum: 1, matches: [], nextRound: {}});
    // Update matches whenever teams change
    useEffect(() => {
        constructBracket();
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
        } else {
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

    // If this seed is higher than the highest seed, make it null
    function changeIntoBye(seed, participantsCount) {
        return seed <= participantsCount ? seed : null;
    }

    function seedTeams(matchIDCounter, numRounds) {
        let matches = [{id: matchIDCounter, winner: null, team1: 1, team2: 2}];
        for (let round = 1; round < numRounds; round++) {
            let curRoundMatches = [];
            let targetSum = Math.pow(2, round + 1) + 1;
            for (let i = 0; i < matches.length; i++) {
                let firstHome;
                let firstAway;
                let secondHome;
                let secondAway;
                // Flip the order of adding halfway through (so it's kinda mirror image)
                if (i >= matches.length / 2) {
                    firstHome = changeIntoBye(matches[i]["team2"], teams.length);
                    firstAway = changeIntoBye(targetSum - matches[i]["team2"], teams.length);
                    secondHome = changeIntoBye(matches[i]["team1"], teams.length);
                    secondAway = changeIntoBye(targetSum - matches[i]["team1"], teams.length);
                } else {
                    firstHome = changeIntoBye(matches[i]["team1"], teams.length);
                    firstAway = changeIntoBye(targetSum - matches[i]["team1"], teams.length);
                    secondHome = changeIntoBye(matches[i]["team2"], teams.length);
                    secondAway = changeIntoBye(targetSum - matches[i]["team2"], teams.length);
                }
                console.log("HERE", firstHome, firstAway);
                curRoundMatches.push(
                    {id: matchIDCounter++, winner: null, team1: firstHome, team2: firstAway});
                curRoundMatches.push(
                    {id: matchIDCounter++, winner: null, team1: secondHome, team2: secondAway});
            }
            matches = curRoundMatches;
            console.log("Round", round, curRoundMatches)
        }
        return matches;
    }

    function newConstructBracket() {
        let totalRounds = getNumOfRounds(teams.length);
        let numByes = Math.pow(2, totalRounds) - teams.length;
        let bracket; // 0 teams => there is no bracket
        if (teams.length === 0) {
            bracket = {roundNum: 0, matches: [], nextRound: null}
        } else if (teams.length === 1) { // 1 team => one round with one (incomplete) match
            // TODO: figure out what winner should be in this case
            bracket = {
                roundNum: 0, matches: [{
                    id: 1, winner: null, team1: teams[0],
                    team2: null, nextMatchId: null
                }],
                nextRound: null
            };
        } else {  // MAIN CASE: 2+ teams
            //roundNum = 0 indexed, first round = 0
            let matchIDCounter = 0;
            // Teams in round: array containing Team objects
            function buildRoundRecursive(teamsInRound, curRoundIdx) {
                let curMatches =
                    seedTeams(matchIDCounter, totalRounds - curRoundIdx);
                //Create placeholders for next round
                let nextRoundTeams = [];
                for (let i = 0; i < (teamsInRound.length) / 2; i++) {
                    nextRoundTeams.push(null);
                }
                // Recurse if this isn't the finals
                let nextRound;
                if (curMatches.length > 1) {
                    nextRound = buildRoundRecursive(nextRoundTeams, curRoundIdx + 1);
                }
                return {roundNum: curRoundIdx, matches: curMatches, nextRound: nextRound}
            }
            bracket = buildRoundRecursive(teams, 0);
        }

        return bracket;
    }

    function constructBracket() {
        let totalRounds = getNumOfRounds(teams.length);
        let numByes = (teams.length <= 1) ? 0 :
                      Math.pow(2, getNumOfRounds(teams.length)) - teams.length;
        let initialBracket; // If 0 teams, there is no bracket
        // If 1 team, just one round with one (incomplete) match
        if (totalRounds === 1 && teams.length === 1) {
            // TODO: figure out what winner should be in this case
            initialBracket = {
                roundNum: 0, matches: [{
                    id: 1, winner: null, team1: teams[0],
                    team2: null, nextMatchId: null
                }],
                nextRound: null
            };
        }
        // MAIN CASE: 2+ teams
        else {
            let matchIdCounter = 0;
            // Pair together the highest and lowest seed, repeat until there's 1 or 0 teams left
            // loPointer: index of worst team not yet added
            // hiPointer: index of best team not yet added
            // This function has to be nested because of matchIDCounter
            function pairTeams(teamsList, loPointer, hiPointer) {
                let matchesToReturn = [];
                let numMatches = teamsList.length / 2;
                while (hiPointer - loPointer >= 1) {
                    let curMatch = {
                        id: matchIdCounter++, winner: null, team1: teamsList[loPointer],
                        team2: teamsList[hiPointer]
                    };
                    matchesToReturn.push(curMatch);
                    loPointer++;
                    hiPointer--;
                }
                if (hiPointer === loPointer) { //if odd number of matches
                    let curMatch = {
                        id: matchIdCounter++, winner: null, team1: teamsList[loPointer],
                        team2: null
                    };
                    matchesToReturn.push(curMatch);
                }
                return matchesToReturn;
            }

            // This function has to be nested because it calls pairTeams, which is nested
            function buildRoundRecursive(teamsInRound, roundNum, byeFlag) {
                // If this is the first round after a bye, pad teams until we get to x/2, where
                // x is the number of teams the wildcard round would have if it was full
                if (byeFlag) {
                    teamsInRound = padArray(getNumMatchesInRound(teams.length),
                                            teamsInRound.length, teamsInRound);
                }
                let nextRoundTeams = [];
                for (let i = 0; i < (teamsInRound.length) / 2; i++) {
                    nextRoundTeams.push(null);    //add placeholder for winner of this match
                }
                let nextRound = null;
                let curMatches = pairTeams(teamsInRound, 0, teamsInRound.length - 1);
                if (curMatches.length > 1) {    //recurse if this isn't the finals
                    nextRound = buildRoundRecursive(nextRoundTeams, roundNum + 1, false);
                    // Assign nextMatchIds iff we recurse (finals match will have no nextMatchId)
                    assignMatchIds(curMatches, nextRound.matches);
                }
                return {roundNum: roundNum, matches: curMatches, nextRound: nextRound};
            }

            //If there are any byes, add a wildcard round to the start
            if (numByes > 0) {
                // Build first round from the teams w/o byes
                let firstRoundMatches = pairTeams(teams, numByes, teams.length - 1);
                let nextRound = buildRoundRecursive(teams.slice(0, numByes), 1, true, teams.length);
                // Assign nextMatchIds for first round, based on next round matches
                assignMatchIds(firstRoundMatches, nextRound.matches);
                initialBracket = {
                    roundNum: 0, matches: firstRoundMatches,
                    nextRound: nextRound
                };
            }
            // Otherwise (exactly a power of 2), just start building recursively
            else {
                initialBracket = buildRoundRecursive(teams, 0);
            }
        }
        setBracket(initialBracket);
    }

    // TODO: create a function that accounts for votes and determines the winner of a match,
    //  updating the bracket accordingly

    return (
        <div className={"setup-cont"}>
            <div className={"setup-left"}>
                <button onClick={() => {
                    console.log(newConstructBracket())
                }}>Testing button
                </button>
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
                <BracketPreview bracket={bracket} roundWidth={200}/>
            </div>
        </div>
    );
}