export interface SystemMessage {
  type: 'roomCreated' | 'newRoundStarted' | 'playerJoined' | 'playerLeft' | 'winnerBlack' | 'winnerWhite' | 'draw'
  payload?: Record<string, any>
}

export interface Chat {
  createdBy?: string
  createdAt: number
  playerName?: string | null
  message: string

  isAdmin?: boolean
  systemMessage?: SystemMessage
}
