Features to add:
- Make a group stage feature

Bracket creating algorithm (4+ teams):
1. Seed teams in the correct order, creating Match objects as we go
2. Sort matches so that lower team is always home
3. Convert each Int inside the Match to a Team
4. Assign match IDs to these initial matches
5. Post-process the initial matches: handle byes here
6. Create placeholders for next round's matches, advancing any bye matches
7. Repeat steps 1-6 for the next round if necessary 

TODO:
- Change 'id' in the Team object to 'seed'
- 