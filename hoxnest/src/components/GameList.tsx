"use client"

import react from "react";
import { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard"
import styles from "./GameList.module.css";
import GameCard from "./GameCard";

export default function GameList() {

    let [gameList, setGameList] = useState([]);

    useEffect(() => {
        getGames();
    }, [])


    // Pulls all of the Hawks games from 2024-25 from the API and puts them into the DB
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9e140c858bmsh3a85aced8c64059p1e3242jsn5a6f2a6de09d',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    const fetchAllGamesAPI = async () => {
        try {
            const response = await fetch(`https://api-nba-v1.p.rapidapi.com/games?season=2024&team=1`, options);
            const result = await response.json();

            for (let i = 4; i < result.response.length; i++) {
                let opponent;
                let hawksScore;
                let oppScore;
                let location;
                let date;
                let gameId;

                // Determine if Hawks were home or away and sets opponent
                if (result.response[i].teams.home.nickname === "Hawks") {
                    opponent = result.response[i].teams.visitors.nickname;
                    hawksScore = result.response[i].scores.home.points;
                    oppScore = result.response[i].scores.visitors.points;
                    location = result.response[i].arena.city;
                    date = result.response[i].date.start;
                    gameId = result.response[i].id;
                } else {
                    opponent = result.response[i].teams.home.nickname;
                    hawksScore = result.response[i].scores.visitors.points;
                    oppScore = result.response[i].scores.home.points;
                    location = result.response[i].arena.city;
                    date = result.response[i].date.start;
                    gameId = result.response[i].id;
                }
                console.log(opponent, hawksScore, oppScore, location, date, gameId);
                try {
                    const send = await fetch('http://localhost:3001/games/update_games', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify({
                            opponent: opponent,
                            hawksScore: hawksScore,
                            oppScore: oppScore,
                            location: location,
                            date: date,
                            gameId: gameId,
                        })
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getGames = async () => {
        try {
            const response = await fetch('http://localhost:3001/games',);
            if (!response.ok) {
                const errorData = await response.json();
                return console.error('Error fetching games: ', errorData.message);
            }
            const gameData = await response.json();
            setGameList(gameData);
            
        } catch (err) {
            console.log('Error in fetching game data: ', err);
        }
    }

    return (
        <div>
            <div className={styles.listTop}>
                <p>Home</p>
                <p>Home Score</p>
                <p>Visitor Score</p>
                <p>Visitor</p>
                <p>Location</p>
                <p>Date</p>
            </div>
            {gameList.map((game, index) => (
                <GameCard 
                    key={index}
                    game={game}
                />
            ))}
            
        </div>
    )
}