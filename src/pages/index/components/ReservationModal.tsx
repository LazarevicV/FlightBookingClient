import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { makeReservation } from "@/lib/queries";
import { Flight, ReservationType } from "@/lib/types";
import React from "react";

const ReservationModal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flight: Flight;
  refetchFlights: () => void;
}> = ({ open, onOpenChange, flight, refetchFlights }) => {
  const [flightId, setFlightId] = React.useState(flight.id);
  const [numberOfSeats, setNumberOfSeats] = React.useState(2);

  const handleMakeReservation = async () => {
    const reservationInfo: ReservationType = {
      flightId: flight.id,
      numberOfSeats: numberOfSeats,
    };
    const result = await makeReservation(reservationInfo);
    console.log(result);

    // Refetch flights after making a reservation
    refetchFlights();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unos nove rezervacije</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <p>
          Test: {flight.departureCity} - {flight.destinationCity}
        </p>
        <div className="flex justify-center">
          <Button className="w-1/3" onClick={handleMakeReservation}>
            Make reservation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
