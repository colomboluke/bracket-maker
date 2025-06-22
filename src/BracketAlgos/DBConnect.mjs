import Bracket from "./Bracket.mjs";
import Team from "./Team.mjs";
import Match from "./Match.mjs";

// Takes in the JSON of a matches array and turns it into an actual array of Match and Team objects
function parseMatchArray(matchesArr) {
    let result = []
    matchesArr.forEach(match => {
        let team1;
        let team2;
        if (match.team1) {
            team1 = new Team(match.team1.id, match.team1.name, match.team1.position, match.team1.image)
        }
        if (match.team2) {
            team2 = new Team(match.team2.id, match.team2.name, match.team2.position, match.team2.image)
        }
        result.push(new Match(match.id, match.winner, team1, team2, match.nextMatchID, match.votes, match.nextStatus))
    })
    return result;
}

// Applies parseMatchArray to each round in the bracket
export function parseMatchArrRecursive(bracket) {
    if (bracket) {
        bracket.matches = parseMatchArray(bracket.matches);
        parseMatchArrRecursive(bracket.nextRound);
    }
    return bracket;
}

// Turns a SQL record into a JSON object
export function importBracket(bracketData) {
    const metaData = {title: bracketData[0].title, desc: bracketData[0].b_desc}
    let bracket = importBracketHelper(bracketData, 0)
    return [metaData, bracket]
}

function importBracketHelper(bracketData, roundNum) {
    if (roundNum >= bracketData.length) { //iterated over all rounds
        return null;
    }
    const curMatches = bracketData[roundNum].matches
    return new Bracket(roundNum, curMatches, importBracketHelper(bracketData, roundNum + 1))
}

// Given a bracket, return the list of voters
export function getVoterInfo(bracket) {
    const voterNameList = Object.keys(bracket.matches[0].votes)
    const voterList = [...voterNameList]
    for (let i = 0; i < voterList.length; i++) {
        voterList[i] = {name: voterNameList[i], id: i}
    }
    return voterList
}

// Turns a JSON object into a SQL record
export function exportBracket(bracket) {
    return exportBracketHelper(bracket, []);
}

function exportBracketHelper(curRound, array) {
    array.push(curRound.matches)
    if (curRound.nextRound) {
        return exportBracketHelper(curRound.nextRound, array);
    } else {
        return array;
    }
}
