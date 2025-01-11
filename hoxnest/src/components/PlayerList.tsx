"use client"

import react from "react";
import { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard"
import styles from "./PlayerList.module.css";

export default function PlayerList() {

    
    // This component displays a list of all the Hawks players and their main counting stats
    let [playerList, setPlayerList] = useState([]);
    let [idList, setidList] = useState({});

    let sort = useState("");
    
    useEffect(() =>{
        getStats();
        fetchPlayers("none"); // IMPORTANT: remember to call the function here!
    }, [])

    // Gets the player information from the DB
    const fetchPlayers = async (sort: string) => {
        try {
            const response = await fetch(`http://localhost:3001/players`,);
            if (!response.ok) {
                const errorData = await response.json();
                return console.error('Error fetching players: ', errorData.message);  
            }
            const playerData = await response.json();
            setPlayerList(playerData);
            if (sort === "ppg") {
                playerData.sort((a: {ppg: number}, b: {ppg: number}) => b.ppg - a.ppg)
            } else if (sort ==="apg") {
                playerData.sort((a: {apg: number}, b: {apg: number}) => b.apg - a.apg)
            } else if (sort ==="rpg") {
                playerData.sort((a: {rpg: number}, b: {rpg: number}) => b.rpg - a.rpg)
            } else if (sort ==="spg") {
                playerData.sort((a: {spg: number}, b: {spg: number}) => b.spg - a.spg)
            } else if (sort ==="rpg") {
                playerData.sort((a: {rpg: number}, b: {rpg: number}) => b.rpg - a.rpg)
            } 
            
        } catch (err) {
            console.log('Error in fetching player data: ', err);
        }
    }

    // Calls the API to receive a player's game logs and insert each games stats into the PlayerGameStats table
    // Ignores duplicate entries by using the player ID and game ID as a composite primary key
    // This is where I get player stats from API
    const statsOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9e140c858bmsh3a85aced8c64059p1e3242jsn5a6f2a6de09d',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    const fetchPlayerGameLog = async (id: number) => {   
        try {
                const response = await fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?id=${id}&season=2024`, statsOptions);
                const result = await response.json();
                console.log(result.response);
                for (let i = 0; i < result.response.length; i++) {
                    let points = result.response[i].points;
                    let assists = result.response[i].assists;
                    let rebounds = result.response[i].totReb;
                    let steals = result.response[i].steals;
                    let blocks = result.response[i].blocks;
                    let gameID = result.response[i].game.id;
                    if (gameID != 14060 && gameID != 14067 && gameID != 14087 && gameID != 14104) { //ignore preseason games
                        try {
                            const result = await fetch('http://localhost:3001/player/insert_stats', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    playerID: id,
                                    gameID: gameID,
                                    points: points,
                                    assists: assists,
                                    rebounds: rebounds,
                                    steals: steals,
                                    blocks: blocks,
                                }),
                            });
                        } catch (err) {
                            console.error(err);
                        }
                    }       
                }

                
                
        } catch (err) {
            console.error(err);
        }
    } // fetchPlayerGameLogs


    // Uses a player's game logs that are stored in the DB to calculate their stat totals
    const getPlayerTotals = async (id: number) => {  
        try {
            try {
                const response = await fetch(`http://localhost:3001/player/gamestats?id=${id}`,);
                if (!response.ok) {
                    const errorData = await response.json();
                    return console.error('Error fetching players: ', errorData.message);  
                }
                const playerData = await response.json();
                let totPoints = 0;
                let totAssists = 0;
                let totRebounds = 0;
                let totSteals = 0;
                let totBlocks = 0;
                let gamesPlayed = playerData.length;
                // Adding up stats
                for (let i = 0; i < gamesPlayed; i++) {
                    totPoints = totPoints + playerData[i].points;
                    totAssists = totAssists + playerData[i].assists;
                    totRebounds = totRebounds + playerData[i].rebounds;
                    totSteals = totSteals + playerData[i].steals;
                    totBlocks = totBlocks + playerData[i].blocks;

                }
                console.log(totPoints);
                // Update fields in DB with stats
                try {
                    const result = await fetch('http://localhost:3001/player/update_totals', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: id,
                            totPoints: totPoints,
                            totAssists: totAssists,
                            totRebounds: totRebounds,
                            totSteals: totSteals,
                            totBlocks: totBlocks,
                            gamesPlayed: gamesPlayed,
                        }),
                    });
                } catch (err) {
                    console.error(err);
                }
            } catch (err) {
                console.log('Error in fetching player data: ', err);
            }        

        } catch (err) {
            console.error(err);
        }
    } // getPlayerTotals

    // Uses a player's game logs that are stored in the DB to calculate their stat averages
    const getPlayerAverages = async (id: number) => {  
        try {
            try {
                const response = await fetch(`http://localhost:3001/player/gamestats?id=${id}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    return console.error('Error fetching players: ', errorData.message);  
                }
                const playerData = await response.json();
                let totPoints = 0;
                let totAssists = 0;
                let totRebounds = 0;
                let totSteals = 0;
                let totBlocks = 0;
                let gamesPlayed = playerData.length;
                for (let i = 0; i < gamesPlayed; i++) {
                    totPoints = totPoints + playerData[i].points;
                    totAssists = totAssists + playerData[i].assists;
                    totRebounds = totRebounds + playerData[i].rebounds;
                    totSteals = totSteals + playerData[i].steals;
                    totBlocks = totBlocks + playerData[i].blocks;
                }
                const ppg = (totPoints / gamesPlayed).toFixed(1);
                const apg = (totAssists / gamesPlayed).toFixed(1);
                const rpg = (totRebounds / gamesPlayed).toFixed(1);
                const spg = (totSteals / gamesPlayed).toFixed(1);
                const bpg = (totBlocks / gamesPlayed).toFixed(1);
                console.log(ppg, apg, rpg, spg, bpg);
                // Update fields in DB with stats
                try {
                    const result = await fetch('http://localhost:3001/player/update_averages', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: id,
                            ppg: ppg,
                            apg: apg,
                            rpg: rpg,
                            spg: spg,
                            bpg: bpg,
                        }),
                    });
                } catch (err) {
                    console.error(err);
                }
            } catch (err) {
                console.log('Error in fetching player data: ', err);
            }        
        } catch (err) {
            console.error(err);
        }
    } // getPlayerAverages

    
    // Uses a game ID to pull stats from the API and puts all of the Hawks players stats into the PlayerGameStats table
    const updateGameLog = async (gameID: number) => {
        try {
            const response = await fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?game=${gameID}`, statsOptions);
            const result = await response.json();
            console.log(result.response[1])
            for (let i = 0; i < result.response.length; i++) {
                console.log(result.response[i]);
                if (result.response[i].team.nickname === "Hawks") {
                    let points = result.response[i].points;
                    let assists = result.response[i].assists;
                    let rebounds = result.response[i].totReb;
                    let steals = result.response[i].steals;
                    let blocks = result.response[i].blocks;
                    let playerID = result.response[i].player.id;
                    try {
                        const result = await fetch('http://localhost:3001/player/insert_stats', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                playerID: playerID,
                                gameID: gameID,
                                points: points,
                                assists: assists,
                                rebounds: rebounds,
                                steals: steals,
                                blocks: blocks,
                            }),
                        });
                    } catch (err) {
                        console.error(err);
                    }
                } // if
            } // for
        } catch (err) {
            console.error("Error updating game log: " + err);
        }
    } // updateGameLog


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
    } // fetchPlayerIDs

    // function to retrieve the stats of all the players on the Hawks and put it into the DB
    const getStats = () => {
        const ids = fetchPlayerIDs()
        .then((ids) => {
            const idArray = ids;
            idArray?.map((id) => {
                getPlayerTotals(id);
                getPlayerAverages(id);
            })
        })
       .catch((err) => {
        console.error("Error fetching playerIDs in getStats", err);
       })
    }

    const getStatsID = async (id: number) => {
        fetchPlayerGameLog(id);
        getPlayerAverages(id);
        getPlayerTotals(id);
    }
    

    return (
        <div>
            <div className={styles.listTop}>
                <p>Name</p>
                <p>Position</p>
                <button className={styles.link} onClick={() => fetchPlayers("ppg")} >Points</button>
                <button className={styles.link} onClick={() => fetchPlayers("apg")} >Assists</button>
                <button className={styles.link} onClick={() => fetchPlayers("rpg")} >Rebounds</button>
                <button className={styles.link} onClick={() => fetchPlayers("spg")} >Steals</button>
                <button className={styles.link} onClick={() => fetchPlayers("bpg")} >Blocks</button>
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