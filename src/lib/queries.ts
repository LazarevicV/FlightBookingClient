import { api } from "@/services/api";
import { City, FlightType } from "./types";

// Fetch flights based on parameters
export const getFlights = async (
  DepartureCityId: number,
  DestinationCityId: number,
  DepartureDateTime: string,
  ReturnDateTime: string,
  NoStops: boolean,
  NumberOfSeats: number
): Promise<FlightType[]> => {
  const queryParams = new URLSearchParams({
    DepartureCityId: DepartureCityId.toString(),
    DestinationCityId: DestinationCityId.toString(),
    DepartureDateTime,
    ReturnDateTime,
    NoStops: NoStops.toString(),
    NumberOfSeats: NumberOfSeats.toString(),
  });

  const res = await api({
    endpoint: `api/Flight/flights?${queryParams.toString()}`,
    // method: "GET", // Ensure the method matches your API requirements
  });

  return res.data;
};

// Fetch cities for selection
export const getCities = async (): Promise<City[]> => {
  const res = await api({ endpoint: "api/City" });
  return res.data;
};
