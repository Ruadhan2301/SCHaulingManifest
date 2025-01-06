import type { PayloadStatus } from '@/enums/payload-status'

export interface Payload {
  id: number
  commodityID: string
  originID: string
  destinationID: string
  quantity: number
  status?: PayloadStatus
}
