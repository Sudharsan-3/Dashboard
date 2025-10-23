import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sorting } from "../../app/serivce/dataSclice";

const Sorting = () => {
  const dispatch = useDispatch();
  const [isAsc, setIsAsc] = useState(true);

  const handleClick = (type) => {
    setIsAsc(type === "asc");
    dispatch(sorting(type));
  };

  return (
    <div className="flex items-center gap-3 p-2">
      {isAsc ? (
        <button
          onClick={() => handleClick("desc")}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition-all"
        >
          Sort ↓
        </button>
      ) : (
        <button
          onClick={() => handleClick("asc")}
          className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-900 transition-all"
        >
          Sort ↑
        </button>
      )}
    </div>
  );
};

export default Sorting;
