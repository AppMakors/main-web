import { useEffect, useState } from "react";
import "../styles/Hiragana.css"
import CubeLoader from "../components/global/CubeLoader.jsx"

export default function Hiragana() {
    const NUMBER_OF_CHOICES = 5;

    const [letters, setLetters] = useState([]);
    const [signal, setSignal] = useState(false);

    useEffect(() => {
        async function getLetters() {
            const response = await fetch(`${location.origin}/main-web/linguistics/hiragana/alphabet_full.json`);
            const responseList = await response.json();

            // await new Promise(resolve => setTimeout(resolve, 2000));

            setLetters(responseList);
        }

        getLetters();
    }, [])

    if (!letters.length)
        return <CubeLoader />;

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

    return (
        <div className="hiragana-main">
            <p>{letter}</p>

            <div className="choice-row">
                {choices.map((v, i) => <button className="ans" key={new Date().getTime() + i} value={v} onClick={choiceHandler}>{v}</button>)}
            </div>

            <Alphabet letters={letters}/>
        </div>
    )
}

function Alphabet({ letters }) {
    const [isOpened, setOpen] = useState(false);

    return <>
        <button className="alphabet-button" onClick={() => setOpen(!isOpened)}>{isOpened ? "Close" : "Show alphabet"}</button>

        {isOpened && <div className="alphabet-dialog">
            <AlphabetRows letters={letters}/>
        </div>}
    </>
}

function AlphabetRows({ letters }) {
    var i = 0;
    var divs = [];

    while (i < letters.length) {
        var romanjiArr = [];
        
        if (i === 35 || i === 43 || (i >= 71 && i % 3 === 2)) {
            for (var j = 0; j < 3; j++) romanjiArr.push(letters[i + j][1]);
            i += 3;
        } else {
            for (var j = 0; j < 5; j++) romanjiArr.push(letters[i + j][1]);
            i += 5;
        }

        divs.push(<div className="alphabet-row">
            {romanjiArr.map((v) => <img className="alphabet-image" key={v} src={`https://www.nhk.or.jp/lesson/assets/images/letters/detail/hira/${v}.png`}/>)}
        </div>);
    }

    return divs;
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