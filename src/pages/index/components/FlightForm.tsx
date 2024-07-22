import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { getFlights, getCities } from "@/lib/queries";
import { QUERY_KEYS } from "@/lib/constants";
import FlightsList from "./FlightsList";
import { City, Flight } from "@/lib/types";
import { toast } from "sonner";

function FlightForm() {
  const [departureCity, setDepartureCity] = React.useState<
    string | undefined
  >();
  const [destinationCity, setDestinationCity] = React.useState<
    string | undefined
  >();
  const [isDirectFlight, setIsDirectFlight] = React.useState(false);
  const [searchInitiated, setSearchInitiated] = React.useState(false);

  const {
    data: cities,
    isLoading: citiesLoading,
    isError: citiesError,
  } = useQuery<City[]>({
    queryKey: [QUERY_KEYS.CITIES],
    queryFn: getCities,
  });

  const {
    data: flights,
    isLoading: flightsLoading,
    isError: flightsError,
    refetch: refetchFlights,
  } = useQuery<Flight[]>({
    queryKey: [
      QUERY_KEYS.FLIGHTS,
      departureCity,
      destinationCity,
      isDirectFlight,
    ],
    // add ts-ignore for this line
    // @ts-ignore
    queryFn: () =>
      getFlights(
        Number(departureCity),
        Number(destinationCity),
        isDirectFlight
      ),
    enabled: searchInitiated,
  });

  if (citiesLoading) return <div>Loading...</div>;
  if (citiesError) return <div>Error</div>;

  const handleSearch = async () => {
    if (!departureCity || !destinationCity) {
      return toast.error("Molimo izaberite gradove polaska i dolaska");
    }

    setSearchInitiated(true);
    refetchFlights();
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-black">
          Pretraga letova
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Izaberite grad polaska
            </Label>
            <Select onValueChange={(value) => setDepartureCity(value)}>
              <SelectTrigger className="w-full dark:bg-white dark:text-black">
                <SelectValue placeholder="Izaberite" />
              </SelectTrigger>
              <SelectContent>
                {cities?.map((city: City) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Izaberite grad dolaska
            </Label>
            <Select onValueChange={(value) => setDestinationCity(value)}>
              <SelectTrigger className="w-full dark:bg-white dark:text-black">
                <SelectValue placeholder="Izaberite" />
              </SelectTrigger>
              <SelectContent>
                {cities?.map((city: City) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={handleSearch}>Pretrazi</Button>
        </div>

        <div className="mt-4 flex items-center">
          <Checkbox
            checked={isDirectFlight}
            onCheckedChange={() => setIsDirectFlight(!isDirectFlight)}
            className="mr-2"
          />
          <label htmlFor="directFlight" className="text-sm text-gray-700">
            Direktan let
          </label>
        </div>
      </div>

      {flightsLoading && <div>Loading...</div>}
      {flightsError && <div>Error</div>}
      {searchInitiated && (
        <FlightsList
          flights={flights as Flight[]}
          refetchFlights={refetchFlights}
        />
      )}
    </>
  );
}

export default FlightForm;
