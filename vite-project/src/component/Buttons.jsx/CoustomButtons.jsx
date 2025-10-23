import React, { useState } from "react";
import axios from "axios";

const CoustomButtons = ({ data, value }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({ title: "", body: "" });

  const datas = data.filter((e) => e.type.toLowerCase() === "common");

  const handleClick = async (id, action) => {
    if (action.toLowerCase() === "delete") {
      setShowConfirm(true);
    } else if (action.toLowerCase() === "edit") {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setEditData(res.data);
      setShowEdit(true);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${value.id}`
      );
      alert("Item deleted successfully!");
    } catch (err) {
      alert("Failed to delete item");
    } finally {
      setShowConfirm(false);
    }
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${editData.id}`,
        editData
      );
      alert("Item updated successfully!");
    } catch (err) {
      alert("Failed to update item");
    } finally {
      setShowEdit(false);
    }
  };

  return (
    <div className="flex gap-3 relative">
      {datas.map((e) => (
        <button
          key={e.id}
          onClick={() => handleClick(value.id, e.buttonText)}
          className="p-2 rounded-lg bg-pink-500 hover:bg-pink-600 shadow-md transition-all duration-200 hover:scale-105"
        >
          <img className="w-5 invert" src={e.image} alt={e.image} />
        </button>
      ))}

      {/* Delete Confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-black/60 text-white border border-pink-400/40 rounded-2xl shadow-2xl p-6 w-80">
            <h2 className="text-xl font-semibold mb-3 text-pink-400">
              Confirm Delete
            </h2>
            <p className="mb-5 text-gray-300">
              Are you sure you want to delete this post?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded-md"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Popup */}
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-black/60 text-white border border-pink-400/40 rounded-2xl shadow-2xl p-6 w-[400px]">
            <h2 className="text-xl font-semibold mb-3 text-pink-400">
              Edit Post
            </h2>

            <label className="block mb-2 font-medium text-pink-300">Title:</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="border border-pink-400/40 bg-black/40 text-white rounded-md p-2 w-full mb-3 focus:ring-2 focus:ring-pink-500 outline-none"
            />

            <label className="block mb-2 font-medium text-pink-300">Body:</label>
            <textarea
              value={editData.body}
              onChange={(e) =>
                setEditData({ ...editData, body: e.target.value })
              }
              className="border border-pink-400/40 bg-black/40 text-white rounded-md p-2 w-full mb-4 h-24 focus:ring-2 focus:ring-pink-500 outline-none"
            />

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded-md"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoustomButtons;
