// importing the library so we can link the pages together
import { BrowserRouter, Routes, Route } from "react-router-dom";
// importing the screen components we've made here so we can start linking it
import Home from "../src/components/home";
import Details from "../src/components/details";
import Favorites from "../src/components/favorites";

function App() {

  return (
    // wrapping things in a browser router
    <BrowserRouter>
      {/* and routers so that we can start linking our pages together */}
      <Routes>
        {/* adding our homepage */}
        <Route path="/" element={<Home />} />
        {/* details page for our characters using their id */}
        <Route path="/character/:id" element={<Details />} />
        {/* and also a favorites tab */}
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
