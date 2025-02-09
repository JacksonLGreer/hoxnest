"use client"

import react from "react";
import { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard"
import styles from "./PlayerList.module.css";

export default function PlayerList() {

    /**
     * This component displays a list of all the Hawks players and their main counting stats.
     * Methods:
     * fetchPlayers(string) - Gets the player information from the DB.
     * fetchPlayerGameLog(id: number) - Gets a player's entire game log from the API and puts into DB.
     * getPlayerTotals(id: number) - Calculates a player's totals using game logs from DB.
     * getPlayerAverages(playerID: number) - Calculates a player's averages using game logs from DB.
     * updateGameLog(gameID: number) - Uses a game ID to pull stats from the API and puts all of the Hawks players stats into the DB.
     * fetchPlayerIDs - fetches and returns a list of playerIDs from the DB.
     * getStats - uses a few of the above methods to perform all calculations together.
    */
    

    let [playerList, setPlayerList] = useState([]);
    let [idList, setidList] = useState({});

    
    useEffect(() =>{
        getStats();
        fetchPlayers("none"); // IMPORTANT: remember to call the function here!
    }, [])

    /**
     * Gets the player information from the DB
     * @param - string "sort" - A keyword that can be passed to sort the data by ppg, apg, etc. Use "none" for no sort.
     */
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
            } else if (sort ==="bpg") {
                playerData.sort((a: {bpg: number}, b: {bpg: number}) => b.bpg - a.bpg)
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
                for (let i = 0; i < result.response.length; i++) {
                    let points = result.response[i].points;
                    let assists = result.response[i].assists;
                    let rebounds = result.response[i].totReb;
                    let mins = result.response[i].min;
                    let offReb = result.response[i].offReb;
                    let defReb = result.response[i].defReb;
                    let steals = result.response[i].steals;
                    let blocks = result.response[i].blocks;
                    let gameID = result.response[i].game.id;
                    let fgm = result.response[i].fgm;
                    let fga = result.response[i].fga;
                    let fgp = result.response[i].fgp;
                    let ftm = result.response[i].ftm;
                    let fta = result.response[i].fta;
                    let ftp = result.response[i].ftp;
                    let tpm = result.response[i].tpm;
                    let tpa = result.response[i].tpa;
                    let tpp = result.response[i].tpp;
                    let fouls = result.response[i].pFouls;
                    let turnovers = result.response[i].turnovers;
                    let plusMinus = result.response[i].plusMinus;
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
                                    mins: mins,
                                    points: points,
                                    assists: assists,
                                    rebounds: rebounds,
                                    offReb: offReb,
                                    defReb: defReb,
                                    steals: steals,
                                    blocks: blocks,
                                    fgm: fgm,
                                    fga: fga,
                                    fgp: fgp,
                                    ftm: ftm,
                                    fta: fta,
                                    ftp: ftp,
                                    tpm: tpm,
                                    tpa: tpa,
                                    tpp: tpp,
                                    fouls: fouls,
                                    turnovers: turnovers,
                                    plusMinus: plusMinus,
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
                let totMins = 0;
                let totOffReb = 0;
                let totDefReb = 0;
                let fgm = 0;
                let fga = 0;
                let ftm = 0;
                let fta = 0;
                let tpm = 0;
                let tpa = 0;
                let totFouls = 0;
                let totTOs = 0;
                let plusminus = 0;
                let gamesPlayed = playerData.length;
                // Adding up stats
                for (let i = 0; i < gamesPlayed; i++) {
                    totPoints = totPoints + playerData[i].points;
                    totAssists = totAssists + playerData[i].assists;
                    totRebounds = totRebounds + playerData[i].rebounds;
                    totSteals = totSteals + playerData[i].steals;
                    totBlocks = totBlocks + playerData[i].blocks;
                    totMins = totMins + playerData[i].mins;
                    totOffReb = totOffReb + playerData[i].offReb;
                    totDefReb = totDefReb + playerData[i].defReb;
                    fgm = fgm + playerData[i].fgm;
                    fga = fga + playerData[i].fga;
                    ftm = ftm + playerData[i].ftm;
                    fta = fta + playerData[i].fta;
                    tpm = tpm + playerData[i].tpm;
                    tpa = tpa + playerData[i].tpa;
                    totFouls = totFouls + playerData[i].fouls;
                    totTOs = totTOs + playerData[i].turnovers;
                    plusminus = plusminus + playerData[i].plusminus;
                }
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
                            totOffReb: totOffReb,
                            totDefReb: totDefReb,
                            fgm: fgm,
                            fga: fga,
                            ftm: ftm,
                            fta: fta,
                            tpm: tpm,
                            tpa: tpa,
                            totFouls: totFouls,
                            totTOs: totTOs,
                            totMins: totMins,
                            gamesPlayed: gamesPlayed,
                            plusminus: plusminus,
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
                let totMins = 0;
                let totOffReb = 0;
                let totDefReb = 0;
                let fgm = 0;
                let fga = 0;
                let ftm = 0;
                let fta = 0;
                let tpm = 0;
                let tpa = 0;
                let totFouls = 0;
                let totTOs = 0;
                
                let gamesPlayed = playerData.length;
                for (let i = 0; i < gamesPlayed; i++) {
                    totPoints = totPoints + playerData[i].points;
                    totAssists = totAssists + playerData[i].assists;
                    totRebounds = totRebounds + playerData[i].rebounds;
                    totSteals = totSteals + playerData[i].steals;
                    totBlocks = totBlocks + playerData[i].blocks;
                    totMins = totMins + playerData[i].mins;
                    totOffReb = totOffReb + playerData[i].offReb;
                    totDefReb = totDefReb + playerData[i].defReb;
                    fgm = fgm + playerData[i].fgm;
                    fga = fga + playerData[i].fga;
                    ftm = ftm + playerData[i].ftm;
                    fta = fta + playerData[i].fta;
                    tpm = tpm + playerData[i].tpm;
                    tpa = tpa + playerData[i].tpa;
                    totFouls = totFouls + playerData[i].fouls;
                    totTOs = totTOs + playerData[i].turnovers;

                }
                const ppg = (totPoints / gamesPlayed).toFixed(1);
                const apg = (totAssists / gamesPlayed).toFixed(1);
                const rpg = (totRebounds / gamesPlayed).toFixed(1);
                const offrpg = (totOffReb / gamesPlayed).toFixed(1);
                const defrpg = (totDefReb / gamesPlayed).toFixed(1);
                const spg = (totSteals / gamesPlayed).toFixed(1);
                const bpg = (totBlocks / gamesPlayed).toFixed(1);
                const mpg = (totMins / gamesPlayed).toFixed(1);
                const fgmA = (fgm / gamesPlayed).toFixed(1);
                const fgaA = (fga / gamesPlayed).toFixed(1);
                const fgp = ((fgm / fga) * 100).toFixed(1);
                const ftmA = (ftm / gamesPlayed).toFixed(1);
                const ftaA = (fta / gamesPlayed).toFixed(1);
                const ftp = ((ftm / fta) * 100).toFixed(1);
                const tpmA = (tpm / gamesPlayed).toFixed(1);
                const tpaA = (tpa / gamesPlayed).toFixed(1);
                const tpp = ((tpm / tpa) * 100).toFixed(1);
                const foulspg = (totFouls / gamesPlayed).toFixed(1);
                const topg = (totTOs / gamesPlayed).toFixed(1);
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
                            offrpg: offrpg,
                            defrpg: defrpg,
                            spg: spg,
                            bpg: bpg,
                            mpg: mpg,
                            fgmA: fgmA,
                            fgaA: fgaA,
                            fgp: fgp,
                            ftmA: ftmA,
                            ftaA: ftaA,
                            ftp: ftp,
                            tpmA: tpmA,
                            tpaA: tpaA,
                            tpp: tpp,
                            foulspg: foulspg,
                            topg: topg,
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
            for (let i = 0; i < result.response.length; i++) {
                if (result.response[i].team.nickname === "Hawks") {
                    let id = result.response[i].player.id;
                    let points = result.response[i].points;
                    let assists = result.response[i].assists;
                    let rebounds = result.response[i].totReb;
                    let mins = result.response[i].min;
                    let offReb = result.response[i].offReb;
                    let defReb = result.response[i].defReb;
                    let steals = result.response[i].steals;
                    let blocks = result.response[i].blocks;
                    let gameID = result.response[i].game.id;
                    let fgm = result.response[i].fgm;
                    let fga = result.response[i].fga;
                    let fgp = result.response[i].fgp;
                    let ftm = result.response[i].ftm;
                    let fta = result.response[i].fta;
                    let ftp = result.response[i].ftp;
                    let tpm = result.response[i].tpm;
                    let tpa = result.response[i].tpa;
                    let tpp = result.response[i].tpp;
                    let fouls = result.response[i].pFouls;
                    let turnovers = result.response[i].turnovers;
                    let plusMinus = result.response[i].plusMinus;
                    try {
                        const result = await fetch('http://localhost:3001/player/insert_stats', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                playerID: id,
                                gameID: gameID,
                                mins: mins,
                                points: points,
                                assists: assists,
                                rebounds: rebounds,
                                offReb: offReb,
                                defReb: defReb,
                                steals: steals,
                                blocks: blocks,
                                fgm: fgm,
                                fga: fga,
                                fgp: fgp,
                                ftm: ftm,
                                fta: fta,
                                ftp: ftp,
                                tpm: tpm,
                                tpa: tpa,                                    tpp: tpp,
                                fouls: fouls,
                                turnovers: turnovers,
                                plusMinus: plusMinus,
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

    // calls the getPlayerTotals and getPlayerAverages methods for all Hawks players
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

    

    return (
        <div className={styles.box}>
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