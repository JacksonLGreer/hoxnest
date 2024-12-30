"use client"

import react from "react";
import { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard"
import styles from "./PlayerList.module.css";

export default function PlayerList() {

    
    // This component displays a list of all the Hawks players and their main counting stats
    const [playerList, setPlayerList] = useState([]);
    const [idList, setidList] = useState([1046]);

    
    useEffect(() =>{
        const fetchPlayers = async () => {
            try {
                const response = await fetch(`http://localhost:3001/players`,);
                if (!response.ok) {
                    const errorData = await response.json();
                    return console.error('Error fetching players: ', errorData.message);  
                }
                const playerData = await response.json();
                setPlayerList(playerData);
            } catch (err) {
                console.log('Error in fetching player data: ', err);
            }
        }
        fetchPlayers(); // IMPORTANT: remember to call the function here!
        //fetchPlayerIDs();
        //getGame();
        //idList.map(id => {
          //  fetchStats(id);
        //})
    }, [])

    // fetches a specific player's stats from the API
    // Currently only Trae Young player ID 1046
    const statsOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9e140c858bmsh3a85aced8c64059p1e3242jsn5a6f2a6de09d',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    const fetchStats = async (id: number) => {
        try {
                const response = await fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?id=${id}&season=2024`, statsOptions);
                const result = await response.json();
                
                const ppg = (result.response.slice(3).reduce((a: number,v: {points: number}) => a = a + v.points, 0) / (result.response.length -3)).toFixed(1);
                const rpg = (result.response.slice(3).reduce((a: number,v: {totReb: number}) => a = a + v.totReb, 0) / (result.response.length -3)).toFixed(1);
                const apg = (result.response.slice(3).reduce((a: number,v: {assists: number}) => a = a + v.assists, 0) / (result.response.length -3)).toFixed(1);
                const spg = (result.response.slice(3).reduce((a: number,v: {steals: number}) => a = a + v.steals, 0) / (result.response.length -3)).toFixed(1);
                const bpg = (result.response.slice(3).reduce((a: number,v: {blocks: number}) => a = a + v.blocks, 0) / (result.response.length -3)).toFixed(1);
                console.log(result.response)

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


    const url = 'https://api-nba-v1.p.rapidapi.com/games?id=14087';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '9e140c858bmsh3a85aced8c64059p1e3242jsn5a6f2a6de09d',
		'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
	}
};
const getGame = async () => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

    

    // fetches the players on the Hawks, want to get specific player IDs
    const playerIDUrl = 'https://api-nba-v1.p.rapidapi.com/players?team=1&season=2024';
    const playerIDOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9e140c858bmsh3a85aced8c64059p1e3242jsn5a6f2a6de09d',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    const fetchPlayerIDs = async () => {
        try {
            const response = await fetch(playerIDUrl, playerIDOptions);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }

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