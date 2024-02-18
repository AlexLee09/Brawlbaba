require('dotenv').config()

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

const BRAWL_API_KEY = process.env.BRAWL_API_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/basic-stats/:playerTag', async (req, res) => {
    try {
        const { playerTag } = req.params;

        const response = await fetch(`https://api.brawlstars.com/v1/players/%23${playerTag}`, {
            method: "GET",
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${BRAWL_API_KEY}`,
            }
        });

        const data = await response.json();

        const trophies = data.trophies;

        const highestTrophies = data.highestTrophies;

        const club = data.club.name;

        const totalWins = data.duoVictories + data['3vs3Victories'] + data.soloVictories;

        const brawlers = data.brawlers;

        const teamWins = data['3vs3Victories']
        const showdownWins = data.duoVictories + data.soloVictories
        const expLevel = data.expLevel
        const tag = data.tag
        const userName = data.name

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
        const top5 = keys.join(", ")

        const dataToShow = {
            trophies: trophies,
            highestTrophies: highestTrophies,
            totalWins: totalWins,
            club: club,
            top5: top5,
            teamWins: teamWins,
            showdownWins: showdownWins,
            expLevel: expLevel,
            tag: tag,
            userName: userName

            // topBrawler: "SHELLY"
        }

        res.status(200).json(dataToShow);
    }
    catch (error) {
        res.status(500).json
    }
})

app.get('/brawler-stats/:playerTag', async (req, res) => {
    try {
        const { playerTag } = req.params;

        const response = await fetch(`https://api.brawlstars.com/v1/players/%23${playerTag}/battlelog`, {
            method: "GET",
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${BRAWL_API_KEY}`
            }
        });

        const data = await response.json();

        const logs = data.items;

        const brawlers = logs.map((item, index) => {
            if (item.battle.teams) {
                const teams = item.battle.teams;

                for (let team of teams) {
                    for (let player of team) {
                        if (player.tag === `#${playerTag}`) {
                            return player.brawler.name;
                        }
                    }
                }


            }
            else {
                const players = item.battle.players;

                for (let player of players) {
                    if (player.tag === `#${playerTag}`) {
                        return player.brawler.name;
                    }

                }
            }

            return "";
        })

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

        const mostPlayedList = items.map(item => item[0]);
        const mostPlayed = mostPlayedList[0]


        let countVictories = 0
        let countTotal = 0
        const wins = logs.map((item, index) => {
            if ((item.battle.mode === "duoShowdown" && item.battle.rank <= 2) ||
                (item.battle.mode === "soloShowdown" && item.battle.rank <= 4) ||
                (item.battle.result === "victory")) {
                countVictories += 1
            }
            countTotal += 1


        })

        const recentWinPercentage = countVictories * 100 / countTotal


        const modes = logs.map((item, index) => {
            return item.battle.mode
        })

        modesDict = {}
        for (let game of modes) {
            if (!Object.keys(modesDict).includes(game))
                modesDict[game] = 1
            else
                modesDict[game] += 1
        }
        const sortedModesDict = Object.fromEntries(Object.entries(modesDict).sort(([, a], [, b]) => b - a))
        const mostPlayedMode = Object.keys(sortedModesDict)[0]


        const starPlayer = logs.map((item, index) => {
            if (item.battle.starPlayer)
                return item.battle.starPlayer.tag
            else if (item.battle.starPlayer === null) {
                return ""
            }
        })

        starPlayers = 0
        totalMatches = 0
        for (let star of starPlayer) {
            if (star === (`#${playerTag}`))
                starPlayers += 1

            if (star !== undefined)
                totalMatches += 1

        }

        const starPlayerPercentage = starPlayers * 100 / totalMatches






        const dataToShow = {
            mostPlayed: mostPlayed,
            recentWinPercentage: recentWinPercentage,
            mostPlayedMode: mostPlayedMode,
            starPlayerPercentage: starPlayerPercentage
            // trophies: trophies,
            // highestTrophies: highestTrophies,
            // totalWins: totalWins,
            // club: club,
            // bestBrawler: bestBrawler,
            // topBrawler: "SHELLY"
        }

        res.status(200).json(dataToShow);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})

app.get('/graph-data/:playerTag', async (req, res) => {
    try {
        const { playerTag } = req.params;

        const response = await fetch(`https://api.brawlstars.com/v1/players/%23${playerTag}/battlelog`, {
            method: "GET",
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${BRAWL_API_KEY}`
            }
        });

        const data = await response.json();

        const logs = data.items;

        const brawlers = logs.map((item, index) => {
            if (item.battle.teams) {
                const teams = item.battle.teams;

                for (let team of teams) {
                    for (let player of team) {
                        if (player.tag === `#${playerTag}`) {
                            return player.brawler.name;
                        }
                    }
                }


            }
            else {
                const players = item.battle.players;

                for (let player of players) {
                    if (player.tag === `#${playerTag}`) {
                        return player.brawler.name;
                    }

                }
            }

            return "";
        })

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


        let labels = []
        let datas = []

        for (let item of items) {
            labels.push(item[0])
            datas.push(item[1])
        }




        const dataToShow = {
            labels: labels,
            datas: datas
        }

        res.status(200).json(dataToShow);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})

app.get('/graph2-data/:playerTag', async (req, res) => {
    try {
        const { playerTag } = req.params;

        const response = await fetch(`https://api.brawlstars.com/v1/players/%23${playerTag}/battlelog`, {
            method: "GET",
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${BRAWL_API_KEY}`
            }
        });

        const data = await response.json();

        const logs = data.items;

        const brawlers = logs.map((item, index) => {
            if (item.battle.mode === 'soloShowdown') {
                if (item.battle.rank < 5)
                    return 'victory'
                else
                    return 'defeat'
            }

            else if (item.battle.mode === 'duoShowdown') {
                if (item.battle.rank < 3)
                    return 'victory'
                else
                    return 'defeat'
            }

            else {
                if (item.battle.result === "victory")
                    return 'victory'
                else
                    return 'defeat'
            }
        })

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


        let labels = []
        let datas = []

        for (let item of items) {
            labels.push(item[0])
            datas.push(item[1])
        }




        const dataToShow = {
            labels: labels,
            datas: datas
        }

        res.status(200).json(dataToShow);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" })
    }
})










app.listen(3000, () => // fire up express server
{
})