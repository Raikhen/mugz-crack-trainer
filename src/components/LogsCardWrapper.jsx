"use client";
import LogsCard from "./LogsCard";
import { collection, onSnapshot } from "firebase/firestore";
import db from "@/lib/firebase/firestore";
import { useEffect, useState } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export default function LogsCardWrapper({ logs, routes }) {
  const [updatedLogs, setLogs] = useState(logs);

  const f = function() {
    signInAnonymously(auth);

    const logsRef = collection(db, "logs");

    const unsubscribe = onSnapshot(logsRef, (snapshot) => {
      const logsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        climber: doc.data().climber,
        route: routes.find((route) => route.id === doc.data().route.id)?.name,
        date: doc.data().date.toDate().toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: '2-digit' }),
        dateNumeric: doc.data().date.toDate().getTime(),
        laps: doc.data().laps,
      }));

      setLogs(logsData);
    });

    return () => unsubscribe();
  }

  useEffect(() => {
    return f()
  }, [routes]);

  return <LogsCard logs={updatedLogs} />;
}