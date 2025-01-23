import React from 'react';
import { Board } from '../../types/battleship';

interface GameBoardProps {
    board: Board;
    onCellClick: (row: number, col: number) => void;
    isPlayerBoard: boolean;
}

export function GameBoard({ board, onCellClick, isPlayerBoard }: GameBoardProps) {
    return (
        <div className="game-board">
            {board.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`cell ${
                            cell === 'empty' ? 'cell-empty' :
                                cell === 'ship' ? (isPlayerBoard ? 'cell-ship' : 'cell-empty') :
                                    cell === 'hit' ? 'cell-hit' :
                                        'cell-miss'
                        }`}
                        onClick={() => onCellClick(rowIndex, colIndex)}
                    />
                ))
            ))}
        </div>
    );
}