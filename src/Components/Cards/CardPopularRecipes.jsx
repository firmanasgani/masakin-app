import { Link } from "react-router-dom";

const PopularRecipes = ({ recipe, key: i }) => {
  const totalRating =
    recipe.rating.length > 0
      ? recipe.rating.map((rating) => rating.stars).reduce((a, b) => a + b, 0)
      : 0;
  const averageRating = totalRating / recipe.rating.length;
  const numberRating = isNaN(averageRating) ? 0 : averageRating;
  const img_banner = recipe.img_banner;
  return (
    <Link to={`/detail-recipes/${recipe.id}`}
      className="min-w-[120px] max-w-[200px] h-[250px] bg-cover bg-center rounded-lg shadow-md flex flex-col justify-between items-center"
      style={{ backgroundImage: `url(${img_banner})` }}
    >
      {/* Footer */}
      <div className="mt-auto flex flex-col justify-between w-full text-white text-sm p-4  rounded" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,1) 100%)" }}>
        <div>
          <div className="font-bold  text-sm mt-2  p-1 rounded">
            {recipe.name}
          </div>

          {/* Rating */}
          <div className="flex gap-1 text-yellow-500 text-sm  p-1 rounded">
            {Array.from({ length: 5 }, (_, j) => (
              <span key={j}>{j < numberRating ? "★" : "☆"}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <span>{recipe.estimated_time}</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PopularRecipes;
