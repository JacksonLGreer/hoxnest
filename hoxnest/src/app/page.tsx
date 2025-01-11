import Image from "next/image";
import Header from "../components/Header";
import PlayerList from "../components/PlayerList";
import GameList from "../components/GameList";
import Standings from "../components/Standings";
import styles from "./page.module.css";
export default function Home() {
  return (
    <div>
      <Header />
      <div className={styles.home}>      
        <PlayerList />
        <GameList />  
        <Standings />
      </div>
    </div>
  );
}
