TODO:
- Problem: when rendering the round after a bye round, the order of teams may need to be shuffled around. For example, in the case of 13 teams, the second round should go: {team 1, null}, {null, null}, {team 3, null}, {team 2, null}. Not sure if I should do this in React or CSS. 
  - I think this might get pretty complicated.
  - Easiest way might be to add dummy matches to always make the bracket an even power of 2, then keep track of which matches are dummies and need to be hidden.
    - This way, I can pre-define heights and positions for each match
    - Not super scalable, will have to cap it at 64
- figure out how to space each round of the bracket—each round should have a fixed height, and the matchups need to be sized/spaced according to how many there are
- Have the bracket have a re-seed option: after each round, the top seed will play the lowest, etc. By default this will be off
- Make a group stage feature