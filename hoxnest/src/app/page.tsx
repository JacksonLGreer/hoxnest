import Image from "next/image";
import Header from "../components/Header";
import PlayerList from "../components/PlayerList";
import GameList from "../components/GameList";
export default function Home() {
  return (
    <div >
      <Header />
      <GameList />
    </div>
  );
}
