"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { getFlights, getCities } from "@/lib/queries";
import { QUERY_KEYS } from "@/lib/constants";
import { DatePickerWithRange } from "./DatePickerComponent";
import FlightsList from "./FlightsList";
import { City, FlightType } from "@/lib/types";
import { DateRange } from "react-day-picker";

function FlightForm() {
  const [departureCity, setDepartureCity] = React.useState("");
  const [destinationCity, setDestinationCity] = React.useState("");
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [isDirectFlight, setIsDirectFlight] = React.useState(false);
  const [numberOfPassengers, setNumberOfPassengers] = React.useState(1);
  const [flights, setFlights] = React.useState<FlightType[]>([]);
  const [searchInitiated, setSearchInitiated] = React.useState(false);

  // Format dates for MySQL
  const formattedFromDate = date?.from ? format(date.from, "yyyy-MM-dd") : "";
  const formattedToDate = date?.to ? format(date.to, "yyyy-MM-dd") : "";

  console.log(formattedFromDate, formattedToDate);

  const {
    data: cities,
    isLoading,
    isError,
  } = useQuery<City[]>({
    queryKey: [QUERY_KEYS.CITIES],
    queryFn: getCities,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  console.log(cities);

  const handleSearch = async () => {
    // Fetch flights based on user input
    if (!departureCity || !destinationCity || !formattedFromDate) {
      return;
    }

    const flights = await getFlights(
      Number(departureCity),
      Number(destinationCity),
      formattedFromDate,
      formattedToDate,
      isDirectFlight,
      numberOfPassengers
    );

    setFlights(flights);
    setSearchInitiated(true);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-black">
          Pretraga letova
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Departure City */}
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
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Destination City */}
          <div>
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Izaberite grad dolaska
            </Label>
            <Select onValueChange={(value) => setDestinationCity(value)}>
              <SelectTrigger className="w-full dark:bg-white dark:text-black">
                <SelectValue placeholder="Izaberite" />
              </SelectTrigger>
              <SelectContent>
                {cities?.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Number of Passengers */}
          <div>
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Broj putnika
            </Label>
            <Input
              type="number"
              min="1"
              value={numberOfPassengers}
              onChange={(e) => setNumberOfPassengers(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mt-1 dark:bg-white dark:text-black"
            />
          </div>

          {/* Calendar */}
          <div>
            <Label className="block mb-2 text-sm font-medium text-gray-700">
              Datum polaska
            </Label>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-8 flex justify-center">
          <Button onClick={handleSearch}>Pretrazi</Button>
        </div>

        {/* Direct Flight Checkbox */}
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
        <p>letovi</p>
      </div>
      {/* Display selected dates for flights */}

      {formattedFromDate && formattedToDate && (
        <div className="mt-4 text-center">
          <p>
            Polazak: {formattedFromDate} Povratak: {formattedToDate}
          </p>
        </div>
      )}

      {searchInitiated && <FlightsList flights={flights} />}
    </>
  );
}

export default FlightForm;
