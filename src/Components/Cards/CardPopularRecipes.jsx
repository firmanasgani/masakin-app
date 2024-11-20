import { Link } from "react-router-dom"

const PopularRecipes = ({recipe, key: i}) => {
    const totalRating = recipe.rating.length > 0 ? recipe.rating.map((rating) => rating.stars).reduce((a, b) => a + b, 0): 0;
    const averageRating = totalRating / recipe.rating.length;
    const numberRating = isNaN(averageRating) ? 0 : averageRating
    const img_banner = recipe.img_banner
    return (
        <Link to={`/detail-recipes/${recipe.id}`}
            className="relative w-[500px] h-[300px] border rounded-md"
        >
            <img
                src={img_banner}
                alt={recipe.name}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-2 flex flex-col gap-1 w-full bg-gradient-to-t from-black to-transparent">
                <h1 className="text-xl text-white font-bold">{recipe.name}</h1>
                <div className="flex flex-row gap-1 text-sm">
                {Array.from({length: numberRating}, (_, j) => (
                    <span key={j} className="text-yellow-500 text-xs material-icons">star</span>
                ))}
                 {Array.from({length: 5-numberRating}, (_, j) => (
                    <span key={j} className="text-gray-500 text-xs material-icons">star</span>
                ))}
                </div>
                <div className="flex flex-row justify-between gap-1">
                    <span className="text-white flex items-center gap-1">
                        <span className="text-white material-icons">access_time</span>
                        {recipe.estimated_time}
                    </span>
                    <span className="text-white material-icons">bookmark</span>
                </div>
            </div>
        </Link>
    )
}

export default PopularRecipes