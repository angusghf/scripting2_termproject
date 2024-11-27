import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home";
import Details from "../src/components/details";
import Favorites from "../src/components/favorites";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
