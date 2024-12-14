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

export default function ClimbCard({ routes }) {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [isClimbing, setIsClimbing] = useState(false);

  const handleClimb = () => {
    setIsClimbing(true);
  }

  const handleFinish = () => {
    setIsClimbing(false);
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>Climb</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Your name" />
        <div className="flex flex-row space-x-2">
          <Select value={selectedRoute} onValueChange={setSelectedRoute}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select route" />
            </SelectTrigger>
            <SelectContent>
              {routes.map((route) => (
                <SelectItem key={route.id} value={route.id}>
                  {route.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isClimbing ? (
            <Button onClick={handleFinish}>Finish</Button>
          ) : (
            <Button onClick={handleClimb}>Climb</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}