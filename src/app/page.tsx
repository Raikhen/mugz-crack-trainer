import Dashboard from "@/components/Dashboard";

const routes = [
  {
    id: 1,
    name: 'Fists',
    colors: ['Blue', 'Blue', 'Blue']
  }
]

const logbook = [
  { id: 1, climber: "Alex Honnold", date: "2023-06-15", route: "El Capitan", laps: 1 },
  { id: 2, climber: "Adam Ondra", date: "2023-06-14", route: "Silence", laps: 3 },
  { id: 3, climber: "Janja Garnbret", date: "2023-06-13", route: "Biographie", laps: 2 },
  { id: 4, climber: "Tommy Caldwell", date: "2023-06-12", route: "Dawn Wall", laps: 1 },
  { id: 5, climber: "Ashima Shiraishi", date: "2023-06-11", route: "Open Your Mind Direct", laps: 4 },
  { id: 6, climber: "Chris Sharma", date: "2023-06-10", route: "La Dura Dura", laps: 2 },
  { id: 7, climber: "Margo Hayes", date: "2023-06-09", route: "Biographie", laps: 1 },
  { id: 8, climber: "Alex Megos", date: "2023-06-08", route: "Bibliographie", laps: 3 },
  { id: 9, climber: "Sasha DiGiulian", date: "2023-06-07", route: "Pure Imagination", laps: 2 },
  { id: 10, climber: "Stefano Ghisolfi", date: "2023-06-06", route: "Perfecto Mundo", laps: 1 },
  { id: 11, climber: "Nina Williams", date: "2023-06-05", route: "Ambrosia", laps: 2 },
  { id: 12, climber: "Daniel Woods", date: "2023-06-04", route: "The Process", laps: 3 },
]

export default function Home() {
  return (<Dashboard routes={routes} logs={logbook} />);
}
