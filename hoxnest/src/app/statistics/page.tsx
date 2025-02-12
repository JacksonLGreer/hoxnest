import Image from "next/image";
import Header from "../../components/nav/Header";
import styles from "./statistics.module.css";
import Statistics from "./statistics";
import Sidebar from "../../components/nav/Sidebar";
export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="m-10">      
        <Statistics />
      </div>
    </div>
  );
}