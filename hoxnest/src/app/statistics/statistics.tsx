"use client"

import react from "react";
import { useState, useEffect } from "react";
import styles from "./statistics.module.css";
import StatCard from "./StatCard";

export default function Statistics() {

    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
        fetchPlayers("none");
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
                playerData.sort((a: {ppg: number}, b: {ppg: number}) => b.ppg - a.ppg);
            } else if (sort ==="mpg") {
                playerData.sort((a: {mpg: number}, b: {mpg: number}) => b.mpg - a.mpg);
            }else if (sort ==="apg") {
                playerData.sort((a: {apg: number}, b: {apg: number}) => b.apg - a.apg);
            } else if (sort ==="rpg") {
                playerData.sort((a: {rpg: number}, b: {rpg: number}) => b.rpg - a.rpg);
            } else if (sort ==="spg") {
                playerData.sort((a: {spg: number}, b: {spg: number}) => b.spg - a.spg);
            } else if (sort ==="bpg") {
                playerData.sort((a: {bpg: number}, b: {bpg: number}) => b.bpg - a.bpg);
            } else if (sort ==="orpg") {
                playerData.sort((a: {orpg: number}, b: {orpg: number}) => b.orpg - a.orpg);
            } else if (sort ==="drpg") {
                playerData.sort((a: {drpg: number}, b: {drpg: number}) => b.drpg - a.drpg);
            } else if (sort ==="fgm") {
                playerData.sort((a: {fgmA: number}, b: {fgmA: number}) => b.fgmA - a.fgmA);
            } else if (sort ==="fga") {
                playerData.sort((a: {fgaA: number}, b: {fgaA: number}) => b.fgaA - a.fgaA);
            } else if (sort ==="fgp") {
                playerData.sort((a: {fgp: number}, b: {fgp: number}) => b.fgp - a.fgp);
            } else if (sort ==="ftm") {
                playerData.sort((a: {ftmA: number}, b: {ftmA: number}) => b.ftmA - a.ftmA);
            } else if (sort ==="fta") {
                playerData.sort((a: {ftaA: number}, b: {ftaA: number}) => b.ftaA - a.ftaA);
            } else if (sort ==="ftp") {
                playerData.sort((a: {ftp: number}, b: {ftp: number}) => b.ftp - a.ftp);
            } else if (sort ==="tpm") {
                playerData.sort((a: {tpmA: number}, b: {tpmA: number}) => b.tpmA - a.tpmA);
            } else if (sort ==="tpa") {
                playerData.sort((a: {tpaA: number}, b: {tpaA: number}) => b.tpaA - a.tpaA);
            } else if (sort ==="tpp") {
                playerData.sort((a: {tpp: number}, b: {tpp: number}) => b.tpp - a.tpp);
            } else if (sort ==="fouls") {
                playerData.sort((a: {foulspg: number}, b: {foulspg: number}) => b.foulspg - a.foulspg);
            } else if (sort ==="tos") {
                playerData.sort((a: {topg: number}, b: {topg: number}) => b.topg - a.topg);
            } else if (sort ==="pm") {
                playerData.sort((a: {plusminus: number}, b: {plusminus: number}) => b.plusminus - a.plusminus);
            }
            
        } catch (err) {
            console.log('Error in fetching player data: ', err);
        }
    }

    return (
        //border-b-2 border-hawks-red border-double p-[10px] h-[650px]
        <div className={styles.box}>
            <div className="grid grid-cols-22custom text-center font-bold pt-5px border-b-2 border-hawks-red">
                <p>Name</p>
                <p>Position</p>
                <button className="" onClick={() => fetchPlayers("mpg")} >Minutes</button>
                <button className="" onClick={() => fetchPlayers("ppg")} >Points</button>
                <button className="" onClick={() => fetchPlayers("apg")} >Assists</button>
                <button className="" onClick={() => fetchPlayers("orpg")} >OffRebs</button>
                <button className="" onClick={() => fetchPlayers("drpg")} >DefRebs</button>
                <button className="" onClick={() => fetchPlayers("rpg")} >Rebounds</button>
                <button className="" onClick={() => fetchPlayers("spg")} >Steals</button>
                <button className="" onClick={() => fetchPlayers("bpg")} >Blocks</button>
                <button className="" onClick={() => fetchPlayers("fgm")} >FG Made</button>
                <button className="" onClick={() => fetchPlayers("fga")} >FG Att</button>
                <button className="" onClick={() => fetchPlayers("fgp")} >FG %</button>
                <button className="" onClick={() => fetchPlayers("ftm")} >FT Made</button>
                <button className="" onClick={() => fetchPlayers("fta")} >FT Att</button>
                <button className="" onClick={() => fetchPlayers("ftp")} >FT %</button>
                <button className="" onClick={() => fetchPlayers("tpm")} >3P Made</button>
                <button className="" onClick={() => fetchPlayers("tpa")} >3P Att</button>
                <button className="" onClick={() => fetchPlayers("tpp")} >3P %</button>
                <button className="" onClick={() => fetchPlayers("fouls")} >Fouls</button>
                <button className="" onClick={() => fetchPlayers("tos")} >Turnovers</button>
                <button className="" onClick={() => fetchPlayers("pm")} >PlusMinus</button>
            </div>
            {playerList.map((player, index) => (
                <StatCard 
                    key={index}
                    player={player}
                />
            ))}
            
        </div>
    )
}