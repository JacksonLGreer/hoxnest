import styles from "./PlayerCard.module.css";

export default function PlayerCard( {player} : {player:any} ) {

    return (
        <div className={styles.playerStyle}>
            <p>{player.Name}</p>
            <p>{player.Position}</p>
            <p>{player.pts}</p>
            <p>{player.ast}</p>
            <p>{player.reb}</p>
            <p>{player.stl}</p>
            <p>{player.blk}</p>

        </div>
    )
}