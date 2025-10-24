import React, { useEffect, useState } from "react";
import axios from "axios";
import data from "../../../Data.json";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";

const CreateData = () => {
  const { allPosts } = useSelector((state) => state.getAllData);
  const [uniqueUserIds, setUniqueUserIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    body: "",
  });

  useEffect(() => {
    if (allPosts.length !== 0) {
      const unique = [...new Set(allPosts.map((post) => post.userId))];
      setUniqueUserIds(unique);
    }
  }, [allPosts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    if (!formData.userId || !formData.title || !formData.body) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        userId: Number(formData.userId),
        title: formData.title,
        body: formData.body,
      });

      console.log("Created successfully:", res.data);
      alert("Post created successfully!");
      setShowModal(false);
      setFormData({ userId: "", title: "", body: "" });
    } catch (error) {
      console.error("Failed to create:", error);
      alert("Failed to create data");
    }
  };

  return (
    <div className="relative">
      {/* Icon Button */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 shadow-md hover:scale-105 transition-all backdrop-blur-md"
      >
        <img
          className="w-5 h-5 object-contain"
          src={data[0].image}
          alt="create-icon"
        />
      </button>

      {/* Modal */}
      {showModal &&
  createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-pink-300/30 shadow-2xl rounded-2xl p-6 w-full max-w-md text-white flex flex-col">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-pink-400 hover:text-pink-500 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-pink-400 drop-shadow-md">
          Create New Post
        </h2>

        {/* User ID Dropdown */}
        <label className="block mb-2 font-medium">Select User ID:</label>
        <select
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          className="bg-gray-800 border border-pink-300/30 rounded-md p-2 w-full mb-3 text-white"
        >
          <option value="">-- Select User --</option>
          {uniqueUserIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="bg-gray-800 border border-pink-300/30 rounded-md p-2 w-full mb-3 text-white placeholder-gray-400"
          placeholder="Enter title"
        />

        <label className="block mb-2 font-medium">Body:</label>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          className="bg-gray-800 border border-pink-300/30 rounded-md p-2 w-full mb-4 h-24 text-white placeholder-gray-400 resize-none"
          placeholder="Enter body content"
        />

        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-all"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>,
    document.body
  )}


    </div>
  );
};

export default CreateData;
