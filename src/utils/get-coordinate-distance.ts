import { Coordinate } from "../models/coordinate";
import { degreesToRadians } from "./degrees-to-radians";

export const getCoordinateDistance = (
  coord1: Coordinate,
  coord2: Coordinate
) => {
  // Radius of the Earth in km
  const R = 6371; // 6371 km

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = degreesToRadians(coord1.getLat());
  const lon1Rad = degreesToRadians(coord1.getLng());
  const lat2Rad = degreesToRadians(coord2.getLat());
  const lon2Rad = degreesToRadians(coord2.getLng());

  // Calculate differences in latitude, longitude, and elevation
  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;
  const deltaElev = coord2.getElevation() - coord1.getElevation();

  // Haversine formula
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance including elevation
  const distance = R * c + deltaElev;

  return distance;
};
