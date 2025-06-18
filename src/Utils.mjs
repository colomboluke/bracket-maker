//Gets the property of the object unless object is null, in which case it returns null
// Also formats the seed to add a period at the end
// This is in Utils so both Matchup and ClickableMatchup can access it
// I should move the formatting logic into Matchup but I don't know how
export function matchupSafeGet(object, property) {
    if (object !== null && object !== undefined) {
        if (property === "position") {
            return object[property] + 1 + ".";
        }
        return object[property];
    }
    return "";
}

// Given a votes object (record of who voted for what), tally the votes for each team
export function getVoteCounts(votesObj) {
    let counts = {team1: 0, team2: 0}
    for (const voter in votesObj) {
        let vote = votesObj[voter]
        if (vote === 1) {//vote for team 1
            counts.team1 += 1;
        } else if (vote === 2) { //vote for team 2
            counts.team2 += 1;
        } else if (vote === 0) {    //someone hasn't voted yet
            return null;
        } else {
            throw new Error(`Votes should only be 0, 1, or 2. Found: ${vote}`);
        }
    }
    return counts;
}

// Filters out any incomplete matches
export function filterOutByes(listOfMatches) {
    return listOfMatches.filter(match => match.team1 && match.team2);
}

// Turns two strings into one, to use as a key
export function convertToStringKey(name1, name2) {
    return `${name1}${name2.slice(0,1).toUpperCase().concat(name2.slice(1))}`
}

// Checks if a given number is a power of 2 or not
export function isPowerOfTwo(x) {
    return (Math.log(x) / Math.log(2)) % 1 === 0;
}
