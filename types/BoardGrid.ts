import { type BoardRecord } from './BoardRecord'

/**
 * The board grid formed with a 2-dimensional array.
 * This is usually generated from `BoardRecord[]`.
 */
export type BoardGrid = Array<Array<BoardRecord | null>>
