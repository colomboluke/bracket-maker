import {animatedMovies, testBracket1} from "./TestJSON.mjs";
import {getVoteCounts} from "../Utils.mjs";

// ~~ Dissent from group ~~
// Explanation: Who disagreed from the group the most, who had the "hottest takes"
// Algo: For each voter, for each match, give the voter +1 score for each other voter who voted
//  for the opposite contender. Highest score -> highest dissent
// Chart: Vertical bar chart

// ~~ Voter similarity ~~
// Explanation: Which pair of voters were the most similar
// Algo: For each pair of voters, for each match, give the pair +1 score if they were on the same
//  side. Highest score -> most similar
//  Number of pairs = n(n-1) / 2
// Chart: ranked table

// ~~ Contender Margin of Victory ~~
// Explanation: Which contenders won easily each round, which ones barely scraped by
// Algo: For each team, start a count of how many total votes were cast in favor of this team,
//  how many against. Iterate through every single match, updating these counts. Calculate the % of
//  votes for for each team at the end.
// Chart: Horizontal bar chart
function marginOfVictory(bracket) {
    return marginOfVictoryAcc(bracket, {}, []);
}

function marginOfVictoryAcc(bracket, totalCounts, teamIDsSeen) {
    const curMatches = bracket.matches;
    // First pass: initialize hashmap (only necessary for first two rounds)
    if (bracket.roundID < 2) {
        curMatches.forEach(match => {
            if (!teamIDsSeen.includes(match.team1.id)) { //haven't seen team1 yet
                totalCounts[match.team1.name] = {"for": 0, "against": 0};
            }
            if (!teamIDsSeen.includes(match.team2.id)) { //haven't seen team2 yet
                totalCounts[match.team2.name] = {"for": 0, "against": 0};
            }
            teamIDsSeen.push(match.team1.id, match.team2.id);
        })
    }
    // Second pass: count votes for, votes against
    curMatches.forEach(match => {
        const counts = getVoteCounts(match.votes);
        // Add to running count for team 1
        totalCounts[match.team1.name].for += counts.team1;
        totalCounts[match.team1.name].against += counts.team2;
        // Add to running count for team 2
        totalCounts[match.team2.name].for += counts.team2;
        totalCounts[match.team2.name].against += counts.team1;
    })
    //Recurse or return counts if this is last return
    if (bracket.nextRound) {
        return marginOfVictoryAcc(bracket.nextRound, totalCounts, teamIDsSeen);
    } else {
        return totalCounts;
    }
}

function formatResult(counts) {
    for (const contender in counts) {
        counts[contender].total = counts[contender].for + counts[contender].against;
    }
    return counts;
}



console.log("\n\nResult:\n", formatResult(marginOfVictory(animatedMovies)))