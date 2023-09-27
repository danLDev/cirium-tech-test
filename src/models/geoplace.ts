import { Coordinate } from "./coordinate";

/**
 * The class representing a location of a point of interest located at a single coordinate.
 */
export class Geoplace extends Coordinate {
  constructor(
    lat: number,
    lng: number,
    elevation: number,
    /**
     * The name of this geoplace
     */
    private name: string
  ) {
    super(lat, lng, elevation);
  }

  public getName() {
    return this.name;
  }
}
