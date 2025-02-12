import Image from "next/image";
import Sidebar from "../../components/nav/Sidebar";
import GameList from "../../components/GameList";
export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="m-10">      
        <GameList />
      </div>
    </div>
  );
}