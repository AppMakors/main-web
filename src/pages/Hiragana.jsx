import { useEffect } from "react";
import { useState } from "react"

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

    const letterIdx = myRandom(0, letters.length - 1);
    const isRomanji = myRandom(0, 1);
    const letter = letters.length ? letters[letterIdx][isRomanji] : "";

    let selectedIdx = [
        letterIdx
    ];
    let choices = [
        letters.length ? letters[letterIdx][isRomanji ^ 1] : ""
    ];

    while (choices.length < 4) {
        const randInt = myRandom(0, letters.length - 1);

        if (selectedIdx.indexOf(randInt) === -1) {
            randInt % 2 ? choices.push(letters.length ? letters[randInt][isRomanji ^ 1] : "a") : choices = [letters.length ? letters[randInt][isRomanji ^ 1] : "a", ...choices];
            selectedIdx.push(randInt);
        }
    }

	return (
		<div style={{width: "fit-content", margin: "auto", color: "white", fontSize: "100px"}}>
            <p>{letter}</p>

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