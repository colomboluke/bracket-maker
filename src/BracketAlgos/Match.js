export default class Match {
    /**
     * @param id Int
     * @param winner Int, either 0 or 1, representing team1 or team2 winning this match. Used to
     *      avoid unnecessary updates to the bracket
     * @param team1 Team
     * @param team2 Team
     * @param nextMatchID Int, representing the Match that the winner will advance to
     * @param votes Map<Str,Int>, counting which Team each user has voted for. 1 -> team1,
     *      2 -> team2, 0 -> no vote. Each key is a voter name.
     * @param nextStatus Int, whether the winner of this match becomes the home or away team of its next
     *     match
     */
    constructor(id, winner, team1, team2, nextMatchID, votes, nextStatus) {
        this.id = id;
        this.winner = winner;
        this.team1 = team1;
        this.team2 = team2;
        this.nextMatchID = nextMatchID;
        this.votes = votes;
        if (nextStatus !== 0 && nextStatus !== 1 && nextStatus !== null) {
            throw new Error(`Next statuses should only be 0 or 1. Found: ${nextStatus}`);
        } else {
            this.nextStatus = nextStatus;
        }
    }

    // Custom copy method to mimic the spread operator
    cleanCopy({
                  id = this.id,
                  winner = this.winner,
                  team1 = this.team1,
                  team2 = this.team2,
                  nextMatchID = this.nextMatchID,
                  votes = this.votes,
                  nextStatus = this.nextStatus
              } = {}) {
        return new Match(id, winner, team1, team2, nextMatchID, votes, nextStatus);
    }

    // Abstracting this in case I change the representation here, App shouldn't have to change
    updateVotes(voterName, vote) {
        // console.log(`Match ${this.id} updating votes`)
        this.votes[voterName] = vote;
    }

}