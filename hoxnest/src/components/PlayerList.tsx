"use client"

import react from "react";
import { useState } from "react";
import PlayerCard from "./PlayerCard"
import styles from "./PlayerList.module.css";

export default function PlayerList() {
    // This component displays a list of all the Hawks players and their main counting stats
    const [playerList, setPlayerList] = useState([
        {
            name: "Trae Young",
            pos: "PG",
            pts: 1,
            ast: 12,
            reb: 1,
            stl: 1,
            blk: 1
        },
        {
            name: "Jalen Johnson",
            pos: "PF",
            pts: 2,
            ast: 1,
            reb: 10,
            stl: 2,
            blk: 2
        }
    ])

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