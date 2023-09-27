import { Flight } from "../models/flight";
import { GATWICK_TO_GENEVA } from "../__mocks__/mock-flight-paths";
import { addMinutes, subMinutes } from "date-fns";
import { isFlightWithinAirspace } from "../utils/is-flight-within-airspace";
import { AIRSPACE_OVER_FRANCE } from "../__mocks__/mock-airspaces";
import { GATWICK, GENEVA } from "../__mocks__/mock-aerodromes";
import { Coordinate } from "../models/coordinate";
import { FlightPath } from "../models/flight-path";

describe("isFlightWithinAirspace", () => {
  it("Should detect a flight which is currently within the airspace", () => {
    const departure = new Date();
    const flight = new Flight(GATWICK_TO_GENEVA, departure.getTime());

    // Force the flight to depart early so we don't have to mess with time mocks
    flight.depart(subMinutes(departure, 15).getTime());

    expect(isFlightWithinAirspace(flight, AIRSPACE_OVER_FRANCE)).toBe(true);
  });

  it("Should not detect when the flight hasnt yet departed", () => {
    const departure = addMinutes(new Date(), 10);
    const flight = new Flight(GATWICK_TO_GENEVA, departure.getTime());

    expect(isFlightWithinAirspace(flight, AIRSPACE_OVER_FRANCE)).toBe(false);
  });

  it("Should not detect a flight which flies over the airspace", () => {
    const departure = new Date();

    const path = new FlightPath([
      GATWICK,
      new Coordinate(GATWICK.getLat(), GATWICK.getLng(), 50),
      new Coordinate(GENEVA.getLat(), GENEVA.getLng(), 50),
      GENEVA,
    ]);

    const flight = new Flight(path, departure.getTime());

    // Force the flight to depart early so we don't have to mess with time mocks
    flight.depart(subMinutes(departure, 15).getTime());

    expect(isFlightWithinAirspace(flight, AIRSPACE_OVER_FRANCE)).toBe(false);
  });
});
