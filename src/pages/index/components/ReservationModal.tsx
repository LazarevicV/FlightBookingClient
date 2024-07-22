import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { makeReservation } from "@/lib/queries";
import { Flight, ReservationType } from "@/lib/types";
import React from "react";
import { toast } from "sonner";

const ReservationModal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flight: Flight;
  refetchFlights: () => void;
}> = ({ open, onOpenChange, flight, refetchFlights }) => {
  const [flightId, setFlightId] = React.useState(flight.id);
  const [numberOfSeats, setNumberOfSeats] = React.useState(1);

  const handleMakeReservation = async () => {
    const reservationInfo: ReservationType = {
      flightId: flight.id,
      numberOfSeats: numberOfSeats,
    };
    const result = await makeReservation(reservationInfo);
    console.log(result);

    // Refetch flights after making a reservation
    toast.success("Reservation made successfully!");
    onOpenChange(false);
    refetchFlights();
  };

  const handleChangeNumberOfSeats = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfSeats(Number(e.target.value));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unos nove rezervacije</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Label>Izaberite broj sedista</Label>
        <Input
          value={numberOfSeats}
          onChange={handleChangeNumberOfSeats}
          type="number"
        />
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
