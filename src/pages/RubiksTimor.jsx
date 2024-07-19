import "../assets/style.css"
import "../styles/RubiksTimor.css"
import {useState, useEffect} from 'react'

export default function RubiksTimor() {
    const [solves, setSolves] = useState([]);

    const addSolve = (solve) => {
        
    }

    return <div className="rubiks-main" onClick={console.log("Load")}>
        <div className="left-panel">
            <ul className="solve-list">

            </ul>
        </div>
        <div className="time-container">
            <div className="scramble">Scramble</div>
            <div className="timer-wrapper">
                <Timer />
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

function Timer({ }) {
    const ACTIVATION_KEY = "Space";
    const ACTIVATION_TIME = 300; // in miliseconds

    const [key, setKey] = useState();

    const [isHolding, setHolding] = useState(false);
    const [holdingPoint, setHoldingPoint] = useState(0);
    const [holdingTime, setHoldingTime] = useState(0);

    const [isTiming, setTiming] = useState(false);
    const [timingPoint, setTimingPoint] = useState(0);
    const [time, setTime] = useState(0);

    const startHoldingHandler = () => {
        if (isTiming) {
            setTiming(false);
            setTime(new Date().getTime() - timingPoint);
        } else if (key === ACTIVATION_KEY) {
            setHoldingPoint(new Date().getTime());
        }
    }

    const stopHoldingHandler = () => {
        if (holdingPoint !== 0) {
            const stopHoldingPoint = new Date().getTime();
            setHoldingTime(stopHoldingPoint - holdingPoint);
        }
    }

    const startTimingHandler = () => {
        setTiming(true);
        setTimingPoint(new Date().getTime());

        setHoldingTime(0);
        setHoldingPoint(0);
    }

    const stopTimingHandler = () => {
        const stopTimingPoint = new Date().getTime();
        
        setTime(stopTimingPoint - timingPoint);
        console.log(stopTimingPoint - timingPoint);
        
        setTimingPoint(0);
    }

    useEffect(() => {
        isHolding ? startHoldingHandler() : stopHoldingHandler();
    }, [isHolding]);

    useEffect(() => {
        if (holdingTime >= ACTIVATION_TIME)
            startTimingHandler();
    }, [holdingTime]);

    useEffect(() => {
        if (isTiming) {
            const id = setInterval(() => setTime(new Date().getTime() - timingPoint), 1);
            
            return () => {
                clearInterval(id);
                setTiming(false);
            };
        } else if (timingPoint > 0) {
            stopTimingHandler();
        }
    }, [isTiming]);

    useEffect(() => {
        window.addEventListener("keydown", (e) => { setHolding(true); setKey(e.code); } ); 
        window.addEventListener("keyup", (e) => { setHolding(false); setKey(); }); 
    }, []);

    return <div className="time">{(time / 1000).toFixed(3)}</div>
}