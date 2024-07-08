import "./styles/Header.css"
import { Link } from "react-router-dom"
import ReactLogo from "./assets/react.svg"
 
export default function Header() {
    return (
        <div className="header">
            <Link to={`${import.meta.env.BASE_URL}/`} className="logo">
                <img src={ReactLogo} alt="Logo" />
            </Link>
            <ul className="page-list">
                <li>
                    <Link className="page-button" to={`${import.meta.env.BASE_URL}/vocab`}>
                        VocabLearning
                    </Link>
                </li>
                <li>
                    <Link className="page-button" to={`${import.meta.env.BASE_URL}/rubiks`}>
                        RubiksTimor
                    </Link>
                </li>
                <li>
                    <Link className="page-button" to={`${import.meta.env.BASE_URL}/blogs`}>
                        Blogs
                    </Link>    
                </li>
                <li>
                    <Link className="page-button" to={`${import.meta.env.BASE_URL}/about`}>
                        About
                    </Link>
                </li>
            </ul>
        </div>    
    ); 
}