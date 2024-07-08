import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import VocabLearning from "./pages/VocabLearning"
import RubiksTimor from "./pages/RubiksTimor"
import Blogs from "./pages/Blogs"
import About from "./pages/About"
import "./styles/App.css"

export default function App() {
  return <Routes>
    <Route path="/" element={ <Home /> }/>
    <Route path="/vocab" element= { <VocabLearning />}/>
    <Route path="/rubiks" element= { <RubiksTimor />}/>
    <Route path="/blogs" element= { <Blogs />}/>
    <Route path="/about" element= { <About />}/>
  </Routes>
}