// JYG2U8RJ
// JYR2892Q

async function searchBrawl() 
{
    let ID = document.getElementById('ID').value;
    console.log(ID)

    if (ID === "")
    {
        alert('Username not found... ');
        return; 
    }

    ID = ID.toUpperCase(); 
    
    const basicResponse = await fetch(`http://localhost:3000/basic-stats/${ID}`); 

    if (!basicResponse.ok) {
        alert('Error')
        return;
    }

    const basicData = await basicResponse.json (); 

    console.log (basicData); 

    const brawlerResponse = await fetch(`http://localhost:3000/brawler-stats/${ID}`); 

    const brawlerData = await brawlerResponse.json (); 

    console.log (brawlerData); 

    // const winPercText = document.getElementById("winPercText"); 

    // winPercText.innerHTML = brawlerData.starPlayerPercentage;

    const trophies = document.getElementById("trophies");

    trophies.innerHTML = (`Trophies: ${basicData.trophies}`);

    const bestTrophies = document.getElementById("bestTrophies");

    bestTrophies.innerHTML = (`Best Trophies; ${basicData.highestTrophies}`);

    const teamWins = document.getElementById("teamWins");
    
    teamWins.innerHTML = (`3v3 Wins: ${basicData.teamWins}`);

    const showdownWins = document.getElementById("showdownWins");

    showdownWins.innerHTML = (`Showdown Wins: ${basicData.showdownWins}`);

    const club = document.getElementById("club");

    club.innerHTML = (`Club: ${basicData.club}`);

    const expLevel = document.getElementById("expLevel");

    expLevel.innerHTML = (`Experience Level: ${basicData.expLevel}`)

    const playerId = document.getElementById("playerId")
    playerId.innerHTML = (`Code: ${basicData.tag}`)

    const userName = document.getElementById("userName")
    userName.innerHTML = (`Username: ${basicData.userName}`)

    const mostPlayedBrawler = document.getElementById("mostPlayedBrawler")
    mostPlayedBrawler.innerHTML = brawlerData.mostPlayed

    const mostPlayedMode = document.getElementById("mostPlayedMode")
    mostPlayedMode.innerHTML = brawlerData.mostPlayedMode

    const recentWinPercentage = document.getElementById("winPercentage")
    recentWinPercentage.innerHTML = brawlerData.recentWinPercentage

    const starPlayerPercentage = document.getElementById("starPlayerPercentage")
    starPlayerPercentage.innerHTML = brawlerData.starPlayerPercentage

    const graphResponse = await fetch(`http://localhost:3000/graph-data/${ID}`); 

    const graphData = await graphResponse.json (); 

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: graphData.labels,
        datasets: [{
            label: '# Of Games',
            data: graphData.datas,
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });



    const graph2Response = await fetch(`http://localhost:3000/graph2-data/${ID}`);
    const graph2Data = await graph2Response.json ();


    const ctx2 = document.getElementById("mySecondChart");

    new Chart(ctx2, {
        type: 'doughnut',
        data: {
        labels: graph2Data.labels,
        datasets: [{
            label: 'Win Percentage',
            data: graph2Data.datas,
            borderWidth: 1
        }]

        }})
}  


function functionA (param1, param2) 
{

}

const functionB = (param1, param2) => 
{

}