import Layout from "../Layout"
import { useFetchLatestRecipes } from "../../hooks/useFetchLatestRecipes"
import { Link } from "react-router-dom";

const Recipes = () => {
    const { recipes, error, loading } = useFetchLatestRecipes();
    return (
        <Layout>
           {loading ? (
               <div className="progress-bar-circle mt-10 flex items-center justify-center">
                   <svg className="progress-bar-circle-svg" width="50" height="50">
                       <circle cx="25" cy="25" r="20" stroke="#3498db" strokeWidth="2" fill="none" />
                       <circle cx="25" cy="25" r="20" stroke="#3498db" strokeWidth="2" fill="none" className="progress-bar-circle-fill" style={{ strokeDashoffset: "62.83185307179586" }} />
                   </svg>
               </div>
           ) : error ? (
               <div className="error-card bg-red-500 text-white p-4 rounded-lg">
                   Error loading recipes. Please try again.
               </div>
           ) : (
               <div className="recipe-list grid grid-cols-1 gap-4 p-4 mt-2">
                   {recipes.map((recipe) => (
                       <div key={recipe.id} className="flex flex-row bg-gray-100 p-4 rounded-lg shadow-md">
                           <img src={recipe.img_banner} alt={recipe.name} className="w-32 h-32 object-cover mr-4" />
                            <div className="flex flex-col">
                            <Link to={`/detail-recipes/${recipe.id}`} className="font-bold">{recipe.name}</Link>
                            <p>{recipe.description}</p>
                            </div>
                       </div>
                   ))}
               </div>
           )}
        </Layout>
    )
}

export default Recipes