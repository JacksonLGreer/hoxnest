"use client"

import react from "react";
import { useState, useEffect } from "react";
import styles from "./Standings.module.css";
import StandingCard from "./StandingCard"

export default function Standings() {

    const [standings, setStandings] = useState([]);


    useEffect(() => {
        updateStandings();
        fetchStandings();
    }, [])

    const fetchStandings = async () => {
        try {
            const response = await fetch(`http://localhost:3001/standings`,);
            if (!response.ok) {
                const errorData = await response.json();
                return console.error('Error fetching standings: ', errorData.message);
            }
            const standingsData = await response.json();
            setStandings(standingsData);
            standingsData.sort((a: {wins: number}, b: {wins: number}) => b.wins - a.wins);
        } catch (err) {
            console.error(err);
        }
    }   


    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9e140c858bmsh3a85aced8c64059p1e3242jsn5a6f2a6de09d',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    const updateStandings = async () => {
        try {
            const response = await fetch('https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2024&conference=east', options);
            const result = await response.json();
            for (let i = 0; i < result.response.length; i++) {

                let team = result.response[i].team.nickname;
                let wins = result.response[i].win.total;
                let losses = result.response[i].loss.total;

                try {
                    const send = await fetch('http://localhost:3001/standings/update_standings', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify({
                            wins: wins,
                            losses: losses,
                            team: team,
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

    const getStandingsAPI = async () => {
        try {
            const response = await fetch('https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2024&conference=east', options);
            const result = await response.json();
            for (let i = 0; i < result.response.length; i++) {

                let team = result.response[i].team.nickname;
                let wins = result.response[i].win.total;
                let losses = result.response[i].loss.total;
                let logo = result.response[i].team.logo;

                try {
                    const send = await fetch('http://localhost:3001/standings/insert_standings', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify({
                            team: team,
                            wins: wins,
                            losses: losses,
                            logo: logo,
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

    return (
        <div className={styles.box}>
            <div className={styles.listTop}>
                <p>Team</p>
                <p>Wins</p>
                <p>Losses</p>
            </div>
            {standings.map((team, index) => (
                <StandingCard 
                    key={index}
                    team={team}
                />
            ))}
        </div>
    )
}