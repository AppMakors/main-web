import { useEffect, useState } from "react";
import "../styles/Hiragana.css"

export default function Hiragana() {
    const [letters, setLetters] = useState([]);
    const [signal, setSignal] = useState(false);

    useEffect(() => {
        async function getLetters() {
			const response = await fetch(`${location.origin}/main-web/linguistics/hiragana/alphabet.json`);
			const responseList = await response.json();

            setLetters(responseList);
		}

		getLetters();
    }, [])

    if (!letters.length) 
        return <>Loading</>;

    const letterIdx = myRandom(0, letters.length - 1);
    const isRomanji = myRandom(0, 1);
    const letter = letters[letterIdx][isRomanji];

    let selectedIdx = [
        letterIdx
    ];
    let choices = [
        letters[letterIdx][isRomanji ^ 1]
    ];

    while (choices.length < 4) {
        const randInt = myRandom(0, letters.length - 1);

        if (selectedIdx.indexOf(randInt) === -1) {
            randInt % 2 ? choices.push(letters[randInt][isRomanji ^ 1]) : choices = [letters[randInt][isRomanji ^ 1], ...choices];
            selectedIdx.push(randInt);
        }
    }

	return (
		<div className="hiragana-main" style={{width: "fit-content", margin: "auto", color: "white", fontSize: "100px"}}>
            <p>{letter}</p>

            <div className="choice-row">
                {choices.map((v, i) => <button key={new Date().getTime() + i} value={v}>{v}</button>)}
            </div>

            <select onChange={(e) => {
                if (e.target.value === letters[letterIdx][isRomanji ^ 1]) {
                    setSignal(!signal);
                }
            }} style={{fontSize: "50px"}}>
                {choices.map((v, i) => <option key={new Date().getTime() + i} value={v}>{v}</option>)}
                <option selected={"selected"}></option>
            </select>
        </div>
	)
}

function myRandom(min, max) {
    return parseInt(new Date().getTime() % (max - min + 1) + min);
}