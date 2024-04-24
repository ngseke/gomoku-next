import { type Position } from './Position'

export interface WinningLine {
  position: Position
  direction: 'vertical' | 'horizontal' | 'majorDiagonal' | 'minorDiagonal'
}
