import { Difficulty } from '../../types/battleship';

interface DifficultySelectorProps {
    difficulty: Difficulty;
    onDifficultyChange: (difficulty: Difficulty) => void;
}

export function DifficultySelector({ difficulty, onDifficultyChange }: DifficultySelectorProps) {
    return (
        <div className="difficulty-selector">
            <select
                value={difficulty}
                onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
            >
                <option value="easy">Leicht</option>
                <option value="medium">Mittel</option>
                <option value="hard">Schwer</option>
            </select>
        </div>
    );
}