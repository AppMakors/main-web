import { useEffect, useRef, useState } from "react";
import "../styles/Japanese.css"
import CubeLoader from "../components/global/CubeLoader.jsx"
import CloseIcon from "../assets/svg/icon_close.svg"
import useOutsideClick from "../hooks/useOutsideClick.jsx";
import useKeyEvent from "../hooks/useKeyEvent.jsx";

export default function Japanese() {
    const [letters, setLetters] = useState([]);
    const [type, setType] = useState([ "hira", "learnt" ]);

    useEffect(() => {
        async function getLetters() {
            const response = await fetch(`${location.origin}/main-web/miniapps/japanese/${type[0]}_${type[1]}.json`);
            const responseList = await response.json();

            // await new Promise(resolve => setTimeout(resolve, 2000));

            setLetters(responseList);
        }

        getLetters();
    }, [type])

    return (
        <div className="japanese-main">
            <select className="alphabet-select" onChange={ (e) => setType(([a, b]) => [ e.target.value, b ]) }>
                <option value={"hira"}>Hiragana</option>
                <option value={"kana"}>Katakana</option>
            </select>

            <select className="alphabet-select" onChange={ (e) => setType(([a, b]) => [a, e.target.value]) }>
                <option value={"learnt"}>Learnt</option>
                <option value={"full"}>Full</option>
            </select>
            
            {
                letters.length
                ? <>
                    <Question letters={letters}/>
                    <Alphabet letters={letters} type={type}/>
                </>
                : <CubeLoader />
            }
        </div>
    )
}

function Question({ letters }) {
    const NUMBER_OF_CHOICES = 5;

    const [signal, setSignal] = useState(false);

    const letterIdx = myRandom(0, letters.length - 1);
    const isRomanji = myRandom(0, 1);
    const letter = letters[letterIdx][isRomanji];

    let selectedIdx = [
        letterIdx
    ];
    let choices = [
        letters[letterIdx][isRomanji ^ 1]
    ];

    while (choices.length < NUMBER_OF_CHOICES) {
        const randInt = myRandom(0, letters.length - 1);

        if (selectedIdx.indexOf(randInt) === -1) {
            choices.push(letters[randInt][isRomanji ^ 1]);
            selectedIdx.push(randInt);
        }
    }

    shuffle(choices);

    const choiceHandler = (e) => {
        if (e.target.value !== letters[letterIdx][isRomanji ^ 1]) {
            e.target.classList.add("wrong-ans");
            e.target.classList.remove("ans");
            const id = setTimeout(() => { e.target.classList.remove("wrong-ans"); e.target.classList.add("ans"); clearTimeout(id); }, 300);
        } else {
            e.target.classList.remove("ans");
            e.target.classList.add("right-ans");
            const id = setTimeout(() => { e.target.classList.remove("right-ans"); e.target.classList.add("ans"); clearTimeout(id); }, 300);
            const id1 = setTimeout(() => { setSignal(!signal); clearTimeout(id1); }, 100);
        }
    };

    return <div className="question-container">
        <p>{letter}</p>

        <div className="choice-row">
            {choices.map((v, i) => <button className="ans" key={new Date().getTime() + i} value={v} onClick={choiceHandler}>{v}</button>)}
        </div>
    </div>
}

function Alphabet({ letters, type }) {
    const [isOpened, setOpen] = useState(false);
    const alphabetDialogRef = useRef(null);

    useKeyEvent(alphabetDialogRef, "keyup", "Escape", () => setOpen(false));
    useOutsideClick(alphabetDialogRef, () => setOpen(false))

    return <>
        {!isOpened && <button className="alphabet-button" onClick={() => setOpen(true)}>Show alphabet</button>}

        {isOpened && <div className="alphabet-dialog">
            <img className="close-icon" src={CloseIcon} ref={alphabetDialogRef} onClick={() => setOpen(true)}/>

            <AlphabetRows letters={letters} type={type}/>
        </div>}
    </>
}

function AlphabetRows({ letters, type }) {
    var i = 0;
    var rows = [];

    while (i < letters.length) {
        var romanjiArr = [];
        
        if (i === 35 || i === 43 || (i >= 71 && i % 3 === 2)) {
            for (var j = 0; j < 3; j++) romanjiArr.push(letters[i + j][1]);
            i += 3;
        } else {
            for (var j = 0; j < 5; j++) romanjiArr.push(letters[i + j][1]);
            i += 5;
        }

        rows.push(
            <div className="alphabet-row" key={new Date().getTime() + i}>
                {romanjiArr.map((v) => <img className="alphabet-image" key={v} src={`https://www.nhk.or.jp/lesson/assets/images/letters/detail/${type[0]}/${v}.png`}/>)}
            </div>
        );
    }

    return rows;
}

function myRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fisher–Yates Shuffle Algorithm: https://bost.ocks.org/mike/shuffle/
function shuffle(a) {
    var m = a.length, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        [a[m], a[i]] = [a[i], a[m]]; 
    }

    return a;
}