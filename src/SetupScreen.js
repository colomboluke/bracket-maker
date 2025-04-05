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

    let [bracket, setBracket] = useState({roundNum: 0, matches: [], nextRound: {}});
    // Update bracket whenever teams change
    useEffect(() => {
        console.log("Updating teams", teams)
        newConstructBracket();
        console.log("Updating bracket b/c teams changed", bracket)
    }, [teams]);

    // Making matchIDCounter a global variable - I think it doesn't need to be state because I
    // actually want it to reset after re-renders
    let matchIDCounter = 0;

    // ~~~~ Modifying State Functions ~~~~

    // Give a team a new name
    function updateTeam(index, newName) {
        setTeams(prevTeams => {
            const updatedTeams = [...prevTeams];
            updatedTeams[index] = {...updatedTeams[index], name: newName};
            return updatedTeams;
        });
    }

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
        setTeams([...teams, {id: teams.length, name: newName, votes: 0}]);
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
        // TODO: Why is this not updating the state??
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

    // ~~~~ Creating Bracket Functions ~~~~

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

    const emptyBracket = {roundNum: 0, matches: [], nextRound: null};
    const oneTeamBracket = {
        roundNum: 0, matches: [{
            id: 0, winner: null, team1: teams[0],
            team2: null, nextMatchID: null
        }], nextRound: null
    };
    const twoTeamBracket = {
        roundNum: 0, matches: [{
            id: 0, winner: null, team1: teams[0],
            team2: teams[1], nextMatchID: null
        }], nextRound: null
    };
    const threeTeamBracket = {
        roundNum: 0,
        matches: [{id: 0, winner: null, team1: null, team2: null, nextMatchID: null},
            {id: 1, winner: null, team1: teams[1], team2: teams[2], nextMatchID: 1}],
        nextRound: {
            roundNum: 1, matches: [{
                id: 1, winner: null, team1: teams[0], team2: null, nextMatchID: null
            }], nextRound: null
        }
    };

    /**
     * Constructs a bracket object from the current teams state
     * @returns a recursive bracket object {roundNum, matches, nextRound}
     */
    function newConstructBracket() {
        let totalRounds = getNumOfRounds(teams.length);
        let bracket; // 0 teams => there is no bracket
        if (teams.length === 0) {
            bracket = emptyBracket
        } else if (teams.length === 1) { // 1 team => one round with one (incomplete) match
            bracket = oneTeamBracket;
        } else if (teams.length === 2) { //2 teams => same as round 1 but with one complete match
            bracket = twoTeamBracket;
        } else if (teams.length === 3) { //Hardcoding 3 teams since it was an edge case to the seeding algo
            bracket = threeTeamBracket;
        } else {  // MAIN CASE: 4+ teams
            //roundNum = 0 indexed, first round = 0
            bracket = buildRoundRecursive(teams, 0, []);
            // Teams in round: array containing Team objects
            function buildRoundRecursive(teamsInCurRound, curRoundIdx, lastRoundByeTeams) {
                // console.log(`BUILDING ROUND ${curRoundIdx} with teams `, teamsInCurRound,
                //             "Bye teams from last round", lastRoundByeTeams)
                //Number of non-placeholder teams = number of bye teams, unless it's the first
                // round, where it = number of teams in current round
                let numNonPlaceholderTeams = lastRoundByeTeams.length;
                if (curRoundIdx === 0) {
                    numNonPlaceholderTeams = teamsInCurRound.length;
                }
                let seedTeamsResult = seedTeams(totalRounds - curRoundIdx, curRoundIdx,
                                                numNonPlaceholderTeams, lastRoundByeTeams);
                let initialMatches = seedTeamsResult[0];
                let curByeTeams = seedTeamsResult[1];
                initialMatches = newAssignMatchIDs(initialMatches);
                let curMatches = processMatches(initialMatches, curRoundIdx, lastRoundByeTeams);
                let nextRoundTeams = getNextRoundTeams(initialMatches, curRoundIdx);
                // Recurse if this isn't the finals
                let nextRound;
                if (initialMatches.length > 1) {
                    nextRound = buildRoundRecursive(nextRoundTeams, curRoundIdx + 1, curByeTeams);
                }
                return {roundNum: curRoundIdx, matches: curMatches, nextRound: nextRound}
            }
        }
        setBracket(bracket);
        return bracket;
    }

    // Given the desired number of rounds, returns the properly seeded first round
    //  with 2^numRounds teams in it
    // Time complexity: O(m*(m/2))
    function seedTeams(numRounds, roundID, numNonPlaceholderTeams, lastRoundByeTeams) {
        // console.log(
        //     `Seeding teams: ${numRounds} rounds, ${numNonPlaceholderTeams} non-placeholder
        // teams`)
        // The bracket tree gets built off the root [1,2]
        let matches = [{team1: 1, team2: 2}];
        let byes = [];
        for (let round = 1; round < numRounds; round++) {
            let curRoundMatches = [];
            let targetSum = Math.pow(2, round + 1) + 1;
            // For each match in this round, create the two matches in prev round that feed into it
            for (let i = 0; i < matches.length; i++) {
                let firstMatch = createMatch(matches[i].team1, targetSum - matches[i].team1,
                                             numNonPlaceholderTeams, byes);
                let secondMatch = createMatch(targetSum - matches[i].team2, matches[i].team2,
                                              numNonPlaceholderTeams, byes)
                curRoundMatches.push(firstMatch, secondMatch)
            }
            matches = curRoundMatches;
            // console.log(`Matches in round ${round}: `, curRoundMatches)
        }
        // Byes created = byes - lastRoundByeTeams (set difference)
        let byesCreated = byes.filter(x => !lastRoundByeTeams.includes(x));
        matches = makeLowerOnTop(matches);
        matches = convertToTeamObject(matches);
        return [matches, byesCreated];
    }

    // Total teams = number of non-placeholder teams in this round
    // Creates a Match object representing a game between the home and away seeds
    function createMatch(homeSeed, awaySeed, totalTeams, byes) {
        if (awaySeed > totalTeams) {
            byes.push(homeSeed);
            awaySeed = null;
        }
        if (homeSeed > totalTeams) {
            byes.push(awaySeed);
            homeSeed = null;
        }
        return {id: null, winner: null, team1: homeSeed, team2: awaySeed};
    }

    // Given an array of matches, ensure that the lower seed (higher ranked) goes first
    function makeLowerOnTop(matchesArray) {
        let temp = [];
        for (let i = 0; i < matchesArray.length; i++) {
            let match = matchesArray[i]
            // No change needed
            if (match.team1 == null || match.team2 == null || match.team1 < match.team2) {
                temp.push(match);
            } else {    //swap order of teams
                temp.push({...match, team1: match.team2, team2: match.team1})
            }
        }
        return temp;
    }

    // Convert each match from a list of two Ints to a list of two Teams (id, name, votes)
    // Finds the Team objects from teams variable and chooses the one with the corresponding ID
    // If a team is null, that means it's either a bye or this is a placeholder match: either way,
    // no need to make a change
    function convertToTeamObject(matchesList) {
        // console.log("Before", matchesList)
        // TODO: How/why tf is this method assigning IDs and nextMatchIDs? It doesn't happen when
        //  I comment out newAssignMatchIDs()
        // ^^ I mean it works but idk why
        let returnVal = matchesList.map((match) => {
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
        // console.log("After", returnVal)
        return returnVal;
    }

    // Assign matches their own IDs, and the IDs of the matches they feed into
    function newAssignMatchIDs(matchesArr) {
        // Assign standard match IDs (simple increment)
        let matchesWithIDs = matchesArr.map((match) => {
            match.id = matchIDCounter++;
            return match;
        });
        // Assign next match IDs. Next match ID = ID of first match in this round + number of
        //  matches in this round, increment every 2 matches
        for (let i = 0; i < matchesWithIDs.length; i++) {
            matchesWithIDs[i].nextMatchID =
                matchesWithIDs[0].id + matchesWithIDs.length + Math.floor(i / 2);
        }
        return matchesWithIDs
    }

    // Takes in the initial matches and processes them, returning the actual current-round matches
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
                if (team1 !== null && team2 !== null) {
                    curMatches.push(match);
                } else {
                    // Bye matches are kept as placeholders, for ease of rendering
                    curMatches.push(convertMatchToPlaceholder(match));
                }
            } else if (roundIdx === 1) { //Round 2
                // Find which teams were bye teams from last round (adjust by 1 for indexing)
                let team1IsByeTeam = team1 !== null && byeTeamsFromLastRound.includes(team1.id + 1);
                let team2IsByeTeam = team2 !== null && byeTeamsFromLastRound.includes(team2.id + 1);
                if (team1IsByeTeam || team2IsByeTeam) {
                    curMatches.push(match);
                } else {
                    curMatches.push(convertMatchToPlaceholder(match));
                }
            } else { //Rounds 3+
                curMatches.push(convertMatchToPlaceholder(match))
            }
        }
        return curMatches;
    }

    // Makes both teams null, keeps everything else the same
    function convertMatchToPlaceholder(match) {
        return {
            id: match.id,
            winner: match.winner,
            team1: null,
            team2: null,
            nextMatchID: match.nextMatchID
        }
    }

    // nextRoundTeams logic:
    //  Round 1: Teams with byes get placed into nextRoundTeams - in order
    //  Round 2-n: nextRoundTeams is an array of nulls, of length (num teams in round / 2)
    function getNextRoundTeams(matches, roundIdx) {
        let nextRoundTeams = [];
        if (roundIdx === 0) { //Round 1
            for (let i = 0; i < matches.length; i++) {
                let team1 = matches[i].team1;
                let team2 = matches[i].team2;
                // If one of the teams is null, it's a bye match, so advance the other one
                if (team1 === null) {
                    nextRoundTeams.push(team2)
                } else if (team2 === null) {
                    nextRoundTeams.push(team1)
                } else {    //Otherwise, push one team per match
                    nextRoundTeams.push(null);
                }
            }
        } else { //Round 2+
            for (let i = 0; i < matches.length / 2; i++) {
                nextRoundTeams.push(null);
            }
        }
        return nextRoundTeams;
    }

    return (
        <div className={"setup-cont"}>
            <div className={"setup-left"}>
                <button onClick={() => {
                    console.log("BRACKET:", bracket)
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