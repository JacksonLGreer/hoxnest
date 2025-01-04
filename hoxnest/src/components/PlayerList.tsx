"use client"

import react from "react";
import { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard"
import styles from "./PlayerList.module.css";

export default function PlayerList() {

    
    // This component displays a list of all the Hawks players and their main counting stats
    let [playerList, setPlayerList] = useState([]);
    let [idList, setidList] = useState({});
    /**
     * Mo Gueye - 3939
     * David Roddy - 3483
     * Kobe Bufkin - 3938
     * Larry Nance - 385
     */
    
    useEffect(() =>{
        //getStats();
        fetchPlayerStats(1046);
        fetchPlayers(); // IMPORTANT: remember to call the function here!
    }, [])

    // Gets the player information from the DB
    const fetchPlayers = async () => {
        try {
            const response = await fetch(`http://localhost:3001/players`,);
            if (!response.ok) {
                const errorData = await response.json();
                return console.error('Error fetching players: ', errorData.message);  
            }
            const playerData = await response.json();
            setPlayerList(playerData);
            playerData.sort((a: {ppg: number}, b: {ppg: number}) => b.ppg - a.ppg)
            
        } catch (err) {
            console.log('Error in fetching player data: ', err);
        }
    }

    // fetches a specific player's stats from the API and calculates the averages
    const statsOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9e140c858bmsh3a85aced8c64059p1e3242jsn5a6f2a6de09d',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    const fetchPlayerStats = async (id: number) => {
        
        try {
                const response = await fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?id=${id}&season=2024`, statsOptions);
                const result = await response.json();
                
                // This is to prevent the preseason games from being included in the stats
                // The four game IDs are the Hawks preseason games that are also returned by the API
                let slice = 0;
                for (let i = 0; i < result.response.length; i++) {
                    if (result.response[i].game.id == 14060) {
                        slice++;
                    }
                    if (result.response[i].game.id == 14067) {
                        slice++;
                    }
                    if (result.response[i].game.id == 14087) {
                        slice++;
                    }
                    if (result.response[i].game.id == 14104) {
                        slice++;
                    }
                }

                const ppg = (result.response.slice(slice).reduce((a: number,v: {points: number}) => a = a + v.points, 0) / (result.response.length -3)).toFixed(1);
                const rpg = (result.response.slice(slice).reduce((a: number,v: {totReb: number}) => a = a + v.totReb, 0) / (result.response.length -3)).toFixed(1);
                const apg = (result.response.slice(slice).reduce((a: number,v: {assists: number}) => a = a + v.assists, 0) / (result.response.length -3)).toFixed(1);
                const spg = (result.response.slice(slice).reduce((a: number,v: {steals: number}) => a = a + v.steals, 0) / (result.response.length -3)).toFixed(1);
                const bpg = (result.response.slice(slice).reduce((a: number,v: {blocks: number}) => a = a + v.blocks, 0) / (result.response.length -3)).toFixed(1);
                console.log(result.response)
                console.log( ppg, apg, rpg, spg, bpg);

                try {
                    const result = await fetch('http://localhost:3001/player/update_stats', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ppg: ppg,
                            apg: apg,
                            rpg: rpg,
                            spg: spg,
                            bpg: bpg,
                            id: id,
                        }),
                    });
                } catch (err) {
                    console.error(err);
                }
                
        } catch (err) {
            console.error(err);
        }
    }

    // Fetches the players stats from the API and calculates the totals, not averages
    const fetchPlayerTotals = async (id: number) => {
        // preseason IDs - 14060, 14067, 14087, 14104
        try {
                const response = await fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?id=${id}&season=2024`, statsOptions);
                const result = await response.json();
                let slice = 0;
                for (let i = 0; i < result.response.length; i++) {
                    if (result.response[i].game.id == 14060) {
                        slice++;
                    }
                    if (result.response[i].game.id == 14067) {
                        slice++;
                    }
                    if (result.response[i].game.id == 14087) {
                        slice++;
                    }
                    if (result.response[i].game.id == 14104) {
                        slice++;
                    }
                }

                const points = (result.response.slice(slice).reduce((a: number,v: {points: number}) => a = a + v.points, 0));
                const rebounds = (result.response.slice(slice).reduce((a: number,v: {totReb: number}) => a = a + v.totReb, 0));
                const assists = (result.response.slice(slice).reduce((a: number,v: {assists: number}) => a = a + v.assists, 0));
                const steals = (result.response.slice(slice).reduce((a: number,v: {steals: number}) => a = a + v.steals, 0));
                const blocks = (result.response.slice(slice).reduce((a: number,v: {blocks: number}) => a = a + v.blocks, 0));
                console.log(points, rebounds, assists, blocks, steals);
                console.log(result.response);

                /** Not trying to put these in DB 
                try {
                    const result = await fetch('http://localhost:3001/player/update_stats', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            points: points,
                            assists: assists,
                            rebounds: rebounds,
                            steals: steals,
                            blocks: blocks,
                            id: id,
                        }),
                    });
                } catch (err) {
                    console.error(err);
                }
                    */
                
        } catch (err) {
            console.error(err);
        }
    }

    // Fetches and returns the IDs from the database
    const fetchPlayerIDs = async () => {
        try {
            const response = await fetch(`http://localhost:3001/players/id`);
            const result = await response.json() as { id: number}[];
            const ids = result.map((item) => item.id);
            setidList(ids);
            return ids;
        } catch (error) {
            console.error(error);
        }
    }

    // function to retrieve the stats of all the players on the Hawks and put it into the DB
    const getStats = () => {
        const ids = fetchPlayerIDs()
        .then((ids) => {
            const idArray = ids;
            idArray?.map((id) => {
                fetchPlayerStats(id);
            })
        })
       .catch((err) => {
        console.error("Error fetching playerIDs in getStats", err);
       })
    }

    return (
        <div>
            <div className={styles.listTop}>
                <p>Name</p>
                <p>Position</p>
                <p>Points</p>
                <p>Assists</p>
                <p>Rebounds</p>
                <p>Steals</p>
                <p>Blocks</p>
            </div>
            {playerList.map((player, index) => (
                <PlayerCard 
                    key={index}
                    player={player}
                />
            ))}
            
        </div>
    )
}