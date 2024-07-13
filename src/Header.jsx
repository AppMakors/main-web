import "./styles/Header.css"
import { Link } from "react-router-dom"
import ReactLogo from "./assets/react.svg"
import AboutIcon from "./assets/icon_about.svg"
import BlogIcon from "./assets/icon_blog.svg"
import LanguagueIcon from "./assets/icon_language.svg"
import RubikIcon from "./assets/icon_rubik.svg"
 
export default function Header() {
    return (
        <div className="header">
            <Link to={`${import.meta.env.BASE_URL}`} className="logo">
                <img src={ReactLogo} alt="Logo" />
            </Link>
            <ul className="page-list">
                <li>
                    <Link to={`${import.meta.env.BASE_URL}vocab`}>
                        <img className="page-button" src={LanguagueIcon} alt="Logo" title="Vocabulary Learning"></img>
                    </Link>
                </li>
                <li>
                    <Link to={`${import.meta.env.BASE_URL}rubiks`}>
                        <img className="page-button" src={RubikIcon} alt="Logo" title="Rubik's Timer"></img>
                    </Link>
                </li>
                <li>
                    <Link to={`${import.meta.env.BASE_URL}blogs`}>
                        <img className="page-button" src={BlogIcon} alt="Logo" title="Blogs"></img>
                    </Link>
                </li>
                <li>
                    <Link to={`${import.meta.env.BASE_URL}about`}>
                        <img className="page-button" src={AboutIcon} alt="Logo" title="About us"></img>
                    </Link>
                </li>
            </ul>
        </div>    
    ); 
}