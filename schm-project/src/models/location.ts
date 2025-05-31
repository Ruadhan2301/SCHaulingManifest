import type { LocationType } from "@/enums/locationType";
import type { Planets } from "@/enums/planets";

export interface Location {
  display_name: string;
  type: LocationType;
  parentBody: Planets | null;
  map_x: number | null;
  map_y: number | null;
}
