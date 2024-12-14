"use client";
import Image from "next/image";

import ClimbCard from "./ClimbCard";
import LogsCard from "./LogsCard";
import { app } from "../lib/firebase/config";

export default function Dashboard({ routes, logs }) {
  console.log(app)

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
        <h1 className="text-xl font-bold sm:text-2xl">Mugz Crack Trainer</h1>
      </header>
      <main className="mt-20">
        <div className="w-full">
          <div className="flex flex-col space-y-6 max-w-4xl p-6 justify-center m-auto">
            <ClimbCard routes={routes} />
            <LogsCard logs={logs}/>
          </div>
        </div>
      </main>
    </div>
  )
}

// 