import { Routes, Route } from 'react-router-dom';
import DetailRecipes from './Pages/DetailRecipes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/detail-recipes" element={<DetailRecipes />} />
      </Routes>
    </div>
  );
}

export default App;
