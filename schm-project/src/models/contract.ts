import type { Payload } from './payload'
export interface Contract {
  id: number
  title: string
  description: string
  price: number
  payloads: Payload[]
}
