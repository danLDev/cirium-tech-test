/**
 * The class representing a location on a lng/lat scale.
 */
export class Coordinate {
  private elevation: number;
  constructor(
    /**
     * The longitude (x) value of this coordinate, can be between -180 to +180
     */
    private lat: number,
    /**
     * The latitude (y) value of this coordinate, can be between -90 to +90
     */
    private lng: number,
    /**
     * The elevation in km
     */
    elevation?: number
  ) {
    this.lat = lat;
    this.lng = lng;
    this.elevation = elevation ?? 0;
  }

  public getLat() {
    return this.lat;
  }

  public getLng() {
    return this.lng;
  }

  public getElevation() {
    return this.elevation;
  }

  public toGeoJson() {
    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [this.lng, this.lat, this.elevation],
      },
    };
  }
}
