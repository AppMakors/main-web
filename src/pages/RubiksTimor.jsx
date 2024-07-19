import "../assets/style.css"
import "../styles/RubiksTimor.css"
import {useState, useEffect} from 'react'

var cstimerWorker=(function(){var worker=new Worker('node_modules/cstimer_module/cstimer_module.js');var callbacks={};var msgid=0;worker.onmessage=function(e){var data=e.data;var callback=callbacks[data[0]];delete callbacks[data[0]];callback&&callback(data[2])}
function callWorkerAsync(type,details){return new Promise(function(type,details,resolve){++msgid;callbacks[msgid]=resolve;worker.postMessage([msgid,type,details])}.bind(null,type,details))}
return{getScrambleTypes:function(){return callWorkerAsync('scrtype')},getScramble:function(){return callWorkerAsync('scramble',Array.prototype.slice.apply(arguments))},setSeed:function(seed){return callWorkerAsync('seed',[seed])},setGlobal:function(key,value){return callWorkerAsync('set',[key,value])},getImage:function(scramble,type){return callWorkerAsync('image',[scramble,type])}}})()

export default function RubiksTimor() {
    const [solves, setSolves] = useState([]);

    return <div className="rubiks-main" onClick={console.log("Load")}>
        <div className="left-panel">
            <ul className="solve-list"></ul>
        </div>

        <div className="time-container">
            <Scramble />

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

function Scramble({ }) {
    const [type, setType] = useState(0);

    var wca_events = [
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

    const [scramble, setScramble] = useState("");
    const [scrambleSvg, setScrambleSvg] = useState("");

    useEffect(() => {
        async function hehe() {
            const scrRes = await cstimerWorker.getScramble(wca_events[type][1], wca_events[type][2]);
            setScramble(await scrRes);
            const svgRes = await cstimerWorker.getImage(scrRes, wca_events[type][1]);
            setScrambleSvg(await svgRes);
        }

        hehe();
    }, [type])

    return <div>
        <ScrambleSettings setType={setType} wca_events={wca_events} />
        <ScrambleText scramble={scramble} />
        <ScrambleImage scrambleSvg={scrambleSvg} />
    </div>
}

function ScrambleSettings({ setType, wca_events }) {
    return <div className="scramble-settings">
        <select onChange={(e) => {setType(e.target.value)}}>
            {wca_events.map((v, i) => <option key={`type${i}`} value={i}>{v[0]}</option>)}
        </select>

        <button onClick={(e) => {}}>left</button>

        <button onClick={(e) => {}}>right</button>
    </div>
}

function ScrambleText({ scramble }) {
    console.log(scramble);
    return <div className="scramble">{scramble}</div>;
}

function ScrambleImage({ scrambleSvg }) {
    return <div className="scramble-image" dangerouslySetInnerHTML={{ __html: scrambleSvg }}></div>
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