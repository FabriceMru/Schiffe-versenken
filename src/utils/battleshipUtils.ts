import { Board, Ship, CellState } from '../types/battleship';

export function createEmptyBoard(size: number): Board {
    return Array(size).fill(null).map(() => Array(size).fill('empty'));
}

export function placeShipsRandomly(board: Board, ships: Ship[]): Board {
    const newBoard = board.map(row => [...row]);

    for (const ship of ships) {
        let placed = false;
        while (!placed) {
            const horizontal = Math.random() < 0.5;
            const row = Math.floor(Math.random() * board.length);
            const col = Math.floor(Math.random() * board.length);

            if (canPlaceShip(newBoard, row, col, ship.size, horizontal)) {
                placeShip(newBoard, row, col, ship.size, horizontal);
                placed = true;
            }
        }
    }

    return newBoard;
}

function canPlaceShip(board: Board, row: number, col: number, size: number, horizontal: boolean): boolean {
    if (horizontal) {
        if (col + size > board.length) return false;
        for (let i = 0; i < size; i++) {
            if (board[row][col + i] !== 'empty') return false;
        }
    } else {
        if (row + size > board.length) return false;
        for (let i = 0; i < size; i++) {
            if (board[row + i][col] !== 'empty') return false;
        }
    }
    return true;
}

function placeShip(board: Board, row: number, col: number, size: number, horizontal: boolean): void {
    if (horizontal) {
        for (let i = 0; i < size; i++) {
            board[row][col + i] = 'ship';
        }
    } else {
        for (let i = 0; i < size; i++) {
            board[row + i][col] = 'ship';
        }
    }
}