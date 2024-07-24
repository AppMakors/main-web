import "../assets/style.css";
import "../styles/RubiksTimor.css";
import {useState, useEffect} from 'react';

const wca_events = [
    ["3x3x3", "333", 0],
    ["2x2x2", "222so", 0],
    ["4x4x4", "444wca", 0],
    ["5x5x5", "555wca", 60],
    ["6x6x6", "666wca", 80],
    ["7x7x7", "777wca", 100],
    ["3x3 bld", "333ni", 0],
    ["3x3 fm", "333fm", 0],
    ["3x3 oh", "333", 0],
    ["clock", "clkwca", 0],
    ["megaminx", "mgmp", 70],
    ["pyraminx", "pyrso", 10],
    ["skewb", "skbso", 0],
    ["sq1", "sqrs", 0],
    ["4x4 bld", "444bld", 40],
    ["5x5 bld", "555bld", 60],
    ["3x3 mbld", "r3ni", 5]
];

export default function RubiksTimor() {
    const [solves, setSolves] = useState([]);
    
    return <div className="rubiks-main">
        <div className="left-panel">
            <SolveList solves={solves} />
        </div>

        <TimeContainer setSolves={setSolves}/>
    </div>
}

function Scramble({ solveTime, setScrambleAndType }) {
    const cstimerWorker=(function(){var worker=new Worker('/main-web/cstimer_module.js');var callbacks={};var msgid=0;worker.onmessage=function(e){var data=e.data;var callback=callbacks[data[0]];delete callbacks[data[0]];callback&&callback(data[2])}
    function callWorkerAsync(type,details){return new Promise(function(type,details,resolve){++msgid;callbacks[msgid]=resolve;worker.postMessage([msgid,type,details])}.bind(null,type,details))}
    return{getScrambleTypes:function(){return callWorkerAsync('scrtype')},getScramble:function(){return callWorkerAsync('scramble',Array.prototype.slice.apply(arguments))},setSeed:function(seed){return callWorkerAsync('seed',[seed])},setGlobal:function(key,value){return callWorkerAsync('set',[key,value])},getImage:function(scramble,type){return callWorkerAsync('image',[scramble,type])}}})()
    
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

    return <>
        <div className="scramble-settings">
            <select onChange={(e) => {setType(e.target.value)}}>
                {wca_events.map((v, i) => <option key={`type${i}`} value={i}>{v[0]}</option>)}
            </select>

            <button onClick={() => {setRenewSignal(!renewSignal);}}>»</button>
        </div>
        <div className="scramble">{scramble}</div>
        <div className="scramble-image" dangerouslySetInnerHTML={{ __html: scrambleSvg }}></div>
    </>
}

function Timer({ setSolveTime }) {
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
        }
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
             children={(time / 1000).toFixed(3)}
        />
    );
}

function TimeContainer({ setSolves }) {
    const [scrambleAndType, setScrambleAndType] = useState({});
    const [solveTime, setSolveTime] = useState(-1);

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

    return <div className="time-container">
        <Scramble solveTime={solveTime} setScrambleAndType={setScrambleAndType}/>

        <div className="timer-wrapper">
            <Timer setSolveTime={setSolveTime}/>
            <div className="ao5">
                ao5
            </div>
            <div className="ao12">
                ao12
            </div>
        </div>
    </div>
}

function SolveList({ solves }) {
    const n = solves.length;
    return <ul className="solve-list">        
        <div className="solve-list-header">
            <span>#</span>    
            <span>time</span>    
            <span>ao5</span>    
            <span>ao12</span>
        </div>
        {solves.map((solve, index) => <SolveItem key={`solve${index}`} index={n - index - 1} solve={solves[n - index - 1]} />) }
    </ul>
}

function SolveItem({ index, solve }) {
    const [hoverObject, setHoverObject] = useState({ isHover: false });

    const mouseEnterHandler = (e) => {
        setHoverObject({
            isHover: true,
            leftOffset: e.target.offsetLeft + e.target.offsetWidth + 10,
            topOffset: e.target.offsetTop - e.target.parentNode.scrollTop
        });
    }

    const mouseLeaveHandler = (e) => {
        setHoverObject({ isHover: false });
    }  

    return <>
        {hoverObject.isHover && 
        <div className="solve-info-card" style={{ "left": `${hoverObject.leftOffset}px`, "top": `${hoverObject.topOffset}px`}}>
            <p>{wca_events[solve.type][0]}</p>
            <p>{solve.scramble}</p>
        </div>}
        <li className="solve" onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
            <span>{ index }</span>
            <span>{ (solve.time / 1000).toFixed(3) }</span>
            <span>{ (solve.time / 1000).toFixed(3) }</span>
            <span>{ (solve.time / 1000).toFixed(3) }</span>
        </li>
    </>
}