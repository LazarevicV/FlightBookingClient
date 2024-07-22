import useAuth from "@/hooks/useAuth";
import { QUERY_KEYS } from "@/lib/constants";
import { getReservationsForUser } from "@/lib/queries";
import { Reservation, ReservationType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function ReservationsList() {
  const { user } = useAuth();

  const {
    data: reservations,
    isLoading: citiesLoading,
    isError: citiesError,
  } = useQuery<Reservation[]>({
    queryKey: [QUERY_KEYS.CITIES],
    queryFn: getReservationsForUser,
  });

  return (
    <div>
      <h1>Rezervacije za korisnika {user?.Email}</h1>

      {citiesLoading && <div>Loading...</div>}
      {citiesError && <div>Error...</div>}
      {reservations && reservations.length === 0 && (
        <div>No reservations found.</div>
      )}

      {reservations && reservations.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2">Departure City</th>
                <th className="border border-gray-200 p-2">Destination City</th>
                <th className="border border-gray-200 p-2">
                  Departure Date Time
                </th>
                <th className="border border-gray-200 p-2">
                  Destination Date Time
                </th>
                <th className="border border-gray-200 p-2">Full Name</th>
                <th className="border border-gray-200 p-2">Number of Seats</th>
                <th className="border border-gray-200 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="even:bg-gray-50">
                  <td className="border border-gray-200 p-2">
                    {reservation.departureCity}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {reservation.destinationCity}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {reservation.departureDateTime}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {reservation.destinationDateTime}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {reservation.fullName}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {reservation.numberOfSeats}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {reservation.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReservationsList;
