import React, {useEffect} from 'react';
import {useState} from "react";
import Team from "./Team";
import {FaShuffle} from "react-icons/fa6";
import Settings from "./Settings";
import {Link} from "react-router-dom";
import Matchup from "./Matchup";
import BracketPreview from "./BracketPreview";
import home from "./Home";

export default function SetupScreen({setTitle, title}) {
    const [teams, setTeams] =
        useState([]);
    // TODO: why is this here
    let numTeams = teams.length;
    const [desc, setDesc] = useState("");

    let [bracket, setBracket] = useState({roundNum: 1, matches: [], nextRound: {}});
    // Update matches whenever teams change
    useEffect(() => {
        constructBracket();
    }, [teams]);

    // Making matchIDCounter a global variable - I think it doesn't need to be state because I actually want it to reset after re-renders
    let matchIDCounter = 0;

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

    // Convert each match from a list of two Ints to a list of two Teams (id, name, votes)
    // Assumes home team will never be null
    // Finds the Team objects from teams variable and chooses the one with the corresponding ID
    function convertToTeamObject(matchesList) {
        return matchesList.map((match) => {
            // Before processing, match.team1 and match.team2 are just Ints
            // Match IDs from seeding algo are 1-indexed, have to adjust
            let homeTeam = teams.filter(team => team.id + 1 === match.team1)[0];
            let awayTeam = match.team2;
            if (awayTeam !== null) {
                awayTeam = teams.filter(team => team.id + 1 === awayTeam)[0];
            }
            return {id: match.id, winner: match.winner, team1: homeTeam, team2: awayTeam};
        })
    }

    // Creates a match in the first round: may generate byes
    // If placeholder flag, create a placeholder match with null teams instead of an actual match
    function createMatch(homeSeed, targetSum, totalTeams, byes) {
        // Home seed will never be null
        let awaySeed = targetSum - homeSeed;
        if (awaySeed > totalTeams) { //this match is a bye, should be moved to next round of tourney
            byes.push(homeSeed);
            awaySeed = null;
        }
        // console.log("Home team: ", homeTeam, 'Away team: ', awayTeam)
        return {id: null, winner: null, team1: homeSeed, team2: awaySeed};
    }

    // Given the desired number of rounds, returns the properly seeded first round
    //  with 2^numRounds teams in it
    // Time complexity: O(m*(m/2))
    function seedTeams(numRounds, roundID, numNonPlaceholderTeams, byeTeams) {
        // console.log(`Seeding teams: ${numRounds} rounds, ${numNonPlaceholderTeams} non-placeholder teams, bye teams: ${byeTeams}`)
        // If this variable gets outputted unchanged, something is wack
        let matches = [{team1: 1, team2: 2}];
        let byes = [];
        for (let round = 1; round < numRounds; round++) {
            let curRoundMatches = [];
            let targetSum = Math.pow(2, round + 1) + 1;
            // For each match in this round, create the two matches in the previous round that feed
            // into it
            for (let i = 0; i < matches.length; i++) {
                let firstMatch;
                let secondMatch;
                // Flip the order of adding halfway through (so top half of bracket mirrors bottom)
                if (i >= matches.length / 2) {
                    // Add 1 to away seed since team IDs are 0-indexed, seeds at 1-indexed
                    firstMatch =
                        createMatch(matches[i].team2, targetSum, numNonPlaceholderTeams, byes);
                    secondMatch =
                        createMatch(matches[i].team1, targetSum, numNonPlaceholderTeams, byes);
                } else {
                    firstMatch =
                        createMatch(matches[i].team1, targetSum, numNonPlaceholderTeams, byes);
                    secondMatch =
                        createMatch(matches[i].team2, targetSum, numNonPlaceholderTeams, byes);
                }
                curRoundMatches.push(firstMatch);
                curRoundMatches.push(secondMatch);
            }
            matches = curRoundMatches;
        }
        // Right now, each Team in a Match is just an Int. This converts them to actual Team objects
        let newMatches = convertToTeamObject(matches)
        return [newMatches, byes];
    }

    /**
     * Constructs a bracket object from the current teams state
     * @returns a recursive bracket object {roundNum, matches, nextRound}
     */
    function newConstructBracket() {
        let totalRounds = getNumOfRounds(teams.length);
        let bracket; // 0 teams => there is no bracket
        if (teams.length === 0) {
            bracket = {roundNum: 0, matches: [], nextRound: null}
        } else if (teams.length === 1) { // 1 team => one round with one (incomplete) match
            bracket = {
                roundNum: 0, matches: [{
                    id: 0, winner: null, team1: teams[0],
                    team2: null, nextMatchId: null
                }], nextRound: null
            };
        } else if (teams.length === 2) { //2 teams => same as round 1 but with one complete match
            bracket = {
                roundNum: 0, matches: [{
                    id: 0, winner: null, team1: teams[0],
                    team2: teams[1], nextMatchId: null
                }], nextRound: null
            };
        } else if (teams.length === 3) { //Hardcoding 3 teams since it was an edge case to the seeding algo
            bracket = {
                roundNum: 0, matches: [{
                    id: 0, winner: null, team1: teams[1],
                    team2: teams[2], nextMatchId: 1
                }],
                nextRound: {
                    roundNum: 1, matches: [{
                        id: 1, winner: null, team1: teams[0], team2: null, nextMatchId: null
                    }], nextRound: null
                }
            };
        } else {  // MAIN CASE: 4+ teams
            //roundNum = 0 indexed, first round = 0
            // Teams in round: array containing Team objects
            function buildRoundRecursive(teamsInCurRound, curRoundIdx, byeTeamsFromLastRound) {
                console.log(`BUILDING ROUND ${curRoundIdx} with teams `, teamsInCurRound)
                //Number of non-placeholder teams = number of bye teams.
                //  Unless it's the first round, where it = number of teams in current round
                let numNonPlaceholderTeamsInRound = byeTeamsFromLastRound.length
                if (curRoundIdx === 0) {
                    numNonPlaceholderTeamsInRound = teamsInCurRound.length
                }
                let seedTeamsResult = seedTeams(totalRounds - curRoundIdx,
                                                curRoundIdx, numNonPlaceholderTeamsInRound,
                                                byeTeamsFromLastRound)
                let curMatches = seedTeamsResult[0];
                // Assign match IDs sequentially
                // TODO: This works, but now we need to assign nextMatchIDs
                seedTeamsResult[0].map((match) => {
                    match.id = matchIDCounter++;
                    return match;
                })
                console.log("Matches initial ", curMatches, byeTeamsFromLastRound)
                // Create next round placeholders based on this round's teams (handles byes)
                let nextRoundTeams = [];
                // By "bye match", I mean a match in the first round that should really be in the
                //  second round. E.g. 1vsNull should be moved to round 2, not included in round 1
                //  Won't have to worry about this if we're past round 1
                // TODO: only handle this in round 1
                let curNonByeMatches = [];
                // Create placeholders for next round. Also, remove byes from this round, add
                //  them to next round
                curMatches.forEach(function (match) {
                    // A bye team is one that is playing a null team in its current match.
                    // If there are any bye teams from last round, this is round 2, and so next
                    // round's teams must be all null (no team can get two bye rounds)
                    // TODO: put this code in a separate function
                    let team1 = match.team1;
                    let team2 = match.team2;
                    if (curRoundIdx === 0) { //advance bye teams to next round iff this is round 1
                        if (team1 === null) {
                            nextRoundTeams.push(team2)
                        } else if (team2 === null) {
                            nextRoundTeams.push(team1)
                        } else {
                            nextRoundTeams.push(null);
                            curNonByeMatches.push(match);
                        }
                    } else { //Just add one placeholder team per match
                        nextRoundTeams.push(null);
                        // Iff we're in round 2, push the match as is if it's a bye match.
                        //  Otherwise, push a placeholder
                        if (curRoundIdx === 1) {
                            // Adjust by 1 since seeds are 1-indexed, IDs are 0-indexed
                            if (byeTeamsFromLastRound.includes(team1.id + 1)) {
                                curNonByeMatches.push(match);
                            } else {
                                curNonByeMatches.push(convertMatchToPlaceholder(match));
                            }
                        } else { //Otherwise, all matches will be placeholders
                            curNonByeMatches.push(convertMatchToPlaceholder(match));
                        }
                    }
                })
                console.log("Matches actual: ", curNonByeMatches)
                // console.log("Next round teams: ", nextRoundTeams, byeTeamsFromLastRound)
                // Recurse if this isn't the finals
                let nextRound;
                if (curMatches.length > 1) {
                    nextRound =
                        buildRoundRecursive(nextRoundTeams, curRoundIdx + 1, seedTeamsResult[1]);
                }
                return {roundNum: curRoundIdx, matches: curNonByeMatches, nextRound: nextRound}
            }

            bracket = buildRoundRecursive(teams, 0, []);
        }
        return bracket;
    }

    function convertMatchToPlaceholder(match) {
        return {id: match.id, winner: match.winner, team1: null, team2: null}
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