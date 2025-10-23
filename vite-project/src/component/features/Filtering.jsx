import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../app/serivce/dataSclice";

const Filtering = () => {
  const dispatch = useDispatch();
  const [uniques, setUnique] = useState(["All"]);
  const { allPosts } = useSelector((state) => state.getAllData);

  useEffect(() => {
    if (allPosts.length !== 0) {
      const uniqueUserIds = [...new Set(allPosts.map((post) => post.userId))];
      setUnique(["All", ...uniqueUserIds]);
    }
  }, [allPosts]);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="p-2">
      <select
        onChange={handleChange}
        className="border border-pink-400 bg-black text-white rounded-md p-2 focus:ring-2 focus:ring-pink-500"
      >
        {uniques.map((id, i) => (
          <option key={i} value={id} className="bg-black text-white">
            {id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filtering;
