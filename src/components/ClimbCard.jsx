"use client";
import { useState } from "react";
import db from "../lib/firebase/firestore";
import { collection, getDocs, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import RouteVisualizer from "./RouteVisualizer";
import { useEffect } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../lib/firebase/config";

async function startClimb(routeId) {
  const routesRef = collection(db, "routes");
  const routeDocRef = doc(db, "routes", routeId);

  // Set route as active with climber
  await updateDoc(routeDocRef, { active: true, laps: 0 });

  // Set other routes as inactive
  const querySnapshot = await getDocs(routesRef);

  querySnapshot.forEach((route) => {
    if (route.id !== routeId) {
      updateDoc(doc(routesRef, route.id), { active: false, laps: 0 });
    }
  });
}

async function finishClimb(routeId, climber) {
  // Save log
  const routesRef = collection(db, "routes");
  const routeDoc = await getDoc(doc(routesRef, routeId));
  const routeData = routeDoc.data();
  const laps = routeData?.laps || 0;
  const routeDocRef = doc(db, "routes", routeId);

  if (laps > 0) {
    const logsRef = collection(db, "logs");

    await setDoc(
      doc(logsRef),
      {
        climber: climber,
        date: new Date(),
        route: routeDocRef,
        laps,
      }
    );
  }

  // Set route as inactive
  await updateDoc(routeDocRef, { active: false, laps: 0 });
}

export default function ClimbCard({ routes }) {
  const [name, setName] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [isClimbing, setIsClimbing] = useState(false);

  useEffect(() => {
    signInAnonymously(auth);
  }, []);

  const buttonHandle = () => {
    if (isClimbing) {
      setIsClimbing(false);
      finishClimb(selectedRoute, name);
    } else {
      setIsClimbing(true);
      startClimb(selectedRoute);
    }
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-neutral-800">Climb</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        <div className="flex flex-row gap-3 w-full">
          <Select value={selectedRoute} onValueChange={setSelectedRoute}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select route" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {routes.map((route) => (
                <SelectItem key={route.id} value={route.id}>
                  <div className="flex flex-row items-center justify-between gap-3 min-w-[300px]">
                    <div className="text-left text-nowrap">{route.name}</div>
                    <RouteVisualizer className="w-full" route={route} />
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className={`w-[6em] transition-colors duration-500 ${!isClimbing ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'}`}
            onClick={buttonHandle}
          >
            {isClimbing ? 'Finish' : 'Climb'}
          </Button>
        </div>
        
      </CardContent>
    </Card>
  );
}