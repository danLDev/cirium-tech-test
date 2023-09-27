import { Coordinate } from "./coordinate";
import { polygon, point, booleanPointInPolygon } from "@turf/turf";
export class Airspace {
  private coordinates: Coordinate[];

  constructor(
    coordinates: [number, number][],
    private minAltitude: number,
    private maxAltitude: number
  ) {
    this.coordinates = coordinates.map(
      ([lat, lng]) => new Coordinate(lat, lng, minAltitude)
    );
  }

  /**
   * Checks if a coordinate falls within the bounds of this airspace
   */
  public containsCoordinate(coordinate: Coordinate): boolean {
    const elevation = coordinate.getElevation();

    // If the coordinate falls outside of the given altitudes, we don't need to calculate the polygon intersects.
    if (elevation > this.maxAltitude || elevation < this.minAltitude) {
      return false;
    }

    const turfPoint = point([
      coordinate.getLng(),
      coordinate.getLat(),
      coordinate.getElevation(),
    ]);

    const turfPoly = polygon([
      this.coordinates.map((c) => [c.getLng(), c.getLat()]),
    ]);

    return booleanPointInPolygon(turfPoint, turfPoly);
  }

  public toGeoJson() {
    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          this.coordinates.map((c) => [
            c.getLng(),
            c.getLat(),
            c.getElevation(),
          ]),
        ],
      },
    };
  }
}
