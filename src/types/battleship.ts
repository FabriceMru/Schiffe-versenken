export type CellState = "empty" | "ship" | "hit" | "miss"
export type Board = CellState[][]
export type Difficulty = "easy" | "medium" | "hard"
export type GameState = "setup" | "playing" | "gameOver"

export interface Ship {
    size: number
    hits: number
}

