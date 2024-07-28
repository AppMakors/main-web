import "../assets/style.css";
import "../styles/RubiksTimor.css";
import {useState, useEffect, useRef} from 'react';
import { ao, cstimerWorker, wca_events, displayTime } from "../functions/rubikstimor.jsx";

export default function RubiksTimor() {
    const [solves, setSolves] = useState([]);
    const [ao, setAo] = useState({});

    useEffect(() => {
        const localSolvesString = localStorage.getItem("session1");
        if (!localSolvesString) {
            localStorage.setItem("session1", "[]");
        } else {
            setSolves(JSON.parse(localSolvesString));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("session1", JSON.stringify(solves));
    }, [solves])
    
    return <div className="rubiks-main">
        <div className="left-panel">
            <SolveList solves={solves} setAo={setAo}/>
        </div>

        <TimeContainer setSolves={setSolves} ao={ao}/>
    </div>
}

function Scramble({ solveTime, setScrambleAndType, isHidden }) {    
    const [type, setType] = useState(0);
    const [scramble, setScramble] = useState("");
    const [scrambleSvg, setScrambleSvg] = useState("");
    const [renewSignal, setRenewSignal] = useState(false);

    // listen to the changes of:
    // 1. type (user selects scramble's type)
    // 2. signal (renew signal from Timer's stop handler)
    // 3. renewSignal (renew signal when user clicks next button)
    useEffect(() => {
        async function setScrambleAndScrambleSvg() {
            const scrRes = await cstimerWorker.getScramble(wca_events[type][1], wca_events[type][2]);
            setScramble(await scrRes);
            
            const svgRes = await cstimerWorker.getImage(scrRes, wca_events[type][1]);
            setScrambleSvg(await svgRes);

            setScrambleAndType({
                scramble: scrRes,
                type: type
            });
        }

        setScrambleAndScrambleSvg();
    }, [type, solveTime, renewSignal]);

    useEffect(() => {
        if (scrambleSvg.length) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = scrambleSvg;

            tempDiv.firstChild.setAttribute("viewBox", `0 0 ${tempDiv.firstChild.width.animVal.value} ${tempDiv.firstChild.height.animVal.value}`);
            tempDiv.firstChild.setAttribute("height", "98%");
            tempDiv.firstChild.removeAttribute("width");

            const targetDiv = document.getElementById("scramble-image");
            if (targetDiv.hasChildNodes()) {
                targetDiv.removeChild(targetDiv.firstChild);
            }
            targetDiv.appendChild(tempDiv.firstChild);
        }
    }, [scrambleSvg]);

    return <div style={ { display: isHidden ? "none" : "block" }}>
        <div className="scramble-settings">
            <select onChange={(e) => {setType(e.target.value)}}>
                {wca_events.map((v, i) => <option key={`type${i}`} value={i}>{v[0]}</option>)}
            </select>

            <button onClick={() => {setRenewSignal(!renewSignal);}}>»</button>
        </div>
        <div className="scramble">{scramble}</div>
        <div id="scramble-image"/>
    </div>
}

function Timer({ setSolveTime, setStartSignal }) {
    useEffect(() => {
        document.addEventListener("keydown", (e) => { 
            if (e.repeat)
                return;
            setHolding(true); setKey(e.code);
        });

        document.addEventListener("keyup", (e) => {
            if (e.repeat)
                return;
            setHolding(false); setKey(e.code); 
        }); 

        return () => {
            document.removeEventListener("keydown", null);
            document.removeEventListener("keyup", null);
        };
    }, []);

    const ACTIVATION_KEY = "Space";
    const ACTIVATION_TIME = 300; // in miliseconds
    const UI_UPDATING_FREQ = 1; // every miliseconds

    const [key, setKey] = useState();

    const [isHolding, setHolding] = useState(false);
    const [holdingPoint, setHoldingPoint] = useState(0);
    const [holdingTime, setHoldingTime] = useState(0);

    const [isTiming, setTiming] = useState(false);
    const [timingPoint, setTimingPoint] = useState(0);
    const [time, setTime] = useState(0);

    const startHoldingHandler = (key) => {
        if (isTiming) {
            setTiming(false);
            setTime(new Date().getTime() - timingPoint);
            setHoldingTime(0);
        } else if (key === ACTIVATION_KEY) {
            setHolding(true);
            setHoldingPoint(new Date().getTime());
        }
    }

    const stopHoldingHandler = (key) => {
        setHolding(false);
        if (holdingPoint != 0 && key === ACTIVATION_KEY) {
            const stopHoldingPoint = new Date().getTime();
            setHoldingTime(stopHoldingPoint - holdingPoint);
            if (holdingTime >= ACTIVATION_TIME)
                startTimingHandler();
        }
    }

    const startTimingHandler = () => {
        setTiming(true);
        setTimingPoint(new Date().getTime());

        setHoldingTime(0);
        setHoldingPoint(0);

        setStartSignal((oldSignal) => !oldSignal);
    }

    const stopTimingHandler = () => {
        setTimingPoint(0);
        
        setSolveTime(time);
    }

    useEffect(() => {
        isHolding ? startHoldingHandler(key) : stopHoldingHandler(key);
    }, [isHolding]);

    useEffect(() => {
        var id;
        if (isHolding && holdingPoint > 0) {
            id = setInterval(
                () => { 
                    setHoldingTime(new Date().getTime() - holdingPoint);
                },
                UI_UPDATING_FREQ
            );
        }

        return () => {
            clearInterval(id);
        }
    }, [holdingPoint]);

    useEffect(() => {
        if (isTiming) {
            const id = setInterval(
                () => setTime(new Date().getTime() - timingPoint),
                UI_UPDATING_FREQ
            );
            
            return () => {
                clearInterval(id);
                setTiming(false);
            };
        } else if (timingPoint > 0) {
            stopTimingHandler();
        }
    }, [isTiming]);
    
    const holdingPercent = holdingTime / ACTIVATION_TIME * 100;
    return (
        <div className={`time ${isHolding && "holding"} ${isTiming && "timing"}`} 
             style= { 
                        (isHolding && key === ACTIVATION_KEY && holdingPercent < 100) 
                        ? { "--percent": `${holdingPercent}%`, color: "rgba(0, 0, 0, 0.1)" } 
                        : (isHolding && key === ACTIVATION_KEY) 
                        ? { color: "#66FF00" } 
                        : {}
                    }
             children={displayTime(time)}
        />
    );
}

function TimeContainer({ setSolves, ao }) {
    const [scrambleAndType, setScrambleAndType] = useState({});
    const [solveTime, setSolveTime] = useState(-1);
    const [startSignal, setStartSignal] = useState(false);
    const [isHidden, setHidden] = useState(true);

    useEffect(() => {
        if (solveTime !== -1) {
            const newSolve = {
                time: solveTime,
                scramble: scrambleAndType.scramble,
                type: scrambleAndType.type,
            };
            
            setSolves((oldSolves) => [...oldSolves, newSolve]);
        }
    }, [solveTime]);

    useEffect(() => {
        setHidden(true);
    }, [startSignal]);

    useEffect(() => {
        setHidden(false);
    }, [solveTime]);

    return <div className="time-container">
        <Scramble solveTime={solveTime} setScrambleAndType={setScrambleAndType} isHidden={isHidden}/>

        <div className="timer-wrapper">
            <Timer setSolveTime={setSolveTime} setStartSignal={setStartSignal}/>
            <div className="ao5" style={{ opacity: isHidden ? 0 : 1}}>
                ao5: {displayTime(ao.ao5)}
            </div>
            <div className="ao12" style={{ opacity: isHidden ? 0 : 1}}>
                ao12: {displayTime(ao.ao12)}
            </div>
        </div>
    </div>
}

function SolveList({ solves, setAo }) {
    const n = solves.length;

    useEffect(() => {
        n && setAo({
            ao5: n > 4 ? ao(solves.slice(-5, n)) : -1,
            ao12: n > 11 ? ao(solves.slice(-12, n)) : -1
        });
    }, [n]);
        
    return <ul className="solve-list">        
        <div className="solve-list-header">
            <span>#</span>    
            <span>time</span>    
            <span>ao5</span>    
            <span>ao12</span>
        </div>
        {solves.map((solve, index) => <SolveItem key={`solve${new Date().getTime() + index}`} solves={solves} index={n - index - 1} />) }
    </ul>
}

function SolveItem({ solves, index }) {
    const [isHover, setHover] = useState(false);

    return <>
        {
            isHover && <SolveInfoCard solves={solves} index={index}/>
        }
        <li className="solve" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <span>{ index }</span>
            <span>{ displayTime(solves[index].time) }</span>
            <span>{ displayTime((index > 3) ? ao(solves.slice(index - 4, index + 1)) : -1) }</span>
            <span>{ displayTime((index > 10) ? ao(solves.slice(index - 11, index + 1)) : -1) }</span>
        </li>
    </>
}

function SolveInfoCard({ solves, index }) {
    const [scrambleSvg, setScrambleSvg] = useState("");

    useEffect(() => {
        async function setScrambleSvgAsync() {
            setScrambleSvg(await cstimerWorker.getImage(solves[index].scramble, wca_events[solves[index].type][1]));
        }

        setScrambleSvgAsync();
    }, []);
    
    useEffect(() => {
        if (scrambleSvg.length) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = scrambleSvg;

            tempDiv.firstChild.setAttribute("viewBox", `0 0 ${tempDiv.firstChild.width.animVal.value} ${tempDiv.firstChild.height.animVal.value}`);
            tempDiv.firstChild.setAttribute("height", "100%");
            tempDiv.firstChild.removeAttribute("width");

            const targetDiv = document.getElementById(`item-scramble-image-${index}`);
            targetDiv.appendChild(tempDiv.firstChild);
        }
    }, [scrambleSvg]);

    return <div className="solve-info-card">
        <p>{wca_events[solves[index].type][0]}</p>
        <p>{solves[index].scramble}</p>

        <div id={`item-scramble-image-${index}`}></div>
    </div>
}