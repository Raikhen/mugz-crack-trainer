import Dashboard from "@/components/Dashboard";


import db from "../lib/firebase/firestore";
import { collection, getDocs, Timestamp } from "firebase/firestore";

interface Route {
  id: string,
  name: string,
  colors: string[],
}

async function getRoutes() : Promise<Route[]> {
  // Reference the 'routes' collection
  const routesRef = collection(db, "routes");

  // Execute the query
  const querySnapshot = await getDocs(routesRef);

  // Extract the route documents
  const routes : Route[] = [];

  querySnapshot.forEach((doc) => {
    routes.push({
      id: doc.id,
      name: doc.data().name,
      colors: doc.data().colors
    });
  });

  return routes;
}


interface Log {
  id: string,
  climber: string,
  date: string,
  route: string,
  laps: number,
}

async function getLogs(routes : Route[]) : Promise<Log[]> {
  // Reference the 'routes' collection
  const logsRef = collection(db, "logs");

  // Execute the query
  const querySnapshot = await getDocs(logsRef);

  // Extract the route documents
  const logs : Log[] = [];

  querySnapshot.forEach((doc) => {
    const routeName = routes.find((route : Route) => route.id === doc.data().route.id)?.name;

    logs.push({
      id: doc.id,
      climber: doc.data().climber,
      date: doc.data().date.toDate().toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: '2-digit' }),
      route: routeName!,
      laps: doc.data().laps
    });
  });

  return logs;
}

export default async function Home() {
  const routes = await getRoutes();
  const logs = await getLogs(routes);

  return (<Dashboard routes={routes} logs={logs} />);
}
