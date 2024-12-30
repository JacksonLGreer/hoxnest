"use client"

import react from "react";
import { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard"
import styles from "./PlayerList.module.css";


export default function PlayerList() {

    
    // This component displays a list of all the Hawks players and their main counting stats
    const [playerList, setPlayerList] = useState([]);

    
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
        fetchStats();
    }, [])

    // fetches whole teams stats
    const statsOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9e140c858bmsh3a85aced8c64059p1e3242jsn5a6f2a6de09d',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    const fetchStats = async () => {
        try {
                const response = await fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?id=1046&season=2024`, statsOptions);
                const result = await response.json();
                const ppg = result.response.reduce((a: number,v: {points: number}) => a = a + v.points, 0) / (result.response.length - 1);
                console.log(ppg);
        } catch (err) {
            console.error(err);
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
            const result = await response.text();
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