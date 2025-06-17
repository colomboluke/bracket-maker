
To add:
- coin flip for random votes
- make it two sided
- images for voters (low priority)
- 'Next' and 'Previous' buttons to navigate between matchups, rather than going back to the bracket each time
- prettier alerts
- additional animation for winner
- When hovering over a matchup, have the colors change depending on if its playable/placeholder/future match


Things to get people's thoughts on:
- Have them play around with resetting stuff, switching pages, put weird inputs, basically try to break it

Handle even number of voters (button that pops up saying break tie, randomly pick one)
- Warn the user: if you have an even number of voters, bracket maker will choose randomly to break ties


BUGS:
- When going back from play screen to home screen, it removes any teams that have byes
- fix the sigfig bug with graph algos

TODO:
- Basic functionality
  - [ ] Have an animation/display for the winner
  - [ ] Style IdeasPage page
  - [ ] Category: drop down menu of sports teams, movies, shows, songs, foods, etc, have this be the default name instead of "team X" every time
  - [ ] Format on mobile!
  - Ideas Page
    - [ ] Button that generates a random category, maybe with some examples
- QoL
  - [ ] Let users change the order/seed of an individual team in SetupPage
  - [ ] Differentiate between the 3 different 'reset' buttons
  - [ ] Make teams draggable in SetupPage
    - Get grid style working
  - [ ] Let users click 'next' or 'prev' to move between VotingScreens
  - [ ] Select votes with right/left arrow keys
  - [ ] When trying to click 'next' on VotingScreen, highlight the rows that still need to vote
  - [ ] Display title and description
    - I think description might be nice for the final printout
  - [ ] Let users choose images for each Team/Voter
    - UI customization: toggle show icons in bracket or just in VotingScreen, toggle show icons in bracket, choose overall color scheme for the bracket (from set of options)
  - [ ] Make a zoom in/out button in the bottom right of PreviewBracket
  - [ ] Light mode/dark mode button 
  - [ ] Automated testing for bracket functions
- Advanced features
  - [ ] More Statistics:
      - Adjusted upset rate: give more points for bigger upset like 1v8, less for 4v5
  - [ ] Normal bracket capabilities
    - Choose between traditional bracket and voting bracket
      - Traditional bracket chooses the winner of each match by comparing their scores, voting bracket lets users vote on who they want to advance
  - [ ] Let users create a bracket, then save that on the site and let other people play it
