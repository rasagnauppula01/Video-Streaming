import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOption, setSortOption] = useState('title-asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/videos/get-videos');
        setVideos(response.data.videos || []);
        setFilteredVideos(response.data.videos || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setVideos([]);
        setFilteredVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterVideos(value, category, sortOption);
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    filterVideos(searchTerm, cat, sortOption);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    filterVideos(searchTerm, category, value);
  };

  const filterVideos = (search, category, sort) => {
    let filtered = [...videos];

    if (search) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(search) ||
          video.description.toLowerCase().includes(search)
      );
    }

    if (category !== 'All') {
      filtered = filtered.filter((video) => video.category?.name === category);
    }

    if (sort === 'title-asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'title-desc') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === 'date-asc') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'date-desc') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredVideos(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Loading videos...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen p-8">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border dark:border-gray-600 text-black dark:text-white bg-white dark:bg-gray-800 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
      </div>

      {/* Horizontal Category Bar */}
      <div className="flex items-center overflow-x-auto space-x-4 py-2 mb-6 scrollbar-hide">
        {['All', ...new Set(videos.map((video) => video.category?.name))].map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-2 whitespace-nowrap text-sm font-medium rounded-full transition ${
              category === cat
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-blue-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort Option */}
      <div className="mb-6">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="w-full md:w-1/4 px-4 py-2 border dark:border-gray-600 text-black dark:text-white bg-white dark:bg-gray-800 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        >
          <option value="title-asc">Sort by Title (A-Z)</option>
          <option value="title-desc">Sort by Title (Z-A)</option>
          <option value="date-asc">Sort by Date (Oldest First)</option>
          <option value="date-desc">Sort by Date (Newest First)</option>
        </select>
      </div>

      {/* Video Cards */}
      {filteredVideos && filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <video
                controls
                className="w-full h-64 object-cover bg-black dark:bg-gray-700"
                src={video.url}
              />
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">
                  {video.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center text-lg">
          No videos available
        </p>
      )}
    </div>
  );
};

export default VideoGallery;
