import type { Payload } from './payload';

export interface ContractLocation {
  locationID: string;
  containerSize: number;
  payloads: Payload[];
  open: boolean;
}
