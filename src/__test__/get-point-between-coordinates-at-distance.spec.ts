import { Coordinate } from "../models/coordinate";
import { getCoordinateDistance } from "../utils/get-coordinate-distance";
import { getPointBetweenCoordinatesAtDistance } from "../utils/get-point-between-coordinates-at-distance";

describe("getPointBetweenCoordinatesAtDistance", () => {
  it("Should return a point between 2 coordinates at a distance", () => {
    const a = new Coordinate(0, 0, 0);
    const b = new Coordinate(1, 1, 0);

    const distance = getCoordinateDistance(a, b);

    const centerPoint = getPointBetweenCoordinatesAtDistance(
      a,
      b,
      distance / 2
    );
    expect(centerPoint.getLat()).toBeCloseTo(0.5);
    expect(centerPoint.getLng()).toBeCloseTo(0.5);
    expect(centerPoint.getElevation()).toBeCloseTo(0);
  });

  it("Should handle elevation values when ascending", () => {
    const a = new Coordinate(0, 0, 0);
    const b = new Coordinate(1, 1, 3);

    const distance = getCoordinateDistance(a, b);

    const centerPoint = getPointBetweenCoordinatesAtDistance(
      a,
      b,
      distance / 2
    );

    expect(centerPoint.getElevation()).toBe(1.5);
  });

  it("Should handle elevation values when descending", () => {
    const a = new Coordinate(1, 1, 3);
    const b = new Coordinate(0, 0, 0);

    const distance = getCoordinateDistance(a, b);

    const centerPoint = getPointBetweenCoordinatesAtDistance(
      a,
      b,
      distance / 2
    );

    expect(centerPoint.getElevation()).toBe(1.5);
  });
});
