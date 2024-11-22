import { useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  return (
    <div className="w-full bg-white-200 border-t shadow-inner">
      <div className="flex justify-around py-2">
        <a
          className={`flex flex-col items-center text-xs ${
            location.pathname === "/home" ? "text-green-500" : "text-gray-500"
          }`}
          href="/home"
        >
          <span className="material-icons">home</span>
          <span>Home</span>
        </a>
        <a
          className={`flex flex-col items-center text-xs ${
            location.pathname === "/bookmarks" ? "text-green-500" : "text-gray-500"
          }`}
          href="/bookmarks"
        >
          <span className="material-icons">bookmarks</span>
          <span>Bookmarks</span>
        </a>
        <a
          className={`flex flex-col items-center text-xs ${
            location.pathname === "/recipes" ? "text-green-500" : "text-gray-500"
          }`}
          href="/recipes"
        >
          <span className="material-icons">book</span>
          <span>Recipes</span>
        </a>
        <a
          className={`flex flex-col items-center text-xs ${
            location.pathname === "/signin" ? "text-green-500" : "text-gray-500"
          }`}
          href="/signin"
        >
          <span className="material-icons">person</span>
          <span>Profile</span>
        </a>
      </div>
    </div>
  );
};

export default BottomNavigation;
