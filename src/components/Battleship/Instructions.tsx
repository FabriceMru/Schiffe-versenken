import { useState } from 'react';

export function Instructions() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="button" onClick={() => setIsOpen(true)}>
                Anleitung
            </button>
            {isOpen && (
                <>
                    <div className="instructions-overlay" onClick={() => setIsOpen(false)} />
                    <div className="instructions-dialog">
                        <h2 className="instructions-title">Spielanleitung</h2>
                        <p className="instructions-description">
                            Wie man Schiffe versenken spielt
                        </p>
                        <div className="instructions-list">
                            <p>1. Klicke auf "Spiel starten", um die Schiffe zufällig zu platzieren.</p>
                            <p>2. Klicke auf die Felder des gegnerischen Bretts, um anzugreifen.</p>
                            <p>3. Treffer werden rot markiert, Fehlschüsse grau.</p>
                            <p>4. Versenke alle gegnerischen Schiffe, bevor der Computer deine versenkt.</p>
                            <p>5. Der Punktestand zeigt die Anzahl der Treffer für jeden Spieler.</p>
                        </div>
                        <button className="button" onClick={() => setIsOpen(false)}>
                            Schließen
                        </button>
                    </div>
                </>
            )}
        </>
    );
}