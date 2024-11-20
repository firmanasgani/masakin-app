import React from "react";

const BottomNavigation = () => {
  return (
    <div className="w-full bg-white-200 border-t shadow-inner">
      <div className="flex justify-around py-2">
        <a className="flex flex-col items-center text-green-500" href="/home">
          <span className="material-icons">home</span>
          <span className="text-xs">Home</span>
        </a>
        <a className="flex flex-col items-center text-gray-500" href="/bookmarks">
          <span className="material-icons">bookmarks</span>
          <span className="text-xs">Bookmarks</span>
        </a>
        <a className="flex flex-col items-center text-gray-500" href="/detail-recipes/1">
          <span className="material-icons">book</span>
          <span className="text-xs">Recipes</span>
        </a>
        <a className="flex flex-col items-center text-gray-500" href="/signin">
          <span className="material-icons">person</span>
          <span className="text-xs">Profile</span>
        </a>
      </div>
    </div>
  );
};

export default BottomNavigation;