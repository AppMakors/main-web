import { useState } from "react";
import "./styles/Header.css"
import { Link } from "react-router-dom"
import AboutIcon from "./assets/svg/icon_about.svg"
import BlogIcon from "./assets/svg/icon_blog.svg"
import MiniappIcon from "./assets/svg/icon_miniapp.svg"
import RubikIcon from "./assets/svg/icon_rubik.svg"
 
export default function Header() {
    const [curPage, setCurPage] = useState(location.pathname.split("/")[2]);

    const baseUrl = import.meta.env.BASE_URL;

    const getStyle = (value) => {
        if (curPage === value) {
            return {
                filter: "brightness(0) saturate(100%) invert(73%) sepia(38%) saturate(6252%) hue-rotate(150deg) brightness(107%) contrast(104%)",
            };
        }
        return {};
    }

    return (
        <header>
            <Link to={`${baseUrl}`} className="link-logo">
                <div className="full-logo" onClick={() => setCurPage("")}>
                    <div className="logo">&lt;</div>
                    <div className="shrink logo">AppMakors</div>
                    <div className="logo">/&gt;</div>
                </div>
            </Link>
            <ul className="page-list">
                <li>
                    <Link to={`${baseUrl}miniapps`}>
                        <img className="page-button" src={MiniappIcon} title="Mini Apps" onClick={() => setCurPage("miniapps")} style={getStyle("miniapps")}></img>
                    </Link>
                </li>
                <li>
                    <Link to={`${baseUrl}rubiks`}>
                        <img className="page-button" src={RubikIcon} title="Rubik's Timor" onClick={() => setCurPage("rubiks")} style={getStyle("rubiks")}></img>
                    </Link>
                </li>
                <li>
                    <Link to={`${baseUrl}blogs`}>
                        <img className="page-button" src={BlogIcon} title="Blogs" onClick={() => setCurPage("blogs")} style={getStyle("blogs")}></img>
                    </Link>
                </li>
                <li>
                    <Link to={`${baseUrl}about`}>
                        <img className="page-button" src={AboutIcon} title="About us" onClick={() => setCurPage("about")} style={getStyle("about")}></img>
                    </Link>
                </li>
            </ul>
        </header>
    );
}