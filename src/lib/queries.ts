import { api } from "@/services/api";
import { City, FlightType, ReservationType } from "./types";
import useAuth from "@/hooks/useAuth";
import { TOKEN_KEY } from "./constants";
import { decodeToken } from "react-jwt";

// Fetch flights based on parameters
export const getFlights = async (
  DepartureCityId: number,
  DestinationCityId: number,
  // DepartureDateTime: string,
  // ReturnDateTime: string,
  NoStops: boolean
  // NumberOfSeats: number
): Promise<FlightType[]> => {
  const queryParams = new URLSearchParams({
    DepartureCityId: DepartureCityId.toString(),
    DestinationCityId: DestinationCityId.toString(),
    // DepartureDateTime,
    // ReturnDateTime,
    NoStops: NoStops.toString(),
    // NumberOfSeats: NumberOfSeats.toString(),
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

export const login = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  try {
    console.log("Sending login request:", { email, password });

    const res = await api({
      endpoint: "api/Token",
      config: {
        method: "POST",
        data: {
          email,
          password,
        },
      },
    });

    console.log("Login response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const makeReservation = async ({
  flightId,
  numberOfSeats,
}: ReservationType): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    throw new Error("User is not authenticated");
  }

  console.log(`${token}`);
  const decodedToken = decodeToken(token);
  console.log("Decoded token:", decodedToken);

  const res = await api({
    endpoint: "api/Reservation",
    config: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: {
        flightId,
        numberOfSeats,
      },
    },
  });

  return res.data;
};

export const logoutRequest = async (): Promise<void> => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    throw new Error("User is not authenticated");
  }

  await api({
    endpoint: "api/Token",
    config: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  });
};

export const getReservationsForUser = async (): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await api({
    endpoint: "api/Reservation",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  });

  return res.data;
};

export const getAllReservations = async (): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await api({
    endpoint: "api/Reservation/all",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  });

  return res.data;
};

export const deleteReservation = async (id: string): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await api({
    endpoint: `api/Reservation/${id}`,
    config: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  });

  return res.data;
};

export const getAllFlights = async (): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await api({
    endpoint: "api/Flight",
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  });

  return res.data;
};

export const addFlight = async (
  departureCityId: string,
  destinationCityId: string,
  departureDateTime: string,
  arrivalDateTime: string,
  numberOfSeats: number,
  numberOfStops: number
): Promise<any> => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await api({
    endpoint: "api/Flight",
    config: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        departureCityId,
        destinationCityId,
        departureDateTime,
        arrivalDateTime,
        numberOfSeats,
        numberOfStops,
      },
    },
  });

  return res.data;
};
