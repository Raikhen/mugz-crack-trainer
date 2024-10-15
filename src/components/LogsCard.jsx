"use client"
import { useState, useMemo } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "../lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Command, CommandEmpty, CommandList, CommandInput, CommandItem } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"


export default function LogsCard({ logs }) {
  const [climberFilter, setClimberFilter] = useState("")
  const [routeFilter, setRouteFilter] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [climbersPopoverOpen, setClimbersPopoverOpen] = useState(false);
  const [routesPopoverOpen, setRoutesPopoverOpen] = useState(false);

  const uniqueClimbers = useMemo(() => [...new Set(logs.map((entry) => entry.climber))], [])
  const uniqueRoutes = useMemo(() => [...new Set(logs.map((entry) => entry.route))], [])

  const filteredAndSortedData = useMemo(() => {
    return logs
      .filter(
        (entry) =>
          entry.climber.toLowerCase().includes(climberFilter.toLowerCase()) &&
          entry.route.toLowerCase().includes(routeFilter.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
  }, [climberFilter, routeFilter, sortConfig])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedData, currentPage])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  const handleClimberSelect = (climber) => {
    console.log(climber);

    if (climberFilter !== climber) {
      setClimberFilter(climber);
    } else {
      setClimberFilter("");
    }

    setClimbersPopoverOpen(false);
  }

  const handleRouteSelect = (route) => {
    console.log(route);

    if (routeFilter !== route) {
      setRouteFilter(route);
    } else {
      setRouteFilter("");
    }

    setRoutesPopoverOpen(false);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Logbook</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Popover open={climbersPopoverOpen} onOpenChange={setClimbersPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-between">
                {climberFilter || "Select Climber"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search climber..." />
                <CommandEmpty>No climber found.</CommandEmpty>
                <CommandList>
                  {uniqueClimbers.map((climber) => (
                    <CommandItem key={climber} onSelect={handleClimberSelect}>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            climberFilter === climber ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {climber}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover open={routesPopoverOpen} onOpenChange={setRoutesPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-between">
                {routeFilter || "Select Route"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search route..." />
                <CommandEmpty>No route found.</CommandEmpty>
                <CommandList>
                  {uniqueRoutes.map((route) => (
                      <CommandItem key={route} onSelect={handleRouteSelect}>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            routeFilter === route ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {route}
                      </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("climber")}>
                Climber {sortConfig.key === "climber" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("route")}>
                Route {sortConfig.key === "route" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("laps")}>
                Laps {sortConfig.key === "laps" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
            </TableRow>
          </TableHeader>
          {paginatedData.length ? (
            <TableBody>
              {paginatedData.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.climber}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.route}</TableCell>
                  <TableCell className="text-right">{entry.laps}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center">No logs found.</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            { currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            { currentPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>
            { currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            { currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  )
}