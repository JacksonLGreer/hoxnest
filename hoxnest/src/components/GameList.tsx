"use client"

import react from "react";
import { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard"
import styles from "./GameList.module.css";
import GameCard from "./GameCard";

export default function GameList() {

    let [gameList, setGameList] = useState([]);

    useEffect(() => {
        fetchGameByID(14620);
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
                    const send = await fetch('http://localhost:3001/games/insert_games', {
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

    // Retrieves the list of games from the DB to display the schedule and scores from played games
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

    // Pulls all of the Hawks games from 2024-25 from the API and puts them into the DB
    const fetchGameByID = async (gameID: number) => {
        try {
            const response = await fetch(`https://api-nba-v1.p.rapidapi.com/games?id=${gameID}`, options);
            const result = await response.json();
            let hawksScore;
            let oppScore;
            let gameId;
            // Determine if Hawks were home or away and sets opponent
            if (result.response[0].teams.home.nickname === "Hawks") {
                hawksScore = result.response[0].scores.home.points;
                oppScore = result.response[0].scores.visitors.points;
                gameId = result.response[0].id;
            } else {
                hawksScore = result.response[0].scores.visitors.points;
                oppScore = result.response[0].scores.home.points;
                gameId = result.response[0].id;
            }
            console.log(hawksScore, oppScore, gameId);
            try {
                const send = await fetch('http://localhost:3001/games/update_games', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        hawksScore: hawksScore,
                        oppScore: oppScore,
                        gameId: gameId,
                    })
                });
                console.log("sent")
            } catch (err) {
                console.error(err);
            }
        } catch (err) {
            console.log("Error adding game score: " + err);
        }
    } // fetchGameByID

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