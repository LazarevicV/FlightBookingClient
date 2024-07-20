import React from "react";
import FlightsCard from "./FlightsCard";

function FlightsList({ flights }: { flights: any }) {
  if (!flights.length) {
    return <div>No flights found</div>;
  }

  return (
    <div>
      <h1>Search results</h1>
      <div>
        {flights.map((flight: any, index: number) => (
          <FlightsCard key={index} flight={flight} />
        ))}
      </div>
    </div>
  );
}

export default FlightsList;
