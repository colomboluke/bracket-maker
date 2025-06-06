
Things to get people's thoughts on:
- Displaying images for Teams in the bracket
- Displaying images/icons for Voters 
- 'Reset votes' button in voting screen
  - Yes from maya
- When hovering over a matchup, have the colors change depending on if its playable/placeholder/future match
- Progress bar, showing how many matches still need to be completed
  - yes from maya
- 'Next' and 'Previous' buttons to navigate between matchups, rather than going back to the bracket each time
  - yes from maya
- Make the voting screen more intuitive
  - change plus to new symbol (check?)
- New method of adding Teams/Voters
  - not necessary
- New method of removing Teams/Voters
  - make symbol red instead of white
- Additional display for the winner (animation?)
  - yes from maya
- Prettier alerts
  - yes from maya
- Do you want the teams/voters to reset when you go from PlayPage to SetupPage?
- Have them play around with resetting stuff, switching pages, put weird inputs, basically try to break it

Handle even number of voters (button that pops up saying break tie, randomly pick one)
- Warn the user: if you have an even number of voters, bracket maker will choose randomly to break ties


BUGS:
- Something is up with resetting votes - sometimes it says there's a tie when only two people have voted

TODO:
- Basic functionality
  - [ ] Style chart selection menu
  - [ ] Implement other two insights algorithms
  - [ ] Have an animation/display for the winner
  - [ ] Style IdeasPage page
  - [ ] Category: drop down menu of sports teams, movies, shows, songs, foods, etc, have this be the default name instead of "team X" every time
  - [ ] Format on mobile!
  - 6. Ideas Page
    - [ ] Button that generates a random category, maybe with some examples
    - [ ] Screenshot of my paper bracket?
- QoL
  - [ ] Let users change the order/seed of an individual team in SetupPage
  - [ ] Differentiate between the 3 different 'reset' buttons
  - [ ] Make teams draggable in SetupPage
  - [ ] Let users click 'next' or 'prev' to move between VotingScreens
  - [ ] Select votes with right/left arrow keys
  - [ ] When trying to click 'next' on VotingScreen, highlight the rows that still need to vote
  - [ ] Info buttons/tutorial explaining the basic idea of a voting bracket
  - [ ] Display title and description
    - I think description might be nice for the final printout
  - [ ] Let users choose images for each Team/Voter
    - UI customization: toggle show icons in bracket or just in VotingScreen, toggle show icons in bracket, choose overall color scheme for the bracket (from set of options)
  - [ ] Make a zoom in/out button in the bottom right of PreviewBracket
  - [ ] Light mode/dark mode button 
  - [ ] Automated testing for bracket functions
- Advanced features
  - 5.[ ] Statistics:
      - Print table of all voters' records
      - Upset rate
          - Adjusted upset rate: give more points for bigger upset like 1v8, less for 4v5
      - See who disagreed with the group the most
  - [ ] Normal bracket capabilities
    - Choose between traditional bracket and voting bracket
      - Traditional bracket chooses the winner of each match by comparing their scores, voting bracket lets users vote on who they want to advance
  - [ ] Let users create a bracket, then save that on the site and let other people play it
