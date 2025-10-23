import React, { useEffect, useState } from "react";
import axios from "axios";
import data from "../../../Data.json";
import { useSelector } from "react-redux";

const CreateData = () => {
  const { allPosts } = useSelector((state) => state.getAllData);
  const [uniqueUserIds, setUniqueUserIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    body: "",
  });

  // ✅ Extract all unique userIds
  useEffect(() => {
    if (allPosts.length !== 0) {
      const unique = [...new Set(allPosts.map((post) => post.userId))];
      setUniqueUserIds(unique);
    }
  }, [allPosts]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Create new post
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
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 shadow-md hover:scale-105 transition-all backdrop-blur-md"
      >
        <img
          className="w-5 h-5 object-contain"
          src={data[0].image}
          alt="create-icon"
        />
      </button>

      {/* ✅ Glassy Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center backdrop-blur-sm z-50">
          <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-6 w-[400px] text-white relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-white text-xl hover:text-gray-300"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center text-white drop-shadow-md">
              Create New Post
            </h2>

            {/* User ID Dropdown */}
            <label className="block mb-2 font-medium">Select User ID:</label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="bg-white/30 border border-white/50 rounded-md p-2 w-full mb-3 text-black"
            >
              <option value="">-- Select User --</option>
              {uniqueUserIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>

            {/* Title Input */}
            <label className="block mb-2 font-medium">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-white/30 border border-white/50 rounded-md p-2 w-full mb-3 text-black placeholder-gray-700"
              placeholder="Enter title"
            />

            {/* Body Input */}
            <label className="block mb-2 font-medium">Body:</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="bg-white/30 border border-white/50 rounded-md p-2 w-full mb-4 h-24 text-black placeholder-gray-700"
              placeholder="Enter body content"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                className="bg-white/30 text-white px-4 py-1 rounded-md hover:bg-white/40 transition-all"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-all"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateData;
