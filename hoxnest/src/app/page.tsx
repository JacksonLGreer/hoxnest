import Image from "next/image";
import Header from "../components/nav/Header";
import Sidebar from "../components/nav/Sidebar";

import PlayerList from "../components/PlayerList";
import GameList from "../components/GameList";
import Standings from "../components/Standings";
export default function Home() {
  return (
    <div className="flex gap-10 mr-10">
      <Sidebar /> 
      <div className="grid grid-cols-3 gap-10 mt-[4em]">
        <PlayerList />
        <GameList />  
        <Standings />
      </div>
      
      
    </div>
  );
}
