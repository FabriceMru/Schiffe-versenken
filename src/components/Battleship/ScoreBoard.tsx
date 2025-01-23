
interface ScoreBoardProps {
    playerScore: number;
    computerScore: number;
}

export function ScoreBoard({ playerScore, computerScore }: ScoreBoardProps) {
    return (
        <div className="scoreboard">
            <div className="score">
                Spieler: <span className="score-player">{playerScore}</span>
            </div>
            <div className="score">
                Computer: <span className="score-computer">{computerScore}</span>
            </div>
        </div>
    );
}