import React from "react";
import FlightsCard from "./FlightsCard";
import { Flight } from "@/lib/types";

function FlightsList({
  flights = [],
  refetchFlights,
}: {
  flights: Flight[];
  refetchFlights: () => void;
}) {
  if (!flights) {
    return (
      <div className="text-center text-gray-700 mt-6">No flights found</div>
    );
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Search Results</h1>
      <div className="flex flex-col items-center space-y-6">
        {flights.map((flight, index) => (
          <FlightsCard
            key={index}
            flight={flight}
            refetchFlights={refetchFlights}
          />
        ))}
      </div>
    </div>
  );
}

export default FlightsList;
