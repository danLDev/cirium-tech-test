import { Geoplace } from "./geoplace";

export class Aerodrome extends Geoplace {
  constructor(lat: number, lng: number, elevation: number, name: string) {
    super(lat, lng, elevation, name);
  }
}
