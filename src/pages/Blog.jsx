import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import "../styles/Blog.css";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CubeLoader from "../components/global/CubeLoader.jsx"
import ScrollButton from "../components/global/ScrollButton.jsx";

export default function Blog() {
	const stringId = "id";
    const id = useParams()[stringId];

    const [blogContent, setBlogContent] = useState("");
	const [lang, setLang] = useState("vi");
	const [langList, setLangList] = useState(localStorage.getItem("lang").split(","));

    useEffect(() => {
        async function getBlog(id) {
            const response = await fetch(`./${lang}/${id}.md`);
            const text = await response.text();

			await new Promise(resolve => setTimeout(resolve, 2000));

            setBlogContent(text);
        };

        getBlog(id);
    }, [id, lang]); // listen to the change of state of items in the list

	if (!blogContent.length) {
		return <CubeLoader />
	}

	const langCodeToLang = {
		"vi": "Tiếng Việt",
		"en": "English",
		"ja": "日本語",
		"zh": "中国人",
	};

	return (
		<>
			<div className="blog-content">
				<select id="lang" onChange={(e) => setLang(e.target.value) }>
					{
						langList.map((langCode) => (<option key={langCode} value={langCode}>{langCodeToLang[langCode]}</option>))
					}
				</select>
				<Markdown remarkPlugins={[remarkGfm]} 
					components={{
						h2(props) {
							return <h2 id={props.children
												.toLowerCase()
												.replaceAll(', ', '-')
												.replaceAll(' ', '-')} 
									children={props.children}/>;
						},

						a(props) {
							if (props.href[0] === '#')
								return <a href={props.href} children={props.children}/>;
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
							);
						}
					}}
					
					children={blogContent}
				/>
			</div>
			<ScrollButton />
		</>
	);
}