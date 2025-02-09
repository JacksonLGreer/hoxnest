import styles from "./StatCard.module.css";

export default function StatCard( {player} : {player:any} ) {

    return (
        <div className={styles.playerStyle}>
            <p>{player.Name}</p>
            <p>{player.Position}</p>
            <p>{player.mpg}</p>
            <p>{player.ppg}</p>
            <p>{player.apg}</p>

            <p>{player.offrpg}</p>
            <p>{player.defrpg}</p>
            <p>{player.rpg}</p>
            <p>{player.spg}</p>
            <p>{player.bpg}</p>
            <p>{player.fgmA}</p>
            <p>{player.fgaA}</p>
            <p>{player.fgp}</p>
            <p>{player.ftmA}</p>
            <p>{player.ftaA}</p>
            <p>{player.ftp}</p>
            <p>{player.tpmA}</p>
            <p>{player.tpaA}</p>
            <p>{player.tpp}</p>
            <p>{player.foulspg}</p>
            <p>{player.topg}</p>
            <p>{player.plusminus}</p>
        </div>
    )
}