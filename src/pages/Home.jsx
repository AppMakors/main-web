import { useState, useEffect } from "react";

// const blogs = require.context("public/blogs/vi", true);

export default function Home() {
    const [content, setContent] = useState("");
    const [res, setRes] = useState("");

    useEffect(() => {
        async function getBlogs() {
            const response = await fetch("blogs/vi");
            const text = await response.text();

            setRes(response);
            setContent(text);
        }

        getBlogs();
    }, []);

    console.log(res);
    console.log(content);

    // console.log(blogs);

    return <div>Home</div>;
}