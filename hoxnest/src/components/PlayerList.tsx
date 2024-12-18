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
    }, [])
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