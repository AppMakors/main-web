import "../styles/RubiksTimor.css"

export default function RubiksTimor() {
    return <div className="rubiks-main">
        <div className="left-panel">
            Time list
        </div>
        <div className="time-container">
            <div className="scramble">Scramble</div>
            <div className="timer-wrapper">
                <div className="time">0.000</div>
                <div className="ao5">
                    ao5
                </div>
                <div className="ao12">
                    ao12
                </div>
            </div>
        </div>
    </div>
}