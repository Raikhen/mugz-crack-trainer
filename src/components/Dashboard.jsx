import ClimbCard from "./ClimbCard";
import LogsCard from "./LogsCard";
import StokeCard from "./StokeCard";

export default function Dashboard({ routes, logs }) {
  return (
    <main className="mt-20">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-6 p-6 lg:px-10 lg:gap-10">
          <div className="lg:w-1/2 flex flex-col gap-6 lg:gap-10">
            <ClimbCard routes={routes} />
            <StokeCard />
          </div>
          <div className="lg:w-1/2">
            <LogsCard logs={logs}/>
          </div>
        </div>
      </div>
    </main>
  )
}
