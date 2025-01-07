import Image from "next/image";
import Header from "../components/Header";
import PlayerList from "../components/PlayerList";
import GameList from "../components/GameList";
import Standings from "../components/Standings";
export default function Home() {
  return (
    <div >
      <Header />
      <Standings />
    </div>
  );
}
