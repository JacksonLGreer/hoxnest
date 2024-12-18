import Image from "next/image";
import Header from "../components/Header";
import PlayerList from "../components/PlayerList";

export default function Home() {
  return (
    <div >
      <Header />
      <PlayerList />
    </div>
  );
}
