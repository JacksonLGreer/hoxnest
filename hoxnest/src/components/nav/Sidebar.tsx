"use client"
import react from "react";
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const router = useRouter();
    return (
        <div className="h-screen grid grid-cols-[240px_1fr]">
            <nav className="border-r flex-1 bg-black width-100">
                <button onClick={() => router.push('./')} className="text-lg flex items-center h-[60px] border-b bg-black hover:bg-hawks-red p-4 text-hawks-yellow w-full">
                    <img className="w-10" src="https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg" alt="hoxLogo"></img>
                    <p className="flex items-center font-semibold p-2">HoxNest</p>
                </button>
                <button className="pl-6 text-sm flex items-center h-[50px] bg-black hover:bg-hawks-red p-2 text-hawks-yellow w-full" onClick={() => router.push('./statistics')}>
                    <Chart  />
                    <p className="flex items-center gap-2 font-semibold p-4" >Statistics</p>
                </button>
                <button className=" pl-6 text-sm flex items-center h-[50px] bg-black hover:bg-hawks-red p-2 text-hawks-yellow w-full" onClick={() => router.push('./schedule')}>
                    <Calendar  />
                    <p className="flex items-center gap-2 font-semibold p-4" >Schedule</p>
                </button>
               
            </nav>
        </div>
        
    )
}

// These are functions that declare the emblems on the buttons of the Sidebar.
// They use the Lucide react package
  function Chart(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-chart-column-increasing">
            <path d="M13 17V9"/>
            <path d="M18 17V5"/>
            <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
            <path d="M8 17v-3"/>
        </svg>
    )
  }

  function Calendar(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
            strokeLinejoin="round" 
            className="lucide lucide-calendar-days">
            <path d="M8 2v4"/>
            <path d="M16 2v4"/>
            <rect width="18" height="18" x="3" y="4" rx="2"/>
            <path d="M3 10h18"/>
            <path d="M8 14h.01"/>
            <path d="M12 14h.01"/>
            <path d="M16 14h.01"/>
            <path d="M8 18h.01"/>
            <path d="M12 18h.01"/>
            <path d="M16 18h.01"/>
        </svg>
    )
  }
