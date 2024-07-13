import React, { useState } from 'react';
import UpIcon from "../assets/icon_up.svg"

export default function ScrollButton() {
    const [visible, setVisible] = useState(false);
    const [isEntered, setEnter] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    const normalStyle = {
        position: "fixed",
        margin: "0 25px 25px 0",
        right: "0",
        bottom: "0",
        height: "50px",
        width: "50px",
        cursor: "pointer",
        display: visible ? 'inline' : 'none'
    }

    const enterStyle = {
        position: "fixed",
        margin: "0 25px 25px 0",
        right: "0",
        bottom: "0",
        height: "50px",
        width: "50px",
        cursor: "pointer",
        filter: "brightness(0) saturate(100%) invert(73%) sepia(38%) saturate(6252%) hue-rotate(150deg) brightness(107%) contrast(104%)"
    }

    return (
        <img onMouseLeave={() => setEnter(false)} onMouseEnter={() => setEnter(true)} onClick={scrollToTop} src={UpIcon} style={isEntered ? enterStyle : normalStyle}/>
    );
}