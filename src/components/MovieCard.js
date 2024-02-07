import React from 'react';
import Poster from "../../src/assets/poster.png";

const MovieCard = ({ movie, onFeedbackClick }) => {
  const { title, backdrop_path, ratings, genre_names } = movie;

  // Calculate the average rating
  const averageRating = ratings.reduce((acc, cur) => acc + cur, 0) / ratings.length;

  return (
    <div className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105 relative">
      <img src={Poster} alt={Poster} className="w-full h-40 object-cover mb-4 rounded-md" />
      <div className="flex flex-col justify-between h-full">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-2">Genres: {genre_names.join(', ')}</p>
        </div>
        <div className="flex items-center justify-between mt-4 mb-2 absolute bottom-0 left-0 right-0 px-5">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-yellow-500 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2c-.8 0-1.6.3-2.2.9L2 12l7.8 7.1c1.2 1.2 3.1 1.2 4.3 0L22 12l-7.8-7.1c-.6-.6-1.4-.9-2.2-.9z"
              ></path>
            </svg>
            <p className="text-gray-600">Rating: {averageRating.toFixed(1)}/5</p>
          </div>
          <button
            onClick={onFeedbackClick}
            className="bg-gray-500 text-white py-1 px-5 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Rate
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
