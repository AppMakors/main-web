import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import VocabLearning from "./pages/VocabLearning"
import RubiksTimor from "./pages/RubiksTimor"
import Blogs from "./pages/Blogs"
import About from "./pages/About"
import "./styles/App.css"

export default function App() {
  return <Routes>
    <Route path={`${import.meta.env.BASE_URL}`} element={ <Home /> }/>
    <Route path={`${import.meta.env.BASE_URL}vocab`}element= { <VocabLearning />}/>
    <Route path={`${import.meta.env.BASE_URL}rubiks`}element= { <RubiksTimor />}/>
    <Route path={`${import.meta.env.BASE_URL}blogs`}element= { <Blogs />}/>
    <Route path={`${import.meta.env.BASE_URL}about`}element= { <About />}/>
  </Routes>
}