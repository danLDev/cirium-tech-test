import { Coordinate } from "./coordinate";

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
    const x = coordinate.getLng();
    const y = coordinate.getLat();

    const elevation = coordinate.getElevation();

    // If the coordinate falls outside of the given altitudes, we don't need to calculate the polygon intersects.
    if (elevation > this.maxAltitude || elevation < this.minAltitude) {
      return false;
    }

    let isInside = false;

    for (
      let i = 0, j = this.coordinates.length - 1;
      i < this.coordinates.length;
      j = i++
    ) {
      const xi = this.coordinates[i].getLat();
      const yi = this.coordinates[i].getLng();
      const xj = this.coordinates[j].getLat();
      const yj = this.coordinates[j].getLng();

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) {
        isInside = !isInside;
      }
    }

    return isInside;
  }
}
