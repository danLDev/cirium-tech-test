import { Airspace } from "../models/airspace";
import { Flight } from "../models/flight";

export const isFlightWithinAirspace = (flight: Flight, airspace: Airspace) => {
  const currentFlightLocation = flight.getCurrentLocation();

  return airspace.containsCoordinate(currentFlightLocation);
};
