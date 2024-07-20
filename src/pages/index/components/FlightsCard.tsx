import React from "react";
import { Flight } from "@/lib/types";
import { Button } from "@/components/ui/button";
import ReservationModal from "./ReservationModal";

function FlightsCard({ flight }: { flight: Flight }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (open: boolean) => {
    setOpen(open);
  };

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-2">
        {flight.departureCity} - {flight.destinationCity}
      </h2>
      <p className="text-gray-600 mb-1">
        Departure: {flight.departureCity} - {flight.departureDateTime}
      </p>
      <p className="text-gray-600 mb-1">Stops: {flight.numberOfStops}</p>
      <p className="text-gray-600 mb-1">
        Number of available seats: {flight.numberOfAvailableSpots}
      </p>
      <Button
        onClick={() => {
          handleOpen(true);
        }}
        className="mt-4 px-4 py-2"
      >
        Book Now
      </Button>
      <ReservationModal open={open} onOpenChange={handleOpen} />
    </div>
  );
}

export default FlightsCard;
