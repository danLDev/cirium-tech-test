import { Coordinate } from "../models/coordinate";
import { FlightPath } from "../models/flight-path";
import { GATWICK, GENEVA } from "./mock-aerodromes";

const CRUISING_HEIGHT = 11.2776; // 37000 ft in km

export const GATWICK_TO_GENEVA_DIRECT = new FlightPath([GATWICK, GENEVA]);

export const GATWICK_TO_GENEVA = new FlightPath([
  GATWICK,
  new Coordinate(3.789606, 48.570988, CRUISING_HEIGHT),
  GENEVA,
]);
