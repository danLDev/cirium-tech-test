import { Aerodrome } from "./aerodrome";
import { Coordinate } from "./coordinate";
import { getCoordinateDistance } from "../utils/get-coordinate-distance";
import { getPointBetweenCoordinatesAtDistance } from "../utils/get-point-between-coordinates-at-distance";

type FlightWaypoint = Coordinate | Aerodrome;

type FlightPathLeg = {
  from: FlightWaypoint;
  to: FlightWaypoint;
  distance: number;
};

export class FlightPath {
  private legs: FlightPathLeg[];

  constructor(waypoints: FlightWaypoint[]) {
    this.legs = this.calculateFlightLegs(waypoints);
  }

  private calculateFlightLegs(waypoints: FlightWaypoint[]): FlightPathLeg[] {
    const legs = waypoints.reduce((carry, currentWaypoint, i) => {
      const nextWaypoint = waypoints[i + 1];

      if (!nextWaypoint) return carry;

      return [
        ...carry,
        {
          from: currentWaypoint,
          to: nextWaypoint,
          distance: getCoordinateDistance(currentWaypoint, nextWaypoint),
        },
      ];
    }, [] as FlightPathLeg[]);

    return legs;
  }

  public getLegs() {
    return this.legs;
  }

  public getDestination() {
    return this.legs[-1].to;
  }

  public getDeparture() {
    return this.legs[0].from;
  }

  public getTotalDistance() {
    return this.legs.reduce(
      (carry, currentLeg) => carry + currentLeg.distance,
      0
    );
  }

  /**
   * Returns a location on the flight-path at a given distance in KM
   */
  public getLocationAtDistance(atDistance: number) {
    let travelledDistance = 0;
    let currentWaypoint: FlightWaypoint | null = null;

    for (const leg of this.legs) {
      if (travelledDistance === atDistance) {
        currentWaypoint = leg.from;
        break;
      }

      const newTravelledDistance = travelledDistance + leg.distance;

      // We are at the 'to' location of this leg
      if (newTravelledDistance === atDistance) {
        currentWaypoint = leg.to;
        break;
      }

      // If is the atDistance part way through this leg
      if (newTravelledDistance > atDistance) {
        const distanceBetweenPoints = atDistance - travelledDistance;

        currentWaypoint = getPointBetweenCoordinatesAtDistance(
          leg.from,
          leg.to,
          distanceBetweenPoints
        );

        break;
      }
    }

    if (!currentWaypoint) {
      throw new Error("Error calculating the current location...");
    }

    return currentWaypoint;
  }
}
