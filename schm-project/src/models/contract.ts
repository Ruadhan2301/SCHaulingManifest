import type { Payload } from './payload'
export interface Contract {
  id: number
  name?: string
  description?: string
  price?: number
  payloads: Payload[]
  containerSize: number
  completed?: boolean
  cancelled?: boolean
  displayOpen?: boolean
}
