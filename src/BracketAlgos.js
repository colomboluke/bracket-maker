// TODO: make a match class? would be easier to have getters/setters

// Given a bracket object and a match ID, return the match corresponding to that ID
export function getMatch(bracket, targetID) {
    // Base case. Null bracket -> return null
    if (bracket === null || bracket === undefined) {
        return null;
    }
    // If the target match exists in this round, return it
    let curMatches = bracket.matches;
    for (let i = 0; i < curMatches.length; i++) {
        if (curMatches[i].id === targetID) {
            return curMatches[i]; //return the target match
        }
    }
    // Otherwise, recurse on next round
    return getMatch(bracket.nextRound, targetID);
}

// Replace an existing Match in the Bracket with a new one
// Private function - do not export!
function setMatch(bracket, targetID, newMatch) {
    // Base case. Null bracket -> return null
    if (bracket === null || bracket === undefined) {
        return null;
    }
    // If the target match exists in this round, update it
    let curMatches = bracket.matches;
    for (let i = 0; i < curMatches.length; i++) {
        if (curMatches[i].id === targetID) {
            curMatches[i] = newMatch;
            return bracket; //return the bracket after updating match
        }
    }
    // Otherwise, recurse on next round
    return {...bracket, nextRound: setMatch(bracket.nextRound, targetID, newMatch)};
}

// Replaces the given Match's votes array with a new array
export function updateVotes(bracket, matchID, newVoteArr) {
    let oldMatch = getMatch(bracket, matchID);
    return setMatch(bracket, matchID, {...oldMatch, votes: newVoteArr});
}


/**
 * Sets the winner of a Match, and advances the winning Team to the next round
 * @param bracket
 * @param matchID
 * @param winner t
 * @returns {any}
 */
export function updateMatchWinner(bracket, matchID, winner) {
    console.log(`Updating match ${matchID} to have winner ${winner}`)
    let oldMatch = getMatch(bracket, matchID);
    let newBracket = {...bracket};
    if (winner !== oldMatch.winner) { //this match has a new winner
        // Update the target match's winner
        let newMatch = {...oldMatch, winner: winner}
        newBracket = setMatch(newBracket, matchID, newMatch);
        // Update the next round accordingly
        let nextRoundMatch = getMatch(bracket, oldMatch.nextMatchID);
        let winnerTeam; //winner as a Team object
        if (winner === 0) {
            winnerTeam = oldMatch.team1;
        } else if (winner === 1) {
            winnerTeam = oldMatch.team2;
        } else {
            throw new Error(`Winner ID ${winner} must be either 0 or 1. Found: ${winner}`)
        }
        if (oldMatch.nextStatus === 0) { //becomes 'home' team for its next match
            nextRoundMatch = {...nextRoundMatch, team1: winnerTeam}
        } else if (oldMatch.nextStatus === 1) { //becomes 'away' team
            nextRoundMatch = {...nextRoundMatch, team2: winnerTeam}
        } else {
            throw new Error(`Next statuses should be only 0 or 1. Found: ${oldMatch.nextStatus}`)
        }
        newBracket = setMatch(newBracket, nextRoundMatch.id, nextRoundMatch)
    }
    return newBracket;
}

// ~~~ BRACKET CREATING ALGO ~~~

function getPresetBracket(teams) {
    if (teams.length === 0) {
        return {roundNum: 0, matches: [], nextRound: null};
    } else if (teams.length === 1) {
        return {
            roundNum: 0, matches: [{
                id: 0, winner: null, team1: teams[0],
                team2: null, nextMatchID: null
            }], nextRound: null
        }
    } else if (teams.length === 2) {
        return {
            roundNum: 0, matches: [{
                id: 0, winner: null, team1: teams[0],
                team2: teams[1], nextMatchID: null
            }], nextRound: null
        }
    } else if (teams.length === 3) {
        return {
            roundNum: 0,
            matches: [{id: 0, winner: null, team1: null, team2: null, nextMatchID: null},
                {id: 1, winner: null, team1: teams[1], team2: teams[2], nextMatchID: 1}],
            nextRound: {
                roundNum: 1, matches: [{
                    id: 1, winner: null, team1: teams[0], team2: null, nextMatchID: null
                }], nextRound: null
            }
        }
    }
}

// Bracket creating algorithm (4+ teams):
// 1. Seed teams in the correct order, creating Match objects as we go
//      a) This algorithm starts with a 'root' of [1,2], representing the two seeds expected to make
//      the finals. It then expands each seed into the two seeds that feed into it during the
//      previous round. 1 turns into [1,4], 2 turns into [3,2]. Both of these add up to 5. When
//      creating these feeder matches, the original seed alternates its placement: first left, then
//      right, etc. If a team should have a bye, that's represented as it playing against a null
//      opponent. his repeats for n number of rounds. Final result: a properly seeded, full bracket
//      with n rounds.
// 2. Sort matches so that lower team is always home
// 3. Convert each Int inside the Match to a Team
//      a) Before this stage, each 'team' was just an integer. [1,2] would be the match between the
//      1 and two seeds.
// 4. Assign match IDs to these initial matches
//      a) Initial match ID: simple increment by 1
//      b) Next match ID (the ID of the match that winner of this one will play in): ID of first
//      match in this round + number of matches in this round, increment every 2 matches
// 5. Post-process the initial matches: handle byes here
//      a) The initial matches created in steps 1-4 assume a 'full' bracket. So if we have anywhere
//      from 5-8 teams, it will create a bracket with 8 teams. This algo detects bye matches in
//      round 1 and transfers them to round 2. All other matches in rounds 2-n get turned into
//      placeholders (null vs null).
// 6. Create placeholders for next round's matches, advancing any bye matches
//      a) If the current round has n matches, next round should have n/2, except round 2, if we
//         have bye teams.
// 7. Repeat steps 1-6 for the next round if necessary
//      a) We recurse until we are left with 1 match.


/**
 * Constructs a bracket object from the current teams state
 * @returns a recursive bracket object {roundNum, matches, nextRound}
 */
export function constructBracket(teams) {
    let totalRounds = getNumOfRounds(teams.length);
    let bracket; // 0 teams => there is no bracket
    if (teams.length === 0) {
        bracket = getPresetBracket(teams);
    } else if (teams.length === 1) { // 1 team => one round with one (incomplete) match
        bracket = getPresetBracket(teams);
    } else if (teams.length === 2) { //2 teams => same as round 1 but with one complete match
        bracket = getPresetBracket(teams);
    } else if (teams.length === 3) { //Hardcoding 3 teams since it was an edge case to the seeding algo
        bracket = getPresetBracket(teams);
    } else {  // MAIN CASE: 4+ teams
        //roundNum = 0 indexed, first round = 0
        let matchIDCounter = 0;
        bracket = buildRoundRecursive(teams, 0, []);
        // Teams in round: array containing Team objects
        function buildRoundRecursive(teamsInCurRound, curRoundIdx, lastRoundByeTeams) {
            //Number of non-placeholder teams = number of bye teams, unless it's the first
            // round, where it = number of teams in current round
            let numNonPlaceholderTeams = lastRoundByeTeams.length;
            if (curRoundIdx === 0) {
                numNonPlaceholderTeams = teamsInCurRound.length;
            }
            let seedTeamsResult = seedTeams(totalRounds - curRoundIdx, curRoundIdx,
                                            numNonPlaceholderTeams, lastRoundByeTeams, teams);
            let initialMatches = seedTeamsResult[0];
            let curByeTeams = seedTeamsResult[1];
            initialMatches = assignMatchIDs(structuredClone(initialMatches));
            let curMatches = processMatches(initialMatches, curRoundIdx, lastRoundByeTeams);
            let nextRoundTeams = getNextRoundTeams(initialMatches, curRoundIdx);
            // Recurse if this isn't the finals
            let nextRound;
            if (initialMatches.length > 1) {
                nextRound = buildRoundRecursive(nextRoundTeams, curRoundIdx + 1, curByeTeams);
            }
            return {roundNum: curRoundIdx, matches: curMatches, nextRound: nextRound}
        }
        // Assign matches their own IDs, and the IDs of the matches they feed into
        // NOTE: this function has to be in the same scope as buildRoundRecursive to sync matchIDs
        function assignMatchIDs(matchesArr) {
            // Assign standard match IDs (simple increment)
            let matchesWithIDs = matchesArr.map((match) => {
                match.id = matchIDCounter;
                matchIDCounter++;
                return match;
            });
            // Assign next match IDs. Next match ID = ID of first match in this round + number of
            //  matches in this round, increment every 2 matches
            // Also assign nextStatuses: 0 if i is even 1 if odd
            for (let i = 0; i < matchesWithIDs.length; i++) {
                matchesWithIDs[i].nextMatchID =
                    matchesWithIDs[0].id + matchesWithIDs.length + Math.floor(i / 2);
                matchesWithIDs[i].nextStatus = i % 2;
            }
            return matchesWithIDs
        }
    }
    return bracket;
}

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

// Given the desired number of rounds, returns the properly seeded first round
//  with 2^numRounds teams in it
// Time complexity: O(m*(m/2))
function seedTeams(numRounds, roundID, numNonPlaceholderTeams, lastRoundByeTeams, teams) {
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
    }
    // Byes created = byes - lastRoundByeTeams (set difference)
    let byesCreated = byes.filter(x => !lastRoundByeTeams.includes(x));
    matches = makeLowerOnTop(matches);
    matches = convertToTeamObject(matches, teams);
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
    return {id: null, winner: null, team1: homeSeed, team2: awaySeed, votes: [0, 0]};
}

// Given an array of matches, ensure that the lower seed (higher ranked) goes first
function makeLowerOnTop(matchesArray) {
    let output = [];
    for (let i = 0; i < matchesArray.length; i++) {
        let match = matchesArray[i]
        // No change needed
        if (match.team1 == null || match.team2 == null || match.team1 < match.team2) {
            output.push(match);
        } else {    //swap order of teams
            output.push({...match, team1: match.team2, team2: match.team1})
        }
    }
    return output;
}

// Convert each match from a list of two Ints to a list of two Teams (id, name, votes)
// Finds the Team objects from teams variable and chooses the one with the corresponding ID
// If a team is null, that means it's either a bye or this is a placeholder match: either way,
// no need to make a change
function convertToTeamObject(matchesList, teams) {
    return matchesList.map(match => {
        // Match IDs from seeding algo are 1-indexed, have to adjust
        let homeTeam = match.team1;
        if (homeTeam !== null) {
            homeTeam = teams.filter(team => team.id + 1 === match.team1)[0];
        }
        let awayTeam = match.team2;
        if (awayTeam !== null) {
            awayTeam = teams.filter(team => team.id + 1 === awayTeam)[0];
        }
        return {...match, team1: homeTeam, team2: awayTeam};
    });
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
    return {...match, team1: null, team2: null};

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
        //     Why does this push one term per two matches? Honestly forget why this works
    } else { //Round 2+
        for (let i = 0; i < matches.length / 2; i++) {
            nextRoundTeams.push(null);
        }
    }
    return nextRoundTeams;
}