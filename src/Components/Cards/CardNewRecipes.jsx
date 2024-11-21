const CardNewRecipes = ({ food }) => {
  return (
    <div className="flex flex-col p-2 bg-white rounded-md shadow-md ">
      <img
        src={food.img_banner}
        alt={food.name}
        className="rounded-t-md object-fit h-16"
      />
      <div className="font-bold text-center text-sm text-ellipsis line-clamp-2">
        {food.name}
      </div>
      <div className="flex flex-row gap-1">
        {[1, 2, 3, 4, 5].map((star, j) => (
          <span
            key={j}
            className={j <= food.rating ? "text-yellow-500" : "text-gray-400"}
          >
            &#9733;
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-row items-center justify-between">
        <span className="text-gray-500 text-sm">30 menit</span>
        <span className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
  );
};

export default CardNewRecipes;
