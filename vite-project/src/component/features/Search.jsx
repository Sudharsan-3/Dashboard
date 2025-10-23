import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSeach } from "../../app/serivce/dataSclice";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const { allPosts } = useSelector((state) => state.getAllData);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    const filteredData = allPosts.filter((post) =>
      post.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    dispatch(setSeach(filteredData));
  };

  return (
    <div className="p-2">
      <input
        onChange={handleChange}
        value={value}
        type="search"
        placeholder="Search anything..."
        className="border border-pink-400 bg-black text-white rounded-lg p-2 w-64 placeholder-gray-400 focus:ring-2 focus:ring-pink-500 outline-none"
      />
    </div>
  );
};

export default Search;
