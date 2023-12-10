require('dotenv').config()

const express = require('express');
const fetch = require('node-fetch');

const app = express();

const BRAWL_API_KEY = process.env.BRAWL_API_KEY; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/basic-stats', async (req, res) => {
    const response = await fetch(`https://api.brawlstars.com/v1/players/%23JYR2892Q`, {
        method: "GET",
        withCredentials: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${BRAWL_API_KEY}`,
        }
    });

    const data = await response.json();

    console.log(data);

    console.log(data.trophies);

    const trophies = data.trophies;

    const highestTrophies = data.highestTrophies;

    const club = data.club.name;

    const totalWins = data.duoVictories + data['3vs3Victories'] + data.soloVictories;

    const brawlers = data.brawlers;

    console.log(brawlers)

    var best5 = {};
    for (let brawler of brawlers) {
        best5[brawler.name] = brawler.trophies

    }

    var items = Object.keys(best5).map(
        (key) => { return [key, best5[key]] });

    // Step - 2
    // Sort the array based on the second element (i.e. the value)
    items.sort(
        (first, second) => { return first[1] - second[1] }
    );

    // Step - 3
    // Obtain the list of keys in sorted order of the values.
    var keys = items.map(
        (e) => { return e[0] });

    keys = keys.slice(-5)
    keys = keys.reverse()
    console.log(keys);
    const top5 = keys.join(", ")

    const dataToShow = {
        trophies: trophies,
        highestTrophies: highestTrophies,
        totalWins: totalWins,
        club: club,
        top5: top5

        // topBrawler: "SHELLY"
    }

    res.status(200).json(dataToShow);
})

app.get('/brawler-stats', async (req, res) => {
    const playerTag = "JYR2892Q";

    const response = await fetch(`https://api.brawlstars.com/v1/players/%23${playerTag}/battlelog`, {
        method: "GET",
        withCredentials: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${BRAWL_API_KEY}`
        }
    });



    const data = await response.json();

    console.log(JSON.stringify(data, null, 4));

    const logs = data.items;

    const brawlers = logs.map((item, index) => {
        console.log(index);

        const teams = item.battle.teams;

        const team1 = teams[0];
        const team2 = teams[1];

        for (let player of team1) {
            if (player.tag === `#${playerTag}`) {
                return player.brawler.name;
            }
        }

        for (let player of team2) {
            if (player.tag === `#${playerTag}`) {
                return player.brawler.name;
            }
        }

        return "";
    })

    console.log(brawlers);

    let sortedBrawlers = {};
    for (let brawler of brawlers) {
        if (!Object.keys(sortedBrawlers).includes(brawler))
            sortedBrawlers[brawler] = 1;
        else
            sortedBrawlers[brawler] += 1;
    }

    var items = Object.keys(sortedBrawlers).map(
        (key) => { return [key, sortedBrawlers[key]] });

    items.sort(
        (first, second) => { return second[1] - first[1] }
    );

    console.log (items); 

    const mostPlayed = items.map (item => item[0]); 

    console.log (mostPlayed)



    const dataToShow = {
        mostPlayed: mostPlayed,
        // trophies: trophies,
        // highestTrophies: highestTrophies,
        // totalWins: totalWins,
        // club: club,
        // bestBrawler: bestBrawler,
        // topBrawler: "SHELLY"
    }

    res.status(200).json (dataToShow); 
})

app.listen(3000, () => // fire up express server
{
    console.log("LISTENING ON PORT 3000");
})