
To add:
- coin flip for random votes
- make it two sided
- images for voters (low priority)
- 'Next' and 'Previous' buttons to navigate between matchups, rather than going back to the bracket each time
- prettier alerts
- additional animation for winner
- When hovering over a matchup, have the colors change depending on if its playable/placeholder/future match
- Button that generates a random category, maybe with some examples


Things to get people's thoughts on:
- Have them play around with resetting stuff, switching pages, put weird inputs, basically try to break it

Handle even number of voters (button that pops up saying break tie, randomly pick one)
- Warn the user: if you have an even number of voters, bracket maker will choose randomly to break ties


BUGS:
- When going back from play screen to home screen, it removes any teams that have byes
- fix the sigfig bug with graph algos
- When importing a bracket but you put in the wrong ID, sometimes it just breaks

TODO:
- Basic functionality
  - [ ] Have an animation/display for the winner
  - [ ] Style IdeasPage
  - [ ] Format on mobile!
- QoL
  - [ ] Differentiate between the 3 different 'reset' buttons
  - [ ] Let users click 'next' or 'prev' to move between VotingScreens
  - [ ] Select votes with right/left arrow keys
  - [ ] When trying to click 'next' on VotingScreen, highlight the rows that still need to vote
  - [ ] Display title and description
    - I think description might be nice for the final printout
  - [ ] Make a zoom in/out button in the bottom right of PreviewBracket
  - [ ] Light mode/dark mode button 
  - [ ] Automated testing for bracket functions (to make sure nothing breaks when I update stuff)
- Advanced features
  - [ ] More Statistics:
      - Adjusted upset rate: give more points for bigger upset like 1v8, less for 4v5
  - [ ] Normal bracket capabilities
    - Choose between traditional bracket and voting bracket
      - Traditional bracket chooses the winner of each match by comparing their scores, voting bracket lets users vote on who they want to advance
  - [ ] Let users create a bracket, then save that on the site and let other people play it
    - [ ] Set up backend and connect it to this project
    - [ ] Load a bracket onto SetupPage, then play it as normal
    - [ ] Export a bracket, storing it in the backend with all necessary info
    - [ ] In HomePage, add the Load Bracket button/workflow
