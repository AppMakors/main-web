import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home"
import Linguistics from "./pages/Linguistics"
import RubiksTimor from "./pages/RubiksTimor"
import Blogs from "./pages/Blogs"
import Blog from "./pages/Blog"
import About from "./pages/About"
import Hiragana from "./pages/Hiragana";
import "./styles/App.css"

export default function App() {
  const baseURL = import.meta.env.BASE_URL;

  return <Routes>
    <Route path={`${baseURL}*`} element={ <Navigate to={import.meta.env.BASE_URL} /> }/>
    <Route path={`${baseURL}`} element={ <Home /> }/>
    <Route path={`${baseURL}linguistics`}element= { <Linguistics />}/>
    <Route path={`${baseURL}linguistics/hiragana`}element= { <Hiragana />}/>
    <Route path={`${baseURL}rubiks`}element= { <RubiksTimor />}/>
    <Route path={`${baseURL}blogs`}element= { <Blogs />}/>
    <Route path={`${baseURL}blogs/:id`}element= { <Blog />}/>
    <Route path={`${baseURL}about`}element= { <About />}/>
  </Routes>
}