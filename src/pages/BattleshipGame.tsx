import { useState } from "react"
import { useGameLogic } from "../hooks/useGameLogic"
import { GameBoard } from "../components/Battleship/GameBoard"
import { Instructions } from "../components/Battleship/Instructions"
import { DifficultySelector } from "../components/Battleship/DifficultySelector"
import { ScoreBoard } from "../components/Battleship/ScoreBoard"
import { ShipsPanel } from "../components/Battleship/ShipsPanel"
import type { Difficulty } from "../types/battleship"
import "../styles/Battleship.css"

export default function BattleshipGame() {
    const [difficulty, setDifficulty] = useState<Difficulty>("medium")
    const { playerBoard, computerBoard, gameState, score, startGame, playerMove, playerShips, computerShips } =
        useGameLogic()

    return (
        <div className="battleship-container">
            <div className="game-content">
                <div className="header">
                    <h1>Schiffe versenken</h1>
                    <div className="controls">
                        <Instructions />
                        <DifficultySelector difficulty={difficulty} onDifficultyChange={setDifficulty} />
                        <button className="button" onClick={startGame} disabled={gameState === "playing"}>
                            {gameState === "setup" ? "Spiel starten" : "Neues Spiel"}
                        </button>
                    </div>
                    <ScoreBoard playerScore={score.player} computerScore={score.computer} />
                </div>

                <div className="boards-container">
                    <div className="board-section">
                        <ShipsPanel ships={playerShips} side="left" />
                        <div>
                            <div className="board-title">Dein Brett</div>
                            <GameBoard board={playerBoard} onCellClick={() => {}} isPlayerBoard={true} />
                        </div>
                    </div>

                    <div className="board-section">
                        <div>
                            <div className="board-title">Computer Brett</div>
                            <GameBoard board={computerBoard} onCellClick={playerMove} isPlayerBoard={false} />
                        </div>
                        <ShipsPanel ships={computerShips} side="right" />
                    </div>
                </div>

                {gameState === "gameOver" && (
                    <div className="game-over">
                        {score.player > score.computer ? "Du hast gewonnen!" : "Der Computer hat gewonnen!"}
                    </div>
                )}
            </div>
        </div>
    )
}

