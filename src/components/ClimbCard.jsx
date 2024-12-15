"use client";
import { useState } from "react";

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

export default function ClimbCard({ routes }) {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [isClimbing, setIsClimbing] = useState(false);

  const buttonHandle = () => {
    if (isClimbing) {
      setIsClimbing(false);
    } else {
      setIsClimbing(true);
    }
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-neutral-800">Climb</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Your name" />
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