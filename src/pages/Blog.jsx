import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import "../styles/Blog.css";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Blog() {
    const id = useParams().id;

    const [blogContent, setBlogContent] = useState("");

    // const searchParams = useSearchParams();

    useEffect(() => {
        async function getBlog(id) {
            const response = await fetch(`./vi/${id}.md`);
            const text = await response.text();

            setBlogContent(text);
        };

        getBlog(id);
    }, [id]);

	return (
		<div className="blog-content">
			<Markdown remarkPlugins={[remarkGfm]} 
				components={{
					h2(props) {
						return <h2 id={props.children.toLowerCase().replaceAll(', ', '-').replaceAll(' ', '-')} children={props.children}/>;
					},
					a(props) {
						if (props.href[0] === '#')
							return <a href={props.href} target="_self" children={props.children}/>;
						return <a href={props.href} target="_blank" children={props.children}/>;
					},
					code(props) {
						const {children, className, node, ...rest} = props
						const match = /language-(\w+)/.exec(className || '')
						return (
							<SyntaxHighlighter
								{...rest}
								PreTag="div"
								children={String(children).replace(/\n$/, '')}
								language={match ? match[1] : "markdown"}
								style={ oneDark }
							/>
						)
						
					}
				}}

				children={blogContent}
			/>
		</div>
	);
}