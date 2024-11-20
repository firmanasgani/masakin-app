import { Link } from "react-router-dom";

const CardNewRecipes = ({ recipe }) => {
  const totalRating =
    recipe.rating.length > 0
      ? recipe.rating.map((rating) => rating.stars).reduce((a, b) => a + b, 0)
      : 0;
  const averageRating = totalRating / recipe.rating.length;
  const numberRating = isNaN(averageRating) ? 0 : Math.round(averageRating); // Pastikan nilai bulat

  return (
    <Link
      to={`/detail-recipes/${recipe.id}`}
      className="min-w-[200px] max-w-[200px] h-[300px] bg-gray-200 rounded-lg shadow-md flex flex-col justify-between items-center p-4"
    >
      {/* Gambar */}
      <img
        src={recipe.img_banner}
        alt={recipe.name}
        className="rounded-t-md object-cover h-[100px] w-full"
      />

      {/* Nama Resep */}
      <div className="font-bold text-center text-sm mt-2">{recipe.name}</div>

      {/* Rating */}
      <div className="flex gap-1 justify-center text-yellow-500 text-sm">
        {Array.from({ length: 5 }, (_, j) => (
          <span key={j}>
            {j < numberRating ? "★" : "☆"}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex justify-between w-full text-gray-500 text-sm">
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
    </Link>
  );
};

export default CardNewRecipes;
