import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../app/serivce/dataSclice";
import data from "../../Data.json";
import CoustomButtons from "./Buttons.jsx/CoustomButtons";

const PostsList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.getAllData);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // ✅ Pagination calculations
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // ✅ Navigation
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading)
    return (
      <p className="text-center text-pink-400 text-lg font-semibold mt-10">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 text-lg font-semibold mt-10">
        Error: {error}
      </p>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-black min-h-screen rounded-2xl shadow-2xl border border-pink-300/30">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-400 tracking-wide drop-shadow-lg">
        📚 Fetched Posts
      </h2>

      {/* ✅ Posts list */}
      <div className="space-y-4">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between border border-pink-300/30 rounded-xl shadow-md p-5 bg-gradient-to-r from-gray-900 via-black to-gray-800 hover:shadow-pink-500/40 transition-all duration-300"
          >
            <div className="flex-1 pr-4">
              <h4 className="font-semibold text-lg text-pink-300 mb-1">
                {post.title}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {post.body}
              </p>
            </div>

            {/* Custom Buttons */}
            <div className="flex-shrink-0">
              <CoustomButtons data={data} value={post} />
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentPage === 1
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-pink-500 text-white hover:bg-pink-600"
          }`}
        >
          ← Previous
        </button>

        <p className="text-gray-200 text-sm">
          Page{" "}
          <strong className="text-pink-400 text-base">{currentPage}</strong> of{" "}
          <strong className="text-pink-400 text-base">{totalPages}</strong>
        </p>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentPage === totalPages
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-white text-black hover:bg-pink-200"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PostsList;
