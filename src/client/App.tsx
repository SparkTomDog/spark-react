import "@c/assets/styles/index.scss"
import { Routes, Route } from "react-router-dom"
import Contriner from "@c/pages/Contriner"

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Contriner /> }></Route>
        </Routes>
    )
}

export default App