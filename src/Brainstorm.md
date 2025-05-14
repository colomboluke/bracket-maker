OBJECTS:
Team: {id: Int, name: String, votes: Int}
Match: {id: Int, winner: Team, team1: Team, team2: Team, nextMatchID: Int}
Bracket: {roundNum: Int, matches: Array<Match>, nextRound: Bracket}


BUGS:
- Match IDs not starting from 0

TODO:
- Basic functionality
  - [x] VotingScreen darkens the background and doesn't let users click on it
  - [x] Don't let users click on Matchups with no Teams inside them
  - [x] Show winner and score on PlayableBracket (show green check?)
  - [x] Ensure quality check before starting bracket
  - [ ] CODE AUDIT: go through every file and refactor/clean up code as much as possible
    - [ ] Make Match, Team, Bracket classes (if appropriate)
  - [ ] Track votes so that clicking on a VotingScreen remembers the votes
  - [ ] Have an animation/display for the winner
  - [ ] USER TESTING!
  - [ ] Display final completed bracket, let users print/save
  - [ ] Host BracketMaker on the web
  - [ ] IdeasPage page
- QoL
  - [ ] Make teams draggable in SetupPage
  - [ ] Info buttons/tutorial explaining the basic idea of a voting bracket
  - [ ] Let users close a VotingScreen by pressing escape
  - [ ] Progress bar, showing how many matches still need to be completed
  - [ ] Display title and description
  - [ ] Let users choose images for each Team/Voter
    - UI customization: toggle show icons in bracket or just in VotingScreen, toggle show icons in bracket, choose overall color scheme for the bracket (from set of options)
  - [ ] VotingScreen has a 'reset votes' button
  - [ ] Users can click 'next' to go to the next VotingScreen
  - [ ] Make a zoom in/out button in the bottom right of PreviewBracket
  - [ ] Light mode/dark mode button 
- Advanced features
  - [ ] Statistics:
      - Print table of all voters' records
      - Upset rate
          - Adjusted upset rate: give more points for bigger upset like 1v8, less for 4v5
      - See who disagreed with the group the most
  - [ ] Normal bracket capabilities
    - Choose between traditional bracket and voting bracket
      - Traditional bracket chooses the winner of each match by comparing their scores, voting bracket lets users vote on who they want to advance

Considering:
- Change 'id' in the Team object to 'seed'