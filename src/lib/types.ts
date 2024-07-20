// Define types for the flight data
export type FlightType = {
  id: string;
  departureCity: string;
  destinationCity: string;
  date: string; // Use 'yyyy-MM-dd' format for consistency with MySQL
  numberOfPassengers: number;
  isDirectFlight: boolean;
};

export type City = {
  id: string;
  name: string;
};
