import "../assets/style.css"
import "../styles/RubiksTimor.css"
import {useState, useEffect} from 'react'

import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 

import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCKjavn2bG5cJAgcL728Uly2J9r35xeqqk",
    authDomain: "rubiks-timor.firebaseapp.com",
    projectId: "rubiks-timor",
    storageBucket: "rubiks-timor.appspot.com",
    messagingSenderId: "700388105281",
    appId: "1:700388105281:web:209361463dbab4338d7ac0",
    measurementId: "G-KF9PDSXMLM"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersRef = db.collection("users"); 

export default function RubiksTimor() {
    const [user] = useAuthState(auth);
    const [solves, setSolves] = useState([]);
    const [signal, setSignal] = useState(false);
    
    const solveToDBPusher = (solve) => {
        if (user) {
            
        }
    }
    
    return <div className="rubiks-main">
        <div className="left-panel">
            {user ? <SignOut /> : <SignIn />}
            {user ? <SolveList solves={solves} /> : "Not signed in yet"}
        </div>

        <div className="time-container">
            <Scramble signal={signal}/>

            <div className="timer-wrapper">
                <Timer user={user} setSolves={setSolves} setSignal={setSignal}/>
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

function Scramble({ signal }) {
    const cstimerWorker=(function(){var worker=new Worker('/main-web/cstimer_module.js');var callbacks={};var msgid=0;worker.onmessage=function(e){var data=e.data;var callback=callbacks[data[0]];delete callbacks[data[0]];callback&&callback(data[2])}
    function callWorkerAsync(type,details){return new Promise(function(type,details,resolve){++msgid;callbacks[msgid]=resolve;worker.postMessage([msgid,type,details])}.bind(null,type,details))}
    return{getScrambleTypes:function(){return callWorkerAsync('scrtype')},getScramble:function(){return callWorkerAsync('scramble',Array.prototype.slice.apply(arguments))},setSeed:function(seed){return callWorkerAsync('seed',[seed])},setGlobal:function(key,value){return callWorkerAsync('set',[key,value])},getImage:function(scramble,type){return callWorkerAsync('image',[scramble,type])}}})()
    
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
        }

        setScrambleAndScrambleSvg();
    }, [type, signal, renewSignal])

    return <div>
        <div className="scramble-settings">
            <select onChange={(e) => {setType(e.target.value)}}>
                {wca_events.map((v, i) => <option key={`type${i}`} value={i}>{v[0]}</option>)}
            </select>

            <button onClick={() => {}}>left</button>

            <button onClick={() => {setRenewSignal(!renewSignal);}}>right</button>
        </div>
        <div className="scramble">{scramble}</div>
        <div className="scramble-image" dangerouslySetInnerHTML={{ __html: scrambleSvg }}></div>
    </div>
}

function Timer({ setSolves, setSignal }) {
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
        
        const newSolve = {
            type: "",
            scramble: "",
            time: time
        }

        setSolves((old) => [newSolve, ...old]);
        setSignal((oldSignal) => !oldSignal);
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

function SignIn() {
    const googleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider(); 
        await auth.signInWithPopup(provider); // popup the window for signing in

        const user = auth.currentUser;
        const userRes = await usersRef.doc(user.uid).get();
        
        if (!userRes.exists) {
            // create a new document in the users collection
            usersRef.doc(auth.currentUser.uid).set({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            });
        }
    }

    return <button className="auth-button" onClick={googleSignIn}>
        Sign In
    </button>
}

function SignOut() {
    return auth.currentUser && (
        <button className="auth-button" onClick={() => auth.signOut()}>
            Sign out
        </button>
    )
}

function SolveList({ solves }) {
    const n = solves.length;
    return <ul className="solve-list">
        {solves.map((solve, index) => {
            return <li className="solve" key={`solve${index}`}>
                <span>{n - index - 1}</span>
                <span>{ (solve.time / 1000).toFixed(3) }</span>
            </li>
        })}
    </ul>
}