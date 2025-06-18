export default class Bracket {
    /**
     * @param roundID Int
     * @param matches Match[]
     * @param nextRound Bracket
     */
    constructor(roundID, matches, nextRound = null) {
        this.roundID = roundID;
        this.matches = matches;
        this.nextRound = nextRound;
    }

    // Creates a shallow copy, mimicking the spread operator
    cleanCopy({roundID = this.roundID, matches = this.matches, nextRound = this.nextRound} = {}) {
        return new Bracket(roundID, matches, nextRound);
    }

    /**
     * Print this bracket to stdout
     */
    log() {
        console.log(`Round ${this.roundID}`, this.matches); //do something to every match in this
                                                            // round
        if (this.nextRound) { //if there's a next round, recurse
            this.nextRound.log();
        } else {              //otherwise, we're done
            console.log("Done")
        }
    }

    /**
     * Find a match using its ID
     */
    getMatch(targetID) {
        for (let i = 0; i < this.matches.length; i++) { //search for match in current round
            if (this.matches[i].id === targetID) {
                return this.matches[i];
            }
        }
        if (this.nextRound) {                       // recurse
            return this.nextRound.getMatch(targetID);
        } else {
            return null;                            // match not found
        }
    }

    getTeam(teamID) {
        for (let i = 0; i < this.matches.length; i++) {
            if (this.matches[i].team1 && this.matches[i].team1.id === teamID) {
                return this.matches[i].team1;
            }
            if (this.matches[i].team2 && this.matches[i].team2.id === teamID) {
                return this.matches[i].team2;
            }
        }
        if (this.nextRound) {                       // recurse
            return this.nextRound.getTeam(teamID);
        } else {
            return null;                            // Team not found
        }
    }

    /**
     * Replace an existing match with a new one
     * The new match must have the same ID as the old one
     * @param newMatch
     */
    setMatch(newMatch) {
        for (let i = 0; i < this.matches.length; i++) { //search & replace match in current round
            if (this.matches[i].id === newMatch.id) {
                this.matches[i] = newMatch;
            }
        }
        if (this.nextRound) {                       // recurse
            this.nextRound.setMatch(newMatch);
        }
    }

    initializeVoterObjects(voterArray) {
        // Get the votes object which we will assign to every match.votes
        let voterNameArr = voterArray.map(elem => {
            return elem.name;
        })
        let votesObj = {};
        voterNameArr.forEach(elem => {
            votesObj[elem] = 0;
        })
        for (let i = 0; i < this.matches.length; i++) {
            // Create a copy! Otherwise, all matches will have the same votes object
            this.matches[i].votes = {...votesObj};
        }
        if (this.nextRound) {
            this.nextRound.initializeVoterObjects(voterArray);
        }
    }

    /**
     * Sets the winner of a Match, and advances the winning Team to the next round
     * @param targetID ID of the match whose winner is being updated
     * @param winnerInt 0 or 1, referring to team1 or team2 winning the match
     */
    handleMatchWinner(targetID, winnerInt) {
        const oldMatch = this.getMatch(targetID); //match to be updated
        if (winnerInt !== oldMatch.winner) { //if match has a new winner
            // Update the old match's winner field
            const newMatch = oldMatch.cleanCopy({winner: winnerInt});
            this.setMatch(newMatch);

            // Advance the winning Team to the next round (if there is a next round)
            let nextRoundMatch = this.getMatch(oldMatch.nextMatchID);
            if (nextRoundMatch) {
                let winnerTeam = getWinnerTeamObject(winnerInt, oldMatch);
                // Update team1/team2 depending on which one corresponds to the winner of oldMatch
                if (oldMatch.nextStatus === 0) {
                    nextRoundMatch = nextRoundMatch.cleanCopy({team1: winnerTeam});
                } else if (oldMatch.nextStatus === 1) {
                    nextRoundMatch = nextRoundMatch.cleanCopy({team2: winnerTeam});
                }
                this.setMatch(nextRoundMatch);
            }
        }
    }

    // I could combine this into handleMatchWinner and just have it be a winnerInt of -1 or null
    handleMatchReset(targetID) {
        // Reset the target match's winner
        const oldMatch = this.getMatch(targetID);
        // TODO: why does this work even if I don't reset votes here?
        this.setMatch(oldMatch.cleanCopy({winner: null}));

        //Reset the next match's teams
        let nextRoundMatch = this.getMatch(oldMatch.nextMatchID);
        this.resetFutureRounds(nextRoundMatch, oldMatch);
    }

    // Resets next round's match and all future rounds
    resetFutureRounds(curMatch, oldMatch) {
        if (!curMatch || (curMatch.team1 === null && curMatch.team2 === null)) {
            return;
        }
        if (oldMatch.nextStatus === 0) {
            curMatch = curMatch.cleanCopy({team1: null})
        } else if (oldMatch.nextStatus === 1) {
            curMatch = curMatch.cleanCopy({team2: null})
        }
        this.setMatch(curMatch);
        //Recurse
        let nextMatch = this.getMatch(curMatch.nextMatchID);
        this.resetFutureRounds(nextMatch, curMatch);
    }

    // Counts how many total non-bye matches are in this bracket
    countMatches() {
        return this.countMatchesAcc(0);
    }

    // Accumulator function
    countMatchesAcc(count) {
        this.matches.forEach(match => {
            if (this.roundID === 0) {   //if this is round 1, don't count bye matches
                if (match.team1 !== null && match.team2 !== null) {
                    count++;
                }
            } else {                    //otherwise, count every match
                count++;
            }
        });
        // console.log(`Count after round ${this.roundID}: ${count}`);
        if (this.nextRound) {                       // recurse
            return this.nextRound.countMatchesAcc(count);
        } else {                                    //return count if this is the last round
            return count;
        }
    }

    // Counts the number of matches who have a non-null winner
    countCompleteMatches() {
        return this.countCompleteMatchesAcc(0);
    }

    countCompleteMatchesAcc(count) {
        this.matches.forEach(match => {
            if (match.winner !== null) { //count any match with a winner
                count++;
            }
        });
        if (this.nextRound) {
            return this.nextRound.countCompleteMatchesAcc(count);
        } else {
            return count;
        }
    }

    resetAllVotes() {
        this.matches.forEach(match => {
            // Set the counts for each voter to 0 (indicating they haven't voted)
            for (const property in match.votes) {
                match.votes[property] = 0;
            }
            this.handleMatchReset(match.id);
        })
        if (this.nextRound) {
            this.nextRound.resetAllVotes();
        }
    }

}

// Static/util function
// Turn winnerInt into a Team object
function getWinnerTeamObject(winnerInt, match) {
    if (winnerInt === 1) {
        return match.team1;
    } else if (winnerInt === 2) {
        return match.team2;
    } else {
        throw new Error(`Winner must be either 1 or 2. Found: ${winnerInt}`)
    }
}