import { useState, useCallback } from "react"
import { type Board, CellState, type Difficulty, type GameState, type Ship } from "../types/battleship"

const BOARD_SIZE = 10
const SHIPS: Ship[] = [
    { size: 5, hits: 0 },
    { size: 4, hits: 0 },
    { size: 3, hits: 0 },
    { size: 3, hits: 0 },
    { size: 2, hits: 0 },
]

export function createEmptyBoard(size: number): Board {
    return Array(size)
        .fill(null)
        .map(() => Array(size).fill("empty"))
}

export function useGameLogic(difficulty: Difficulty) {
    const [playerBoard, setPlayerBoard] = useState<Board>(createEmptyBoard(BOARD_SIZE))
    const [computerBoard, setComputerBoard] = useState<Board>(createEmptyBoard(BOARD_SIZE))
    const [gameState, setGameState] = useState<GameState>("setup")
    const [playerShips, setPlayerShips] = useState<Ship[]>(SHIPS.map((ship) => ({ ...ship })))
    const [computerShips, setComputerShips] = useState<Ship[]>(SHIPS.map((ship) => ({ ...ship })))
    const [score, setScore] = useState({ player: 0, computer: 0 })

    const placeShipsRandomly = useCallback((board: Board, ships: Ship[]): Board => {
        const newBoard = board.map((row) => [...row])

        for (const ship of ships) {
            let placed = false
            while (!placed) {
                const horizontal = Math.random() < 0.5
                const row = Math.floor(Math.random() * BOARD_SIZE)
                const col = Math.floor(Math.random() * BOARD_SIZE)

                if (canPlaceShip(newBoard, row, col, ship.size, horizontal)) {
                    placeShip(newBoard, row, col, ship.size, horizontal)
                    placed = true
                }
            }
        }

        return newBoard
    }, [])

    const canPlaceShip = (board: Board, row: number, col: number, size: number, horizontal: boolean): boolean => {
        if (horizontal) {
            if (col + size > BOARD_SIZE) return false
            for (let i = 0; i < size; i++) {
                if (board[row][col + i] !== "empty") return false
            }
        } else {
            if (row + size > BOARD_SIZE) return false
            for (let i = 0; i < size; i++) {
                if (board[row + i][col] !== "empty") return false
            }
        }
        return true
    }

    const placeShip = (board: Board, row: number, col: number, size: number, horizontal: boolean): void => {
        if (horizontal) {
            for (let i = 0; i < size; i++) {
                board[row][col + i] = "ship"
            }
        } else {
            for (let i = 0; i < size; i++) {
                board[row + i][col] = "ship"
            }
        }
    }

    const startGame = useCallback(() => {
        const newPlayerBoard = placeShipsRandomly(createEmptyBoard(BOARD_SIZE), playerShips)
        const newComputerBoard = placeShipsRandomly(createEmptyBoard(BOARD_SIZE), computerShips)
        setPlayerBoard(newPlayerBoard)
        setComputerBoard(newComputerBoard)
        setGameState("playing")
    }, [playerShips, computerShips, placeShipsRandomly])

    const playerMove = useCallback(
        (row: number, col: number) => {
            if (gameState !== "playing" || computerBoard[row][col] === "hit" || computerBoard[row][col] === "miss") {
                return
            }

            const newComputerBoard = computerBoard.map((r) => [...r])
            const newComputerShips = [...computerShips]

            if (newComputerBoard[row][col] === "ship") {
                newComputerBoard[row][col] = "hit"
                const hitShip = newComputerShips.find((ship) => ship.size > ship.hits)
                if (hitShip) {
                    hitShip.hits++
                    setScore((prev) => ({ ...prev, player: prev.player + 1 }))
                }
            } else {
                newComputerBoard[row][col] = "miss"
            }

            setComputerBoard(newComputerBoard)
            setComputerShips(newComputerShips)

            if (newComputerShips.every((ship) => ship.hits === ship.size)) {
                setGameState("gameOver")
            } else {
                computerMove()
            }
        },
        [gameState, computerBoard, computerShips],
    )

    const computerMove = useCallback(() => {
        const newPlayerBoard = playerBoard.map((r) => [...r])
        const newPlayerShips = [...playerShips]

        let row, col
        do {
            row = Math.floor(Math.random() * BOARD_SIZE)
            col = Math.floor(Math.random() * BOARD_SIZE)
        } while (newPlayerBoard[row][col] === "hit" || newPlayerBoard[row][col] === "miss")

        if (newPlayerBoard[row][col] === "ship") {
            newPlayerBoard[row][col] = "hit"
            const hitShip = newPlayerShips.find((ship) => ship.size > ship.hits)
            if (hitShip) {
                hitShip.hits++
                setScore((prev) => ({ ...prev, computer: prev.computer + 1 }))
            }
        } else {
            newPlayerBoard[row][col] = "miss"
        }

        setPlayerBoard(newPlayerBoard)
        setPlayerShips(newPlayerShips)

        if (newPlayerShips.every((ship) => ship.hits === ship.size)) {
            setGameState("gameOver")
        }
    }, [playerBoard, playerShips])

    return {
        playerBoard,
        computerBoard,
        gameState,
        score,
        startGame,
        playerMove,
        playerShips,
        computerShips,
    }
}

