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

    // Making matchIDCounter a global variable - I think it doesn't need to be state because I
    // actually want it to reset after re-renders
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
    // Finds the Team objects from teams variable and chooses the one with the corresponding ID
    // If a team is null, that means it's either a bye or this is a placeholder match: either way,
    // no need to make a change
    function convertToTeamObject(matchesList) {
        return matchesList.map((match) => {
            // Before processing, match.team1 and match.team2 are just Ints
            // Match IDs from seeding algo are 1-indexed, have to adjust
            let homeTeam = match.team1;
            if (homeTeam !== null) {
                homeTeam = teams.filter(team => team.id + 1 === match.team1)[0];
            }
            let awayTeam = match.team2;
            if (awayTeam !== null) {
                awayTeam = teams.filter(team => team.id + 1 === awayTeam)[0];
            }
            return {id: match.id, winner: null, team1: homeTeam, team2: awayTeam};
        })
    }

    // Total teams = number of non-placeholder teams in this round
    function createMatch2(homeSeed, awaySeed, totalTeams, byes) {
        if (awaySeed > totalTeams) {
            byes.push(homeSeed);
            awaySeed = null;
        }
        if (homeSeed > totalTeams) {
            byes.push(awaySeed);
            homeSeed = null;
        }
        return {id: null, winner: null, team1: homeSeed, team2: awaySeed}
    }

    function makeLowerOnTop(matchesArray) {
        let temp = [];
        for (let i = 0; i < matchesArray.length; i++) {
            let match = matchesArray[i]
            if (match.team1 == null || match.team2 == null) {
                temp.push(match)
            } else if (match.team1 < match.team2) {
                temp.push(match)
            } else {
                temp.push({...match, team1: match.team2, team2: match.team1})
            }
        }
        return temp;
    }

    // Given the desired number of rounds, returns the properly seeded first round
    //  with 2^numRounds teams in it
    // Time complexity: O(m*(m/2))
    function seedTeams(numRounds, roundID, numNonPlaceholderTeams, lastRoundByeTeams) {
        console.log(
            `Seeding teams: ${numRounds} rounds, ${numNonPlaceholderTeams} non-placeholder teams`)
        // The bracket tree gets built off the root [1,2]
        let matches = [{team1: 1, team2: 2}];
        let byes = [];
        for (let round = 1; round < numRounds; round++) {
            let curRoundMatches = [];
            let targetSum = Math.pow(2, round + 1) + 1;
            // Whether to add the two feeder matches from this iteration to the right or to the left.
            // Made this a number instead of boolean in case I want to change it to every 4 rather than two
            let pushToRight = 0;
            // For each match in this round, create the two matches in the previous round that feed
            // into it
            for (let i = 0; i < matches.length; i++) {
                let firstMatch = createMatch2(matches[i].team1, targetSum - matches[i].team1,
                                              numNonPlaceholderTeams, byes);
                let secondMatch = createMatch2(targetSum - matches[i].team2, matches[i].team2,
                                               numNonPlaceholderTeams, byes)
                curRoundMatches.push(firstMatch, secondMatch)
                pushToRight = !pushToRight;
            }
            matches = curRoundMatches;
            console.log(`Matches in round ${round}: `, curRoundMatches)
        }
        // Byes created = byes - lastRoundByeTeams
        let byesCreated = byes.filter(x => !lastRoundByeTeams.includes(x));
        console.log("Last round's bye teams:", lastRoundByeTeams, "This round's bye teams:", byesCreated)
        console.log("Matches pre-processing:", matches)
        // Right now, each Team in a Match is just an Int. This converts them to actual Team objects
        // Go through every match and put the lower seed on top, for aesthetic purposes
        matches = makeLowerOnTop(matches)
        console.log("Matches post-processing:", matches)
        let newMatches = convertToTeamObject(matches)
        return [newMatches, byesCreated];
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
            function buildRoundRecursive(teamsInCurRound, curRoundIdx, lastRoundByeTeams) {
                console.log(`BUILDING ROUND ${curRoundIdx} with teams `, teamsInCurRound, "Bye teams from last round", lastRoundByeTeams)
                //Number of non-placeholder teams = number of bye teams.
                //  Unless it's the first round, where it = number of teams in current round
                let numNonPlaceholderTeamsInRound = lastRoundByeTeams.length;
                if (curRoundIdx === 0) {
                    numNonPlaceholderTeamsInRound = teamsInCurRound.length;
                }
                let seedTeamsResult = seedTeams(totalRounds - curRoundIdx,
                                                curRoundIdx, numNonPlaceholderTeamsInRound,
                                                lastRoundByeTeams)
                // Matches initial will always be a power of 2
                let initialMatches = seedTeamsResult[0];
                let curByeTeams = seedTeamsResult[1];
                // Assign match IDs sequentially
                // TODO: This works, but now we need to assign nextMatchIDs
                initialMatches.map((match) => {
                    match.id = matchIDCounter++;
                    return match;
                })
                // let nextMatchID = 0;
                // for (let i = 0; i < matchesInitial.length; i++) {
                //     matchesInitial[i].nextMatchId = matchesInitial.length + i + nextMatchID;
                //     // Increase next ID every 2 matches
                //     if (i % 2 === 0) {
                //         nextMatchID++;
                //     }
                // }
                // TODO: why is byeteamsfromlastround not empty??
                console.log("Matches initial", initialMatches, "Bye teams", curByeTeams)
                // Remove byes from current round, or convert matches to placeholders
                let curMatches = processMatches(initialMatches, curRoundIdx, lastRoundByeTeams);
                // Create placeholder teams for (or add bye teams to) next round
                let nextRoundTeams = getNextRoundTeams(initialMatches, curRoundIdx);
                console.log("Matches actual: ", curMatches)
                console.log("Next round teams: ", nextRoundTeams, "Bye teams", curByeTeams)
                // Recurse if this isn't the finals
                let nextRound;
                if (initialMatches.length > 1) {
                    nextRound = buildRoundRecursive(nextRoundTeams, curRoundIdx + 1, curByeTeams);
                }
                return {roundNum: curRoundIdx, matches: curMatches, nextRound: nextRound}
            }

            bracket = buildRoundRecursive(teams, 0, []);
        }
        return bracket;
    }

    // nextRoundTeams logic:
    //  Round 1: Teams with byes get placed into nextRoundTeams - in order
    //  Round 2-n: nextRoundTeams is an array of nulls, of length (num teams in round / 2)
    function getNextRoundTeams(matches, roundIdx) {
        let nextRoundTeams = [];
        if (roundIdx === 0) {
            for (let i = 0; i < matches.length; i++) {
                let team1 = matches[i].team1;
                let team2 = matches[i].team2;
                // If one of the teams in this match is null, it's a bye match, so advance the other one
                if (team1 === null) {
                    nextRoundTeams.push(team2)
                } else if (team2 === null) {
                    nextRoundTeams.push(team1)
                } else { //Otherwise, push one team per match
                    nextRoundTeams.push(null);
                }
            }
        } else {
            for (let i = 0; i < matches.length / 2; i++) {
                nextRoundTeams.push(null);
            }
        }
        return nextRoundTeams;
    }

    function roundUpToNearestPowerOfTwo(number) {
        return Math.pow(2, Math.ceil(Math.log2(number)));
    }

    // Takes in the initial matches and processes them, returning the actual current-round matches
    // curMatches logic:
    //  Round 1: Remove any matches with bye teams, keep the rest as is
    //  Round 2: Turn each match into a placeholder, unless it's a bye match - keep those as is
    //  Round 3-n: Turn each match into a placeholder
    function processMatches(matches, roundIdx, byeTeamsFromLastRound) {
        let curMatches = [];
        for (let i = 0; i < matches.length; i++) {
            let match = matches[i];
            let team1 = match.team1;
            let team2 = match.team2;
            if (roundIdx === 0) { //Round 1: remove matches with null values, these are byes
                if (team1 === null) {
                    continue
                } else if (team2 === null) {
                    continue
                } else {
                    curMatches.push(match);
                }
            } else if (roundIdx === 1) { //Round 2
                // This if statement should fine bye matches from last round
                let team1IsByeTeam = team1 !== null && byeTeamsFromLastRound.includes(team1.id + 1);
                let team2IsByeTeam = team2 !== null && byeTeamsFromLastRound.includes(team2.id + 1);
                // Adjust by 1 since seeds are 1-indexed, IDs are 0-indexed
                if (team1IsByeTeam || team2IsByeTeam) {
                    console.log()
                    curMatches.push(match);
                } else {
                    curMatches.push(convertMatchToPlaceholder(match));
                }
            } else {
                curMatches.push(convertMatchToPlaceholder(match))
            }
        }
        return curMatches;
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