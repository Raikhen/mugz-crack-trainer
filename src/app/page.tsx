"use client";
import Dashboard from "@/components/Dashboard";
import Image from "next/image";

import db from "../lib/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { LoadingCard } from "@/components/LoadingCard";

// Load cool font for title
import { Bungee } from 'next/font/google'
const font = Bungee({ subsets: ['latin'], weight: ['400'] })

interface Route {
  id: string,
  name: string,
  colors: string[],
}

interface Log {
  id: string,
  climber: string,
  date: string,
  route: string,
  laps: number,
}

async function fetchRoutes() {
  const snapshot = await getDocs(collection(db, "routes"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    colors: doc.data().colors,
  }));
}

async function fetchLogs() {
  const snapshot = await getDocs(collection(db, "logs"));
  const routes = await fetchRoutes();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    climber: doc.data().climber,
    date: doc.data().date.toDate().toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: '2-digit' }),
    route: routes.find((route : Route) => route.id === doc.data().route.id)?.name,
    laps: doc.data().laps,
  }));
}

export default function Home() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    fetchRoutes().then((routes) => setRoutes(routes));
    fetchLogs().then((logs) => setLogs(logs));
  }, []);

  const loading = routes.length === 0 || logs.length === 0;

  return (
    <div className="flex flex-col">
      <Image
        alt="Background image"
        width={10000}
        height={10000}
        src="/snowy.jpeg"
        className="fixed -z-10 min-h-screen opacity-100"
      />
      <header className="fixed min-w-full flex items-center justify-center px-4 py-4 border-b shadow-xl lg:px-6 text-center bg-white">
        <h1 className={`text-xl font-bold sm:text-2xl text-neutral-800 ${font.className}`}>
          Mugz Crack Trainer
        </h1>
      </header>
      {loading ?
        <div className="w-full flex items-center justify-center mt-20 p-6 lg:p-10">
            <LoadingCard text="Fetching data..." />
        </div> :
        <Dashboard routes={routes} logs={logs} />
      }
    </div>
  );
}
