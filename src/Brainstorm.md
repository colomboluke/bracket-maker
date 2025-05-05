Features to add:
- Make a group stage feature

Bracket creating algorithm (4+ teams):
1. Seed teams in the correct order, creating Match objects as we go
   2. This algorithm starts with a 'root' of [1,2], representing the two seeds expected to make the finals. It then expands each seed into the two seeds that feed into it during the previous round. 1 turns into [1,4], 2 turns into [3,2]. Both of these add up to 5. When creating these feeder matches, the original seed alternates its placement: first left, then right, etc. If a team should have a bye, that's represented as it playing against a null opponent. This repeats for n number of rounds. Final result: a properly seeded, full bracket with n rounds. 
2. Sort matches so that lower team is always home
3. Convert each Int inside the Match to a Team
   4. Before this stage, each 'team' was just an integer. [1,2] would be the match between the 1 and two seeds.
4. Assign match IDs to these initial matches
   5. Initial match ID: simple increment by 1
   6. Next match ID (the ID of the match that winner of this one will play in): ID of first match in this round + number of matches in this round, increment every 2 matches
5. Post-process the initial matches: handle byes here
   6. The initial matches created in steps 1-4 assume a 'full' bracket. So if we have anywhere from 5-8 teams, it will create a bracket with 8 teams. This algo detects bye matches in round 1 and transfers them to round 2. All other matches in rounds 2-n get turned into placeholders (null vs null).
6. Create placeholders for next round's matches, advancing any bye matches
   7. If the current round has n matches, next round should have n/2, with the exception of round 2, if we have bye teams.
7. Repeat steps 1-6 for the next round if necessary 
   8. We recurse until we are left with 1 match.

TODO:
- Have PlayBracketPage render the bracket, and make each match clickable
  - Upon click the VotingScreen pops up
    - VotingScreen mutates the bracket object once there's a winner
  - Users can click 'next' to go to the next VotingScreen, or 'back to bracket'
- Make a zoom in/out button in the bottom right of BracketPreview
- IdeasPage page
- Ensure that there can't be an even number of users

Considering:
- Change 'id' in the Team object to 'seed'