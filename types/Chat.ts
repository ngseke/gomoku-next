export interface Chat {
  createdBy?: string
  createdAt: number
  playerName?: string | null
  message: string
  isAdmin?: boolean
}
