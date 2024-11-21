import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Signin from "./Pages/Signin";
import Home from "./Pages/Home";
import Welcome from "./Pages/Welcome";
import DetailRecipes from "./Pages/DetailRecipes/DetailRecipes";
import NotFound from "./Pages/NotFound";
import { AuthProvider } from "./Context/AuthContext";
import Recipes from "./Pages/Recipe";
import Bookmarks from "./Pages/Bookmarks";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/bookmarks" element={<Bookmarks />}  />
        <Route path="/detail-recipes/:id" element={<DetailRecipes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
