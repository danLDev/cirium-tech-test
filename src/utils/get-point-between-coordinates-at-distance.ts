import { Coordinate } from "../models/coordinate";
import { degreesToRadians } from "./degrees-to-radians";
import { getCoordinateDistance } from "./get-coordinate-distance";

const calculateBearing = (coord1: Coordinate, coord2: Coordinate) => {
  const lat1 = degreesToRadians(coord1.getLat());
  const lng1 = degreesToRadians(coord1.getLng());
  const lat2 = degreesToRadians(coord2.getLat());
  const lng2 = degreesToRadians(coord2.getLng());

  const Δlon = lng2 - lng1;

  const y = Math.sin(Δlon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(Δlon);

  const θ = Math.atan2(y, x);

  // Convert θ from radians to degrees
  return ((θ * 180) / Math.PI + 360) % 360;
};

// Function to calculate the coordinates of point C
export const getPointBetweenCoordinatesAtDistance = (
  coord1: Coordinate,
  coord2: Coordinate,
  distance: number
) => {
  const R = 6371; // Earth's mean radius in kilometers
  const distanceFrom1To2 = getCoordinateDistance(coord1, coord2);
  const initialBearing = calculateBearing(coord1, coord2);

  const lat1 = degreesToRadians(coord1.getLat());
  const lng1 = degreesToRadians(coord1.getLng());

  const lat3 = Math.asin(
    Math.sin(lat1) * Math.cos(distance / R) +
      Math.cos(lat1) *
        Math.sin(distance / R) *
        Math.cos(degreesToRadians(initialBearing))
  );

  const lng3 =
    lng1 +
    Math.atan2(
      Math.sin(degreesToRadians(initialBearing)) *
        Math.sin(distance / R) *
        Math.cos(lat1),
      Math.cos(distance / R) - Math.sin(lat1) * Math.sin(lat3)
    );

  // Convert lat3 and lng3 from radians to degrees
  const lat3Deg = (lat3 * 180) / Math.PI;
  const lng3Deg = (lng3 * 180) / Math.PI;

  const elev1 = coord1.getElevation();
  const elev2 = coord2.getElevation();

  // If we are level, use the same elevation as coord1,
  // otherwise calculate elevation as a percentage of ascenscion/descension
  const elev =
    elev2 === elev1
      ? elev1
      : (distance / distanceFrom1To2) * (elev2 >= elev1 ? elev2 : elev1);

  return new Coordinate(lat3Deg, lng3Deg, elev);
};
