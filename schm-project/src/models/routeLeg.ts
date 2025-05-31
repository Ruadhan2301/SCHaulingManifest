import type { Payload } from "./payload";

export interface RouteLeg {
  origin: string; // ID of the origin location
  destination: string; // ID of the destination location
  payloads: Payload[]; // List of payloads being carried by the ship on this leg
  cargoUsage: number; // amount of the ship's cargo capacity used by the payloads on this leg (calculated from payloads)
}
