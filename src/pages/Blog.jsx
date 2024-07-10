import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../styles/Blog.css";

export default function Blog() {
    const id = useParams().id;

    const [blogContent, setBlogContent] = useState("");

    // const searchParams = useSearchParams();

    useEffect(() => {
        async function getBlog(id) {
            const response = await fetch(`./vi/${id}.md`);
            const text = await response.text();

            setBlogContent(text);
            
            console.log(response);
        };

        getBlog(id);
    });

	return (
		<div className="blog-content">
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

				children={blogContent}
			/>
		</div>
	);
}