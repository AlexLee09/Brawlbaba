async function searchBrawl() 
{
    let ID = document.getElementById('ID').value;
    console.log(ID)

    const response = await fetch("http://localhost:3000/basic-stats"); 

    const data = await response.json (); 



    // const response = await fetch(`https://api.brawlstars.com/v1/player/%${ID.toLowerCase()}`, {
    //     method: "GET",
    //     withCredentials: true,
    //     headers: {
    //         "X-Auth-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjllYzQxZWI3LTZhMGItNDNiMC04OGYzLWFlOWNiNzRjODNiYyIsImlhdCI6MTcwMTg1OTQzOSwic3ViIjoiZGV2ZWxvcGVyL2JjY2I4YjEzLWRiYzgtYTk0OS05MDNjLTA2Yzk1YWUxYmE1YSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMC4wLjAuMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.gz0EUQpqTiyNTLZRTCT38-uJxNiOtHBVcF_vScQYlFFvIFa1dvWs-jfzn2LvPqX89LleMyA2juWEf9qNR0iK-A",
    //         "Content-Type": "application/json"
    //     }
    // });

    // console.log ("A")

    // if (!response.ok) {
    //     alert('ID not found... ');
    //     return;
    // }
    
    // console.log ("B")
    // const data = await response.json();

    // console.log (data); 


}  


function functionA (param1, param2) 
{

}

const functionB = (param1, param2) => 
{

}