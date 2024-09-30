import { useEffect, useRef, useState } from "react";
import "../styles/Japanese.css"
import CubeLoader from "../components/global/CubeLoader.jsx"
import CloseIcon from "../assets/svg/icon_close.svg"
import {useKeyEvent, useOutsideClick} from "../hooks";
import { myRandom, shuffle } from "../functions/japanese.jsx";

export default function Japanese() {
    const [letters, setLetters] = useState([]);
    const [type, setType] = useState([ "hira", "full" ]);
    const selectRefs = [useRef(null), useRef(null)];

    useEffect(() => {
        const optionsString = localStorage.getItem("ja_ops");
        if (optionsString) {
            setType(JSON.parse(optionsString));
        }
    }, [])

    useEffect(() => {
        async function getLetters() {
            const response = await fetch(`${location.origin}/main-web/miniapps/japanese/${type[0]}_${type[1]}.json`);
            const responseList = await response.json();

            // await new Promise(resolve => setTimeout(resolve, 2000));

            setLetters(responseList);
        }

        getLetters();

        localStorage.setItem("ja_ops", JSON.stringify(type));
    }, [type])

    return (
        <div className="japanese-main">
            <div className="select-container">
                <select value={type[0]} ref={selectRefs[0]} onChange={ (e) => setType(([a, b]) => [ e.target.value, b ]) }>
                    <option value={"hira"}>Hiragana</option>
                    <option value={"kana"}>Katakana</option>
                </select>

                <select value={type[1]} ref={selectRefs[1]} onChange={ (e) => setType(([a, b]) => [a, e.target.value]) }>
                    <option value={"full"}>Full</option>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                </select>
            </div>
            
            {
                letters.length
                ? <>
                    <Question letters={letters}/>
                    <Alphabet letters={letters} type={type} selectRefs={selectRefs}/>
                </>
                : <CubeLoader />
            }
        </div>
    )
}

function Question({ letters }) {
    // Note that: ROWS * CHOICES_PER_ROW must be less than or equal to 25
    const ROWS = 2;
    const CHOICES_PER_ROW = 5;

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

    while (choices.length < ROWS * CHOICES_PER_ROW) {
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

    let choiceRows = [];
    for (let i = 0; i < ROWS; i++) {
        choiceRows.push(
            <div key={i}>
                {choices.slice(CHOICES_PER_ROW * i, CHOICES_PER_ROW * (i + 1))
                        .map((v, index) => <button className="ans" key={new Date().getTime() + index} value={v} onClick={choiceHandler}>{v}</button>)}
            </div>
        );
    }

    return <div className="question-container">
        <p>{letter}</p>

        <div className="choice-row">
            {choiceRows.map((v) => v)}
        </div>
    </div>
}

function Alphabet({ letters, type, selectRefs }) {
    const [isOpened, setOpen] = useState(false);
    const alphabetDialogRef = useRef(null);

    useKeyEvent(alphabetDialogRef, "keyup", "Escape", () => setOpen(false));
    useOutsideClick([alphabetDialogRef, ...selectRefs], () => setOpen(false));

    return <>
        {!isOpened && <button className="alphabet-button" onClick={() => setOpen(true)}>Show alphabet</button>}

        {isOpened && <div className="alphabet-dialog" ref={alphabetDialogRef}>
            <img className="close-icon" src={CloseIcon} onClick={() => setOpen(false)}/>

            <AlphabetRows letters={letters} type={type}/>
        </div>}
    </>
}

function AlphabetRows({ letters, type }) {
    var i = 0;
    var rows = [];

    try {
        while (i < letters.length) {
            var romanjiArr = [];
            
            if (i === 35 || i === 43 || (i >= 71 && i % 3 === 2) || type[1] === "3") {
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
    } catch (ex) {
        // This try catch is used to fix the bug:
        // The AlphabetRows will be reload 2 times if user changes "type" in the select element,
        // then "type" is changed faster than "letters" (because the letters is asynchronously fetched),
        // so that, at the first reload, "type" is changed but "letters" isn't, bug will appear,
        // at the second reload, "letters" is successfully changed, there'll no bug
        // Solution: ignore the bug at the first reload using try catch, because the first reload is unnecessary at all
    }

    return rows;
}