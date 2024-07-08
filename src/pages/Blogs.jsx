import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../styles/Blogs.css"

export default function Blogs() {
    const [content, setContent] = useState("");

    useEffect(() => {
		async function getBLog(fileName) {
			const response = await fetch(fileName);
			const textContent = await response.text();

			setContent(textContent);
		}

		getBLog(`.${import.meta.env.BASE_URL}blogs/vi/github101_vi.md`);
    }, []);

    // return <div>{content}</div>;
	return <div className="content">
		<Markdown remarkPlugins={[remarkGfm]} 
			components={{
				h2(props) {
					return <h2 id={props.children.replace(' ', '-')} children={props.children}/>;
				},
				a(props) {
					if (props.href[0] === '#')
						return <a href={props.href} target="_self" children={props.children}/>;
					return <a href={props.href} target="_blank" children={props.children}/>;
				}
			}}
		>{content}</Markdown>
	</div>;
} 