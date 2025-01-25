import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoGallery from './components/VideoGallery';

const Categories = () => <h1 className="text-black dark:text-white text-center">Categories Page</h1>;
const About = () => <h1 className="text-black dark:text-white text-center">About Us</h1>;
const Contact = () => <h1 className="text-black dark:text-white text-center">Contact Us</h1>;

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="bg-white dark:bg-black min-h-screen p-8">
        <Routes>
          <Route path="/" element={<VideoGallery />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
