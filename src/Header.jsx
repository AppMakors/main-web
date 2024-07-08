import "./styles/Header.css"
import { Link } from "react-router-dom"
import ReactLogo from "./assets/react.svg"
 
export default function Header() {
    return (
        <div className="header">
            <Link to="/" className="logo">
                <img src={ReactLogo} alt="Logo" />
            </Link>
            <ul className="page-list">
                <li>
                    <Link className="page-button" to="/vocab">
                        VocabLearning
                    </Link>
                </li>
                <li>
                    <Link className="page-button" to="/rubiks">
                        RubiksTimor
                    </Link>
                </li>
                <li>
                    <Link className="page-button" to="/blogs">
                        Blogs
                    </Link>    
                </li>
                <li>
                    <Link className="page-button" to="/about">
                        About
                    </Link>
                </li>
            </ul>
        </div>    
    ); 
}