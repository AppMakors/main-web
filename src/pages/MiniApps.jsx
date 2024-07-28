import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import "../styles/Blogs.css"

function BlogCard({blog}) {
	return (
		<div className="card-wrapper">
			<Link className="card-img-wrapper" to={`./${blog.id}`}>
				<img height={150} width={150} src={`${blog.imgSource}`} style={{filter: "brightness(0) saturate(100%) invert(73%) sepia(38%) saturate(6252%) hue-rotate(150deg) brightness(107%) contrast(104%)"}}/>
			</Link>
			<div className="card-info">
				<div className="card-info-upper">
					<div className="card-title">
						<Link to={`./${blog.id}`}>
							{blog.title}
						</Link>
					</div>
					<div className="card-introduction">{blog.introduction}</div>
				</div>
				<div className="card-authdate">
					<div className="card-author">
						<a href={blog.authorLink} target="_blank">
							» {blog.authorLink.split('/').at(-1)}
						</a>
					</div>
					<div className="card-date">{blog.publishDate}</div>
				</div>
			</div>
		</div>
	);
}

export default function MiniApps() {
	const [blogs, setBlogs] = useState([]);

    useEffect(() => {
		async function getBlogs() {
			const response = await fetch(`${location.origin}/main-web/miniapps/miniapp_list.json`);
			const list = await response.json();

			setBlogs(list);
		}

		getBlogs();
    }, []);
	
	return (
		<div className="blogs-main">
			<h1 className="blogs-title">AppMakors MiniApps</h1>
			<h2 className="blogs-introduction">A place where you can find useful mini applications</h2>
			<div className="blogs-container">
				{ blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />) } 
			</div>
		</div>
	)
} 