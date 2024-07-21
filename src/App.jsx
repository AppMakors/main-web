import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Linguistics from "./pages/Linguistics"
import RubiksTimor from "./pages/RubiksTimor"
import Blogs from "./pages/Blogs"
import Blog from "./pages/Blog"
import About from "./pages/About"
import Hiragana from "./pages/Hiragana";
import "./styles/App.css"

export default function App() {
  return <Routes>
    <Route path={`${import.meta.env.BASE_URL}`} element={ <Home /> }/>
    <Route path={`${import.meta.env.BASE_URL}linguistics`}element= { <Linguistics />}/>
    <Route path={`${import.meta.env.BASE_URL}linguistics/hiragana`}element= { <Hiragana />}/>
    <Route path={`${import.meta.env.BASE_URL}rubiks`}element= { <RubiksTimor />}/>
    <Route path={`${import.meta.env.BASE_URL}blogs`}element= { <Blogs />}/>
    <Route path={`${import.meta.env.BASE_URL}blogs/:id`}element= { <Blog />}/>
    <Route path={`${import.meta.env.BASE_URL}about`}element= { <About />}/>
  </Routes>
}