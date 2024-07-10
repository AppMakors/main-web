import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../styles/Blog.css"

export default function About() {
    const [content, setContent] = useState("");

    useEffect(() => {
        async function getAbout() {
            const response = await fetch(`./about.md`);
            const text = await response.text();

            setContent(text);
        }

        getAbout();
    })

    return <div className="blog-content">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
}