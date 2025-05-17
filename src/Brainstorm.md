
On a scale of 1-3, how much would you want this feature?
- Choosing images for each Team
- Choosing colors for each Team
- Choosing images for each Voter
- Choosing colors for each Voter
- 'Reset votes' button in voting screen
- When hovering over a matchup, have the colors change depending on if its playable/placeholder/future match
- Progress bar, showing how many matches still need to be completed
- 'Next' and 'Previous' buttons to navigate between matchups, rather than going back to the bracket each time
- Light mode/dark mode 


TODO:
- Basic functionality
  - [x] VotingScreen darkens the background and doesn't let users click on it
  - [x] Don't let users click on Matchups with no Teams inside them
  - [x] Show winner and score on PlayableBracket (show green check?)
  - [x] Ensure quality check before starting bracket
  - [x] CODE AUDIT: go through every file and refactor/clean up code as much as possible
    - [x] Make Match, Team, Bracket classes (if appropriate)
  - 1. [x] Reset button in SetupPage with an "are you sure" step
  - [x] Track votes so that clicking on a VotingScreen remembers the votes
  - [ ] Have an animation/display for the winner
  - [ ] USER TESTING!
  - 3. [ ] Display final completed bracket, let users print/save
  - 4. [ ] Host BracketMaker on the web
  - [ ] IdeasPage page
- QoL
  - [ ] Make teams draggable in SetupPage
  - [ ] Let users click 'next' or 'prev' to move between VotingScreens
  - [ ] VotingScreen has a 'reset votes' button
  - [ ] In PlayPage, have the hover border change colors based on whether that matchup is playable
  - [ ] Info buttons/tutorial explaining the basic idea of a voting bracket
  - [x] Let users close a VotingScreen by pressing escape
  - 2. [x] In SetupPage, have the remove Team/Voter button only when hovering 
  - [ ] Progress bar, showing how many matches still need to be completed
  - [ ] Display title and description
    - I think description might be nice for the final printout
  - [ ] Let users choose images for each Team/Voter
    - UI customization: toggle show icons in bracket or just in VotingScreen, toggle show icons in bracket, choose overall color scheme for the bracket (from set of options)
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