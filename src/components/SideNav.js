import React from 'react';
import { Link } from 'react-router-dom';
// import logoImage from '../../src/assets/Rockville-technologies.jpg';

const SideNav = ({ setActiveLink }) => {
  return (
    <div className="bg-gray-800 text-white h-screen p-4 fixed top-0 left-0 bottom-0 w-64">
      <div className="mb-8">
        {/* <img src={logoImage} alt="Logo" className="w-full mb-4" /> */}
        <h2 className="text-2xl font-semibold">Navigation</h2>
      </div>
      <ul>
        <li className="mb-4">
          <Link to="/movies" onClick={() => setActiveLink('allMovies')} className="hover:underline block w-full text-left">
            All Movies
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/recommendedMovies" onClick={() => setActiveLink('recommendedMovies')} className="hover:underline block w-full text-left">
            Recommended Movies
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/updateUserProfile" onClick={() => setActiveLink('updateProfile')} className="hover:underline block w-full text-left">
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
