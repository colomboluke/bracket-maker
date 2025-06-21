import Bracket from "./Bracket.mjs";

export function parseDatabaseRecord(bracketData) {
    const metaData = {title: bracketData[0].title, desc: bracketData[0].b_desc}
    let bracket = parseRecursive(bracketData, 0)
    return [metaData, bracket]
}

function parseRecursive(bracketData, roundNum) {
    if (roundNum >= bracketData.length) { //iterated over all rounds
        return null;
    }
    const curMatches = bracketData[roundNum].matches
    return new Bracket(roundNum, curMatches, parseRecursive(bracketData, roundNum + 1))
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
