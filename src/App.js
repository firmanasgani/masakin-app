import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Signin from "./Pages/Signin";
import Home from "./Pages/Home";
import Welcome from "./Pages/Welcome";
  import DetailRecipes from './Pages/DetailRecipes/DetailRecipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail-recipes" element={<DetailRecipes />} />
    </Routes>
  );
}

export default App;
