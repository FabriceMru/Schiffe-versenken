interface ShipsPanelProps {
    ships: Array<{
        size: number
        hits: number
    }>
    side: "left" | "right"
}

export function ShipsPanel({ ships, side }: ShipsPanelProps) {
    return (
        <div className="ships-panel">
            <h3>Schiffe</h3>
            {ships.map((ship, index) => (
                <div key={index} className="ship-item">
                    <div className="ship-indicator">
                        {Array(ship.size)
                            .fill(null)
                            .map((_, i) => (
                                <div key={i} className={`ship-cell ${i < ship.hits ? "hit" : ""}`} />
                            ))}
                    </div>
                    <span>{ship.size}er Schiff</span>
                </div>
            ))}
        </div>
    )
}

