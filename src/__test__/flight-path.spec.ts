import { Coordinate } from "../models/coordinate";
import { FlightPath } from "../models/flight-path";

describe("FlightPath", () => {
  it("Should return a point along the path at a given distance", () => {
    const path = new FlightPath([
      new Coordinate(0, 0),
      new Coordinate(0, 1),
      new Coordinate(1, 1),
    ]);

    const distance = path.getTotalDistance();
    const point = path.getLocationAtDistance(distance * 0.75);

    expect(point.getLat()).toBeCloseTo(0.5);
    expect(point.getLng()).toBeCloseTo(1);
  });
});
