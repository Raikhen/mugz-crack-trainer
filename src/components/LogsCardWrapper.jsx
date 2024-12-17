"use client";
import LogsCard from "./LogsCard";
import { collection, onSnapshot } from "firebase/firestore";
import db from "@/lib/firebase/firestore";
import { useEffect, useState } from "react";

export default function LogsCardWrapper({ logs, routes }) {
  const [updatedLogs, setLogs] = useState(logs);

  useEffect(() => {
    const logsRef = collection(db, "logs");

    const unsubscribe = onSnapshot(logsRef, (snapshot) => {
      const logsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        climber: doc.data().climber,
        route: routes.find((route) => route.id === doc.data().route.id)?.name,
        date: doc.data().date.toDate().toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: '2-digit' }),
        laps: doc.data().laps,
      }));

      setLogs(logsData);
    });

    return () => unsubscribe();
  }, [routes]);

  return <LogsCard logs={updatedLogs} />;
}