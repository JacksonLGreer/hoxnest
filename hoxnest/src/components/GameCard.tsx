import styles from "./gameCard.module.css";

export default function GameCard( {game} : {game:any} ) {

    return (
        <div>
            {game.location == 'Atlanta' && game.hawksScore > game.oppScore &&
            <div className={styles.gameStyle}>
                <p>Hawks</p>            
                <p className={styles.win}>{game.hawksScore}</p>
                <p>{game.oppScore}</p>
                <p>{game.opponent}</p>
                <p>{game.location}</p>
                <p>{game.date}</p>
            </div>
            }
            {game.location == 'Atlanta' && game.hawksScore < game.oppScore &&
            <div className={styles.gameStyle}>
                <p>Hawks</p>            
                <p >{game.hawksScore}</p>
                <p className={styles.loss}>{game.oppScore}</p>
                <p>{game.opponent}</p>
                <p>{game.location}</p>
                <p>{game.date}</p>
            </div>
            }
            {game.location != 'Atlanta' && game.hawksScore > game.oppScore &&
            <div className={styles.gameStyle}>
                <p>{game.opponent}</p>
                <p>{game.oppScore}</p>
                <p className={styles.win}>{game.hawksScore}</p>
                <p>Hawks</p>
                <p>{game.location}</p>
                <p>{game.date}</p>
            </div>
            }
            {game.location != 'Atlanta' && game.hawksScore < game.oppScore &&
            <div className={styles.gameStyle}>
                <p>{game.opponent}</p>
                <p className={styles.loss}>{game.oppScore}</p>
                <p >{game.hawksScore}</p>
                <p>Hawks</p>
                <p>{game.location}</p>
                <p>{game.date}</p>
            </div>
            }
            
            {game.location != 'Atlanta' && game.hawksScore == game.oppScore &&
            <div className={styles.gameStyle}>
                <p>{game.opponent}</p>
                <p className={styles.loss}>{game.oppScore}</p>
                <p >{game.hawksScore}</p>
                <p>Hawks</p>
                <p>{game.location}</p>
                <p>{game.date}</p>
            </div>
            }

            {game.location == 'Atlanta' && game.hawksScore == game.oppScore &&
            <div className={styles.gameStyle}>
                <p>{game.opponent}</p>
                <p >{game.oppScore}</p>
                <p >{game.hawksScore}</p>
                <p>Hawks</p>
                <p>{game.location}</p>
                <p>{game.date}</p>
            </div>
            }

        </div>
    )
}