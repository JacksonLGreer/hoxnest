import styles from "./standingCard.module.css";

export default function StandingCard( {team} : {team:any} ) {

    return (
        <div className={styles.standingStyle}>
            <p>{team.team}</p>
            <img width={20} src={team.logo}></img>
            <p>{team.wins}</p>
            <p>{team.losses}</p>
        </div>
    )
}