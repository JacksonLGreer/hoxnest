import Image from "next/image";
import Header from "../../components/nav/Header";
import styles from "./statistics.module.css";
import Statistics from "./statistics";
export default function Home() {
  return (
    <div>
      <Header />
      <div className={styles.stat}>      
        <Statistics />
      </div>
    </div>
  );
}