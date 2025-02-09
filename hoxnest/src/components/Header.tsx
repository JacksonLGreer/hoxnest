"use client"
import react from "react";
import { useRouter } from 'next/navigation';
import styles from "./Header.module.css";

export default function Header() {
    const router = useRouter();
    return (
        <div className={styles.headerDiv}>
            <div className={styles.corner}>
                <button onClick={() => router.push('./')}>HoxNest</button>
            </div>
            <div className={styles.button}>
                <button onClick={() => router.push('./statistics')}>Statistics</button>
                <button onClick={() => router.push('./schedule')}>Schedule</button>
                <button onClick={() => router.push('./')}>Button</button>
            </div>
        </div>
    )
}