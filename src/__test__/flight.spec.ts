import { Flight } from "../models/flight";
import { GATWICK_TO_GENEVA_DIRECT } from "../__mocks__/mock-flight-paths";
import { addHours, addMinutes, millisecondsToMinutes } from "date-fns";
import { getPointBetweenCoordinatesAtDistance } from "../utils/get-point-between-coordinates-at-distance";
import { Coordinate } from "../models/coordinate";
import { FlightPath } from "../models/flight-path";

describe("Flight", () => {
  it("Should return the expected flight duration and arrival time", () => {
    const expectedDeparture = new Date();

    const flight = new Flight(
      GATWICK_TO_GENEVA_DIRECT,
      expectedDeparture.getTime()
    );

    const duration = flight.getDuration();
    const arrival = flight.getArrivalTime();

    expect(millisecondsToMinutes(duration)).toBeCloseTo(50);
    expect(arrival).toBeCloseTo(expectedDeparture.getTime() + duration);
  });

  it("Should return a new arrival time when the flight departure is delayed", () => {
    const expectedDeparture = new Date();

    const flight = new Flight(
      GATWICK_TO_GENEVA_DIRECT,
      expectedDeparture.getTime()
    );

    const actualDeparture = addHours(new Date(), 5);

    flight.depart(actualDeparture.getTime());

    const duration = flight.getDuration();
    const arrival = flight.getArrivalTime();

    expect(millisecondsToMinutes(duration)).toBeCloseTo(50);
    expect(arrival).toBeCloseTo(actualDeparture.getTime() + duration);
  });

  it("Should return the point along the path at a given time", () => {
    const expectedDeparture = new Date();

    const flight = new Flight(
      new FlightPath([new Coordinate(0, 0, 0), new Coordinate(1, 1, 0)]),
      expectedDeparture.getTime()
    );

    flight.depart(expectedDeparture.getTime());
    const departure = flight.getDepartureTime();
    const duration = flight.getDuration();

    const halfwayPoint = flight.getLocationAt(departure + duration / 2);

    expect(halfwayPoint.getLat()).toBeCloseTo(0.5);

    expect(halfwayPoint.getLng()).toBeCloseTo(0.5);
  });
});
