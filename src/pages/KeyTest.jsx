import { useState, useEffect } from "react";
import "../styles/KeyTest.css";

export default function KeyTest() {
    const [pressedKeys, setPressedKeys] = useState({});
    const [text, setText] = useState([]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.repeat)
                return;
            setText(prev =>[...(prev.length < 15 ? prev : prev.slice(1, 15)), event.key]);
            if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
                setPressedKeys((prev) => ({ ...prev, [event.keyCode + 1000]: true }));
                event.preventDefault();
                return;
            }

            setPressedKeys((prev) => ({ ...prev, [event.keyCode]: true }));
            event.preventDefault();
        };

        const handleKeyUp = (event) => {
            if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
                setPressedKeys((prev) => ({ ...prev, [event.keyCode + 1000]: false }));
                event.preventDefault();
                return;
            }

            if (event.keyCode === 44) {
                setPressedKeys((prev) => ({ ...prev, [event.keyCode]: true }));
                setTimeout(() => {
                    setPressedKeys((prev) => ({ ...prev, [event.keyCode]: false }));
                }, 100);
                return;
            }

            setPressedKeys((prev) => ({ ...prev, [event.keyCode]: false }));
            event.preventDefault();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return <div className="keytest-main">
        <div className="text">{text.map((key) => <span>{key}</span>)}</div>
        <div className="keyboard">
            <div className="keyboard__row keyboard__row--h1">
                <div className={`key--word ${pressedKeys[27] && 'pressed'}`}>
                    <span>esc</span>
                </div>
                <div className={`key--fn ${pressedKeys[112] && 'pressed'}`}>
                    <span>F1</span>
                </div>
                <div className={`key--fn ${pressedKeys[113] && 'pressed'}`}>
                    <span>F2</span>
                </div>
                <div className={`key--fn ${pressedKeys[114] && 'pressed'}`}>
                    <span>F3</span>
                </div>
                <div className={`key--fn ${pressedKeys[115] && 'pressed'}`}>
                    <span>F4</span>
                </div>
                <div className={`key--fn ${pressedKeys[116] && 'pressed'}`}>
                    <span>F5</span>
                </div>
                <div className={`key--fn ${pressedKeys[117] && 'pressed'}`}>
                    <span>F6</span>
                </div>
                <div className={`key--fn ${pressedKeys[118] && 'pressed'}`}>
                    <span>F7</span>
                </div>
                <div className={`key--fn ${pressedKeys[119] && 'pressed'}`}>
                    <span>F8</span>
                </div>
                <div className={`key--fn ${pressedKeys[120] && 'pressed'}`}>
                    <span>F9</span>
                </div>
                <div className={`key--fn ${pressedKeys[121] && 'pressed'}`}>
                    <span>F10</span>
                </div>
                <div className={`key--fn ${pressedKeys[122] && 'pressed'}`}>
                    <span>F11</span>
                </div>
                <div className={`key--fn ${pressedKeys[123] && 'pressed'}`}>
                    <span>F12</span>
                </div>
                <div className={`key--word ${pressedKeys[44] && 'pressed'}`}>
                    <span>prt sc</span>
                </div>
                <div className={`key--word ${pressedKeys[46] && 'pressed'}`} style={{width: "3.3em"}}>
                    <span>delete</span>
                </div>
            </div>
            <div className="keyboard__row">
                <div className={`key--double ${pressedKeys[192] && 'pressed'}`}>
                    <div>~</div>
                    <div>`</div>
                </div>
                <div className={`key--double ${pressedKeys[49] && 'pressed'}`}>
                    <div>!</div>
                    <div>1</div>
                </div>
                <div className={`key--double ${pressedKeys[50] && 'pressed'}`}>
                    <div>@</div>
                    <div>2</div>
                </div>
                <div className={`key--double ${pressedKeys[51] && 'pressed'}`}>
                    <div>#</div>
                    <div>3</div>
                </div>
                <div className={`key--double ${pressedKeys[52] && 'pressed'}`}>
                    <div>$</div>
                    <div>4</div>
                </div>
                <div className={`key--double ${pressedKeys[53] && 'pressed'}`}>
                    <div>%</div>
                    <div>5</div>
                </div>
                <div className={`key--double ${pressedKeys[54] && 'pressed'}`}>
                    <div>^</div>
                    <div>6</div>
                </div>
                <div className={`key--double ${pressedKeys[55] && 'pressed'}`}>
                    <div>&</div>
                    <div>7</div>
                </div>
                <div className={`key--double ${pressedKeys[56] && 'pressed'}`}>
                    <div>*</div>
                    <div>8</div>
                </div>
                <div className={`key--double ${pressedKeys[57] && 'pressed'}`}>
                    <div>(</div>
                    <div>9</div>
                </div>
                <div className={`key--double ${pressedKeys[48] && 'pressed'}`}>
                    <div>)</div>
                    <div>0</div>
                </div>
                <div className={`key--double ${pressedKeys[189] && 'pressed'}`}>
                    <div>_</div>
                    <div>-</div>
                </div>
                <div className={`key--double ${pressedKeys[187] && 'pressed'}`}>
                    <div>+</div>
                    <div>=</div>
                </div>
                <div className={`key--bottom-right key--word key--w4 ${pressedKeys[8] && 'pressed'}`}>
                    <span>backspace</span>
                </div>
                <div className={`key--word ${pressedKeys[45] && 'pressed'}`}>
                    <span>insert</span>
                </div>
            </div>
            <div className="keyboard__row">
                <div className={`key--bottom-left key--word key--w4 ${pressedKeys[9] && 'pressed'}`}>
                    <span>tab</span>
                </div>
                <div className={`key--letter ${pressedKeys[81] && 'pressed'}`}>Q</div>
                <div className={`key--letter ${pressedKeys[87] && 'pressed'}`}>W</div>
                <div className={`key--letter ${pressedKeys[69] && 'pressed'}`}>E</div>
                <div className={`key--letter ${pressedKeys[82] && 'pressed'}`}>R</div>
                <div className={`key--letter ${pressedKeys[84] && 'pressed'}`}>T</div>
                <div className={`key--letter ${pressedKeys[89] && 'pressed'}`}>Y</div>
                <div className={`key--letter ${pressedKeys[85] && 'pressed'}`}>U</div>
                <div className={`key--letter ${pressedKeys[73] && 'pressed'}`}>I</div>
                <div className={`key--letter ${pressedKeys[79] && 'pressed'}`}>O</div>
                <div className={`key--letter ${pressedKeys[80] && 'pressed'}`}>P</div>
                <div className={`key--double ${pressedKeys[219] && 'pressed'}`}>
                    <div>{"{"}</div>
                    <div>[</div>
                </div>
                <div className={`key--double ${pressedKeys[221] && 'pressed'}`}>
                    <div>{"}"}</div>
                    <div>]</div>
                </div>
                <div className={`key--double ${pressedKeys[220] && 'pressed'}`}>
                    <div>|</div>
                    <div>\</div>
                </div>
                <div className={`key--word ${pressedKeys[36] && 'pressed'}`}>
                    <span>home</span>
                </div>
            </div>
            <div className="keyboard__row">
                <div className={`key--bottom-left key--word key--w5 ${pressedKeys[20] && 'pressed'}`}>
                    <span>caps lock</span>
                </div>
                <div className={`key--letter ${pressedKeys[65] && 'pressed'}`}>A</div>
                <div className={`key--letter ${pressedKeys[83] && 'pressed'}`}>S</div>
                <div className={`key--letter ${pressedKeys[68] && 'pressed'}`}>D</div>
                <div className={`key--letter ${pressedKeys[70] && 'pressed'}`}>F</div>
                <div className={`key--letter ${pressedKeys[71] && 'pressed'}`}>G</div>
                <div className={`key--letter ${pressedKeys[72] && 'pressed'}`}>H</div>
                <div className={`key--letter ${pressedKeys[74] && 'pressed'}`}>J</div>
                <div className={`key--letter ${pressedKeys[75] && 'pressed'}`}>K</div>
                <div className={`key--letter ${pressedKeys[76] && 'pressed'}`}>L</div>
                <div className={`key--double ${pressedKeys[186] && 'pressed'}`}>
                    <div>:</div>
                    <div>;</div>
                </div>
                <div className={`key--double ${pressedKeys[222] && 'pressed'}`}>
                    <div>"</div>
                    <div>'</div>
                </div>
                <div className={`key--bottom-right key--word key--w5 ${pressedKeys[13] && 'pressed'}`}>
                    <span>enter</span>
                </div>
                <div className={`key--word ${pressedKeys[33] && 'pressed'}`}>
                    <span>page up</span>
                </div>
            </div>
            <div className="keyboard__row">
                <div className={`key--bottom-left key--word key--w6 ${pressedKeys[16] && 'pressed'}`}>
                    <span>shift</span>
                </div>
                <div className={`key--letter ${pressedKeys[90] && 'pressed'}`}>Z</div>
                <div className={`key--letter ${pressedKeys[88] && 'pressed'}`}>X</div>
                <div className={`key--letter ${pressedKeys[67] && 'pressed'}`}>C</div>
                <div className={`key--letter ${pressedKeys[86] && 'pressed'}`}>V</div>
                <div className={`key--letter ${pressedKeys[66] && 'pressed'}`}>B</div>
                <div className={`key--letter ${pressedKeys[78] && 'pressed'}`}>N</div>
                <div className={`key--letter ${pressedKeys[77] && 'pressed'}`}>M</div>
                <div className={`key--double ${pressedKeys[188] && 'pressed'}`}>
                    <div>&lt;</div>
                    <div>,</div>
                </div>
                <div className={`key--double ${pressedKeys[190] && 'pressed'}`}>
                    <div>&gt;</div>
                    <div>.</div>
                </div>
                <div className={`key--double ${pressedKeys[191] && 'pressed'}`}>
                    <div>?</div>
                    <div>/</div>
                </div>
                <div className={`key--bottom-right key--word key--w6 ${pressedKeys[1016] && 'pressed'}`}>
                    <span>shift</span>
                </div>
                <div className={`key--word ${pressedKeys[34] && 'pressed'}`}>
                    <span>page down</span>
                </div>
            </div>
            <div className="keyboard__row keyboard__row--h3">
                <div className={`key--bottom-left key--word ${pressedKeys[17] && 'pressed'}`}>
                    <span>ctrl</span>
                </div>
                <div className={`key--bottom-left key--word key--w3 ${pressedKeys[91] && 'pressed'}`}>
                    <span>windows</span>
                </div>
                <div className={`key--bottom-right key--word key--w1 ${pressedKeys[18] && 'pressed'}`}>
                    <span>alt</span>
                </div>
                <div className={`key--double key--right key--space ${pressedKeys[32] && 'pressed'}`}>
                    &nbsp;
                </div>
                <div className={`key--bottom-left key--word key--w3 ${pressedKeys[1018] && 'pressed'}`}>
                    <span>alt</span>
                </div>
                <div className={`key--bottom-left key--word key--w1 ${pressedKeys[93] && 'pressed'}`}>
                    <span>menu</span>
                </div>
                <div className={`key--bottom-left key--word key--w1 ${pressedKeys[1017] && 'pressed'}`}>
                    <span>ctrl</span>
                </div>
                <div className={`key--arrow ${pressedKeys[37] && 'pressed'}`}>
                    <span>&#9664;</span>
                </div>
                <div className={`key--double key--arrow--tall ${pressedKeys[38] && 'pressed'} ${pressedKeys[40] && 'pressed'}`}>
                    <div>&#9650;</div>
                    <div>&#9660;</div>
                </div>
                <div className={`key--arrow ${pressedKeys[39] && 'pressed'}`}>
                    <span>&#9654;</span>
                </div>
                <div className={`key--word ${pressedKeys[35] && 'pressed'}`}>
                    <span>end</span>
                </div>
            </div>
        </div>
    </div>
}