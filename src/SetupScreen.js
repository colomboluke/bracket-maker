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

    let [bracket, setBracket] = useState({roundNum: 1, matches: [], nextRound: {}});
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

    // True = requires a bye
    // False = does not require a bye
    function checkBye(seed, participantsCount) {
        return seed >= participantsCount;
    }

    function createMatch(homeTeam, targetSum, totalTeams, matchID, byes) {
        // Home seed will never be null
        // TODO: change this team variable to an object rather than an Int
        let homeSeed = homeTeam
        let awaySeed = targetSum - homeSeed;
        if (awaySeed > totalTeams) { //this match is a bye, should be moved to next round of tourney
            byes.push(homeSeed);
            awaySeed = null;
        }
        return {id: matchID, winner: null, team1: homeSeed, team2: awaySeed}
    }

    // Given the desired number of rounds, returns the properly seeded first round
    //  with 2^numRounds teams in it
    // Time complexity: O(m*(m/2))
    function initialSeeding(matchIDCounter, numRounds) {
        let matches = [{id: matchIDCounter, winner: null, team1: 1, team2: 2}];
        let byes = [];
        for (let round = 1; round < numRounds; round++) {
            let curRoundMatches = [];
            let targetSum = Math.pow(2, round + 1) + 1;
            for (let i = 0; i < matches.length; i++) {
                let firstMatch;
                let secondMatch;
                // Flip the order of adding halfway through (so top half of bracket mirrors bottom)
                if (i >= matches.length / 2) {
                    firstMatch = createMatch(matches[i]["team2"], targetSum, teams.length,
                                             matchIDCounter, byes);
                    secondMatch = createMatch(matches[i]["team1"], targetSum, teams.length,
                                              matchIDCounter, byes);
                } else {
                    firstMatch = createMatch(matches[i]["team1"], targetSum, teams.length,
                                             matchIDCounter, byes);
                    secondMatch = createMatch(matches[i]["team2"], targetSum, teams.length,
                                              matchIDCounter, byes);
                }
                curRoundMatches.push(firstMatch);
                curRoundMatches.push(secondMatch);
            }
            matches = curRoundMatches;
            // console.log("Round", round, curRoundMatches)
        }
        return [matches, byes];
    }

    function createPlaceholderRound(numTeams, ) {

    }

    // 1. Figure out meta info (num rounds, num byes, etc)
    // 2. Create the first round with initialSeeding algo
    // 3. Remove any byes matches from that list, put the bye teams in nextRoundMatches
    // 4. Repeat step 2, but output null matches instead of actual teams
    // 5. At some point, assign match IDs properly to keep track of which matches feed into others
    function newConstructBracket() {
        let totalRounds = getNumOfRounds(teams.length);
        let numByes = Math.pow(2, totalRounds) - teams.length;
        let bracket; // 0 teams => there is no bracket
        if (teams.length === 0) {
            bracket = {roundNum: 0, matches: [], nextRound: null}
        } else if (teams.length === 1) { // 1 team => one round with one (incomplete) match
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
            function buildRoundRecursive(teamsInCurRound, curRoundIdx) {
                let seedTeamsResult = initialSeeding(matchIDCounter, totalRounds - curRoundIdx)
                let curMatches = seedTeamsResult[0];
                console.log("Current round matches: ", curMatches)
                // Create next round placeholders based on this round's teams (handles byes)
                let nextRoundTeams = [];
                let curMatchesNoNull = [];
                // Create placeholders for next round. Also, remove byes from this round, add
                //  them to next round
                // TODO: assign match IDs properly
                curMatches.forEach(function (match) {
                    let team1Seed = match["team1"];
                    let team2Seed = match["team2"];
                    if (team1Seed === null) {
                        nextRoundTeams.push(team2Seed)
                    }
                    else if (team2Seed === null) {
                        nextRoundTeams.push(team1Seed)
                    }
                    else {
                        nextRoundTeams.push(null);
                        curMatchesNoNull.push(match);
                    }
                })
                console.log("Next round teams: ", nextRoundTeams)
                // Recurse if this isn't the finals
                let nextRound;
                if (curMatches.length > 1) {
                    nextRound = buildRoundRecursive(nextRoundTeams, curRoundIdx + 1);
                }
                return {roundNum: curRoundIdx, matches: curMatchesNoNull, nextRound: nextRound}
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
                    console.log("BRACKET:", newConstructBracket())
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