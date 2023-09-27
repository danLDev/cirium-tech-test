import { writeFileSync } from "fs";

export const writeToGeojsonCollection = (features: Record<string, any>[]) => {
  writeFileSync(
    "geojson.json",
    JSON.stringify({
      type: "FeatureCollection",
      features,
    })
  );
};
