import { FlightPath } from "./flight-path";
import { hoursToMilliseconds } from "date-fns";

export const CRUISING_SPEED = 828; // Average crusing speed of a 737 in km/h
export const CRUISING_SPEED_PER_MS = CRUISING_SPEED / 3.6e6;

/**
 * The class representing a Flight
 * */
export class Flight {
  /**
   * The planned departure time as a unix timestamp.
   */
  private scheduledDepartureTime: number;
  /**
   * The actual departure time as a unix timestamp. Unset if the flight is yet to depart.
   */
  private actualDepartureTime?: number;
  /**
   * The actual arrival time as a unix timestamp. Unset if the flight is yet to arrive.
   */
  private actualArrivalTime?: number;

  constructor(
    /**
     * The planned path this flight will be taking
     */
    private flightPath: FlightPath,
    /**
     * The planned departure time as a unix timestamp.
     */
    scheduledDepartureTime: number
  ) {
    this.actualDepartureTime = scheduledDepartureTime;
  }

  /**
   * Returns the estimated flight duration in ms
   */
  public getDuration() {
    const totalDistance = this.flightPath.getTotalDistance();

    const hours = totalDistance / CRUISING_SPEED;

    return hoursToMilliseconds(hours);
  }

  public getArrivalAerodrome() {
    return this.flightPath.getDestination();
  }

  public getDepartureAerodrome() {
    return this.flightPath.getDeparture();
  }

  public getDepartureTime() {
    return this.actualDepartureTime ?? this.scheduledDepartureTime;
  }

  /**
   * The current best estimated arrival time.
   */
  public getArrivalTime() {
    const arrival =
      this.actualArrivalTime ?? this.getDepartureTime() + this.getDuration();

    return arrival;
  }

  public depart(departedAt?: number) {
    const newDepartureTime = departedAt ?? new Date().getTime();

    this.actualDepartureTime = newDepartureTime;
  }

  public getLocationAt(atTime: number) {
    const departure = this.getDepartureTime();

    const timeInFlightMs = atTime - departure;

    return this.flightPath.getLocationAtDistance(
      timeInFlightMs * CRUISING_SPEED_PER_MS
    );
  }

  public getCurrentLocation() {
    const now = Date.now();

    return this.getLocationAt(now);
  }

  public getFlightPath() {
    return this.flightPath;
  }
}
