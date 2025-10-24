import React, { Suspense, lazy } from "react";
import Sidebar from "./component/Sidebar"; // Import the new sidebar

// Lazy load components
const CreateData = lazy(() => import("./component/Buttons.jsx/CreateData"));
const Search = lazy(() => import("./component/features/Search"));
const Sorting = lazy(() => import("./component/features/Sorting"));
const Filtering = lazy(() => import("./component/features/Filtering"));
const PostsList = lazy(() => import("./component/PostsList "));

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 ml-0 sm:ml-64 flex flex-col items-center">
        <Suspense
          fallback={
            <div className="text-center py-10 text-lg font-semibold text-pink-400 animate-pulse">
              Loading Components...
            </div>
          }
        >
          {/* Action Bar */}
          <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-black/50 backdrop-blur-md shadow-lg border border-pink-400/20 p-5 rounded-2xl">

  {/* Top row on mobile, left/right on desktop */}
  <div className="flex flex-col md:flex-row w-full md:items-center md:justify-between gap-4">

    {/* Left group: Sorting + Filtering + CreateData */}
    <div className="flex flex-wrap gap-4 justify-center items-center sm:justify-start flex-1">
      <Sorting />
      <Filtering />
      <CreateData />
    </div>

    {/* Search goes separately */}
    <div className="flex justify-center sm:justify-center w-full sm:w-auto mt-4 sm:mt-0">
      <Search />
    </div>
    
  </div>
</div>


          {/* Posts Section */}
          <div className="w-full max-w-5xl">
            <PostsList />
          </div>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
