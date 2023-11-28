# Brawlbaba

## Features
- See basic player info and stats
- Chat with brawl stars coach knowledgeable of brawler combos, maps, stats, etc
- Kill Death Ratio and other stats for individual brawlers
- Brawlers ranked from best to worst
- Compare stats with friends

## Technologies
- HTML, CSS, Javascript
- Brawl Stars API
- OpenAI API
- node.js + express.js
- Mongo DB

## User Story
- First the user sees the landing page which has a brawl stars animation in the background, and a start button
- The user clicks the start button and goes to the login screen, where they put in a username, email and password
- The user is now signed up after confirming their email and sees the dashboard.
- After the user enters a valid player code, they will be transfered to the landing page.
- On the dashboard there are some conventional stats. Including trophies, power league, wins, time spent, and experience level. Along with most played mode and best mode.
- Additionally, on the dashboard there are 4 rows of 5 brawlers: most played, least played, highest win rate, lowest win rate. This information is all from the player's most recent battlelog. Then there is a button users can press to reach a new screen of more detailed stats of all their brawlers: 
- The stats include:
    Play rate, win rate, and lose rate, rank, trophies, win rate, best map, worst map.
- On the right side the well informed Brawlbaba chatbot appears and the user can ask it any questions regarding brawl stars strategy, for example:
Q: Does poco double tank still prevail in the current meta?
A: Due to many tank counters such as Charlie and Shelly prevailing in the current meta both in competetive and casual play, the success of this strategy will rely heavily on the composition of the other team rather than the skill demonstrated by your team.
- Additionally, there will also be a feature on the top left corner a user can use to compare the stats of two different users' stats.