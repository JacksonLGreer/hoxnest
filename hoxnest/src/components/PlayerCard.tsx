import styles from "./PlayerCard.module.css";

export default function PlayerCard( {player} : {player:any} ) {

    return (
        <div className={styles.playerStyle}>
            <p>{player.Name}</p>
            <p>{player.Position}</p>
            <p>{player.ppg}</p>
            <p>{player.apg}</p>
            <p>{player.rpg}</p>
            <p>{player.spg}</p>
            <p>{player.bpg}</p>

        </div>
    )
}