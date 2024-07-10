import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import "../styles/Blogs.css"

function BlogCard({blog}) {
	return (
		<div className="card-wrapper">
			<Link className="card-img-wrapper" to={`./${blog.id}`}>
				<img height={150} width={150} src={`${blog.imgSource}`} />
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

export default function Blogs() {
	const [blogs, setBlogs] = useState([]);

    useEffect(() => {
		async function getBlogs() {
			const response = await fetch(`blogs/blog_list.json`);
			console.log(response);
			const list = await response.json();

			setBlogs(list);
		}

		getBlogs();
    }, []);

	// console.log(blogs);

	

	return (
		<div className="blogs-main">
			<h1 className="blogs-title">AppMakors Blogs</h1>
			<h2 className="blogs-introduction">A place where you can find useful tips and tricks</h2>
			<div className="blogs-container">
				{ blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)	}
			</div>
		</div>
	)
} 

