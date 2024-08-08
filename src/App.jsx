import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home"
import MiniApps from "./pages/MiniApps"
import RubiksTimor from "./pages/RubiksTimor"
import Blogs from "./pages/Blogs"
import Blog from "./pages/Blog"
import About from "./pages/About"
import Japanese from "./pages/Japanese";
import KeyTest from "./pages/KeyTest";
import "./styles/App.css"

export default function App() {
    const baseURL = import.meta.env.BASE_URL;

    return <Routes>
        <Route path={`${baseURL}*`} element={<Navigate to={baseURL} />} />
        <Route path={`${baseURL}`} element={<Home />} />
        <Route path={`${baseURL}miniapps`} element={<MiniApps />} />
        <Route path={`${baseURL}miniapps/japanese`} element={<Japanese />} />
        <Route path={`${baseURL}miniapps/keytest`} element={<KeyTest />} />
        <Route path={`${baseURL}rubiks`} element={<RubiksTimor />} />
        <Route path={`${baseURL}blogs`} element={<Blogs />} />
        <Route path={`${baseURL}blogs/:id`} element={<Blog />} />
        <Route path={`${baseURL}about`} element={<About />} />
    </Routes>
}