OBJECTS:
Team: {id: Int, name: String, votes: Int}
Match: {id: Int, winner: Team, team1: Team, team2: Team, nextMatchID: Int}
Bracket: {roundNum: Int, matches: Array<Match>, nextRound: Bracket}


BUGS:
- Match IDs not starting from 0

TODO:
- Have PlayBracketPage render the bracket, and make each match clickable
  - Upon click the VotingScreen pops up
    - VotingScreen mutates the bracket object once there's a winner
  - Users can click 'next' to go to the next VotingScreen, or 'back to bracket'
- Make a zoom in/out button in the bottom right of PreviewBracket
- IdeasPage page
- Ensure that there can't be an even number of users

Features to add:
- Make a group stage feature

Considering:
- Change 'id' in the Team object to 'seed'