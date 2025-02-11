import Image from "next/image";
import Header from "../../components/nav/Header";
import GameList from "../../components/GameList";
export default function Home() {
  return (
    <div>
      <Header />
      <div>      
        <GameList />
      </div>
    </div>
  );
}