import react from "react";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <div className={styles.headerDiv}>
            <div className={styles.corner}>
                <button>HoxNest</button>
            </div>
            <div className={styles.button}>
                <button>Statistics</button>
                <button>Schedule</button>
                <button>Button</button>
            </div>
        </div>
    )
}