import type { PayloadStatus } from '@/enums/payload-status'

export interface Payload {
  id: number
  commodityID: string
  originID: string | number
  destinationID: string | number
  quantity: number
  status?: PayloadStatus
}
