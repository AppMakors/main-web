import { useState } from "react";
import "./styles/Header.css"
import { Link } from "react-router-dom"
import ReactLogo from "./assets/react.svg"
import AboutIcon from "./assets/icon_about.svg"
import BlogIcon from "./assets/icon_blog.svg"
import LanguagueIcon from "./assets/icon_language.svg"
import RubikIcon from "./assets/icon_rubik.svg"
 
export default function Header() {
    // -1: home, 0: vocab, 1: rubik, 2: blogs, 3: about
    const [value, setValue] = useState(-1);

    const getStyle = (_value) => {
        if (value == _value) {
            return {
                filter: "brightness(0) saturate(100%) invert(73%) sepia(38%) saturate(6252%) hue-rotate(150deg) brightness(107%) contrast(104%)",
            };
        }
        return {};
    }

    return (
        <div className="header">
            <Link to={`${import.meta.env.BASE_URL}`} className="logo">
                <img src={ReactLogo} alt="Logo" onClick={() => setValue(-1)}/>
            </Link>
            <ul className="page-list">
                <li>
                    <Link to={`${import.meta.env.BASE_URL}vocab`}>
                        <img className="page-button" src={LanguagueIcon} title="Vocabulary Learning" onClick={() => setValue(0)} style={getStyle(0)}></img>
                    </Link>
                </li>
                <li>
                    <Link to={`${import.meta.env.BASE_URL}rubiks`}>
                        <img className="page-button" src={RubikIcon} title="Rubik's Timer" onClick={() => setValue(1)} style={getStyle(1)}></img>
                    </Link>
                </li>
                <li>
                    <Link to={`${import.meta.env.BASE_URL}blogs`}>
                        <img className="page-button" src={BlogIcon} title="Blogs" onClick={() => setValue(2)} style={getStyle(2)}></img>
                    </Link>
                </li>
                <li>
                    <Link to={`${import.meta.env.BASE_URL}about`}>
                        <img className="page-button" src={AboutIcon} title="About us" onClick={() => setValue(3)} style={getStyle(3)}></img>
                    </Link>
                </li>
            </ul>
        </div>    
    ); 
}