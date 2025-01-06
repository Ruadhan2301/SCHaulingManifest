import type { Payload } from './payload'
export interface Contract {
  id: number
  name?: string
  description?: string
  price?: number
  payloads: Payload[]
  completed?: boolean
}
