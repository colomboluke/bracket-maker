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
        let oldMatch = this.getMatch(targetID); //match to be updated
        if (winnerInt !== oldMatch.winner) { //if match has a new winner
            // Update the old match's winner field
            const newMatch = oldMatch.cleanCopy({winner: winnerInt});
            this.setMatch(newMatch);

            // Advance the winning Team to the next round (if there is a next round)
            let nextRoundMatch = this.getMatch(oldMatch.nextMatchID);
            if (nextRoundMatch) {
                let winnerTeam; //winnerInt as a Team object
                if (winnerInt === 1) {
                    winnerTeam = oldMatch.team1;
                } else if (winnerInt === 2) {
                    winnerTeam = oldMatch.team2;
                } else {
                    throw new Error(`Winner must be either 1 or 2. Found: ${winnerInt}`)
                }
                if (oldMatch.nextStatus === 0) {
                    nextRoundMatch = nextRoundMatch.cleanCopy({team1: winnerTeam});
                } else if (oldMatch.nextStatus === 1) {
                    nextRoundMatch = nextRoundMatch.cleanCopy({team2: winnerTeam});
                }
                this.setMatch(nextRoundMatch);
            }
        }
    }

}