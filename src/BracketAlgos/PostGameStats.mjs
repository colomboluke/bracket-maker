import {
    animatedMovies,
    popArtists,
    sevenVoters,
    testBracket1,
    testBracketActual,
    voters
} from "./TestJSON.mjs";
import {filterOutByes, getVoteCounts} from "../Utils.mjs";

// ~~ Voter Outlier Score ~~
// Blurb 1: Who disagreed with the group the most, who had the "hottest takes"
// Algo: For each voter, for each match, give the voter +1 score for each other voter who voted
//  for the opposite contender. Highest score -> highest dissent
// Chart: Vertical bar chart
export function voterOutlier(bracket, voters) {
    const counts = []
    voters.forEach((voter, index) => {
        const accResult = voterOutlierAcc(bracket, voter, 0, 0)
        const numMatches = bracket.countMatches()
        counts[index] =
            {
                name: voter.name,
                score: (accResult[0] / (numMatches * voters.length)),
                lossRate: (accResult[1] / numMatches)
            };
        console.log(`${voter.name} done`, counts)
    })
    return counts;
}

function voterOutlierAcc(bracket, voter, voterScore, losses) {
    filterOutByes(bracket.matches).forEach(match => {
        const curVoterChoice = match.votes[voter.name];
        // This match is a loss if the user didn't vote for the winner
        if (curVoterChoice !== match.winner) {
            losses++;
        }
        for (const otherVoter in match.votes) {
            //+1 score for each other voter who voted opposite this one
            if (voter !== otherVoter && match.votes[otherVoter] !== curVoterChoice) {
                voterScore++;
            }
        }
    });
    if (bracket.nextRound) { //recurse
        return voterOutlierAcc(bracket.nextRound, voter, voterScore, losses);
    } else {
        return [voterScore, losses];
    }
}

// console.log(testBracketActual.countMatches())
// console.log("\n\nResult:\n", marginOfVictory(sevenVoters))

// ~~ Voter similarity ~~
// Blurb 1: How often pairs of voters made the same choices
// Algo: For each pair of voters, for each match, give the pair +1 score if they were on the same
//  side. Highest score -> most similar. Divide each score by number of voters * number of matches
//  Number of pairs = n(n-1) / 2
// Chart: ranked table

// ~~ Contender Win Strength ~~
// Blurb 1: Which contenders won easily each round, which ones barely scraped by
// Blurb 2: Percentage of possible votes each contender received across all rounds
// Algo: For each team, start a count of how many total votes were cast in favor of this team,
//  how many against. Iterate through every single match, updating these counts. Calculate the % of
//  votes for for each team at the end.
// Chart: Horizontal bar chart
export function marginOfVictory(bracket) {
    let counts = marginOfVictoryAcc(bracket, [], []);
    for (const contender in counts) {
        counts[contender].total = counts[contender].for + counts[contender].against;
        counts[contender]["percentage"] =
            (counts[contender].for / counts[contender].total).toFixed(2);
    }
    // Sort in descending order of vote percentages
    counts.sort((a, b) => b["percentage"] - a["percentage"])
    // Format as string
    for (const contender in counts) {
        counts[contender]["Win strength"] =
            (counts[contender]["percentage"] * 100).toString().concat("%");
    }
    return counts;
}

function marginOfVictoryAcc(bracket, totalCounts, teamIDsSeen) {
    const curMatchesNoByes = filterOutByes(bracket.matches);
    // First pass: initialize hashmap (only necessary for first two rounds)
    if (bracket.roundID < 2) {
        curMatchesNoByes.forEach(match => {
            if (!teamIDsSeen.includes(match.team1.id)) { //haven't seen team1 yet
                totalCounts[match.team1.id] = {"name": match.team1.name, "for": 0, "against": 0};
            }
            if (!teamIDsSeen.includes(match.team2.id)) { //haven't seen team2 yet
                totalCounts[match.team2.id] = {"name": match.team2.name, "for": 0, "against": 0};
            }
            teamIDsSeen.push(match.team1.id, match.team2.id);
        })
    }
    // Second pass: count votes for, votes against
    curMatchesNoByes.forEach(match => {
        const counts = getVoteCounts(match.votes);
        // Add to running count for team 1
        totalCounts[match.team1.id].for += counts.team1;
        totalCounts[match.team1.id].against += counts.team2;
        // Add to running count for team 2
        totalCounts[match.team2.id].for += counts.team2;
        totalCounts[match.team2.id].against += counts.team1;
    })
    //Recurse or return counts if this is last return
    if (bracket.nextRound) {
        return marginOfVictoryAcc(bracket.nextRound, totalCounts, teamIDsSeen);
    } else {
        return totalCounts;
    }
}

