import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import FeedbackModal from '../components/FeedbackModal';
import SideNav from '../components/SideNav';
import MovieService from '../services/movies-service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MoviesScreen = () => {
  const [activeLink, setActiveLink] = useState('allMovies');
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).jwt : null;
        if (!token) {
          toast.error('Authorization token not found. Please log in again.');
          return;
        }
        const response = await MovieService.getAllMovies(token);
        if(response.status===1){
          toast.success('Movies Fetched Successfully');
          setMovies(response.data);
        }else{
          toast.error(response.message);
        }
      } catch (error) {
        console.error('Fetch Movies Error:', error);
        toast.error('Failed to fetch movies. Please try again.');
      }
    }

    fetchMovies();
  }, []);

  const openFeedbackModal = (movieId) => {
    const selectedMovie = movies.find(movie => movie._id === movieId);
    if (selectedMovie) {
      setSelectedMovie(selectedMovie.title);
      setSelectedMovieId(movieId);
      setFeedbackModalOpen(true);
    } else {
      console.error('Movie not found');
    }
  };

  const closeFeedbackModal = () => {
    setSelectedMovie(null);
    setSelectedMovieId('');
    setFeedbackModalOpen(false);
  };

  return (
    <div className="flex">
      <SideNav setActiveLink={setActiveLink} />

      <div className="flex-1 ml-64">
        <div className="container mx-auto py-8 px-4">
          <h2 className="text-3xl font-semibold mb-4">Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} onFeedbackClick={() => openFeedbackModal(movie._id)} />
            ))}
          </div>

          {activeLink === 'recommendedMovies' && (
            <p className="mb-4">Display Recommended Movies</p>
          )}
          {activeLink === 'updateProfile' && (
            <p className="mb-4">Display Update Profile</p>
          )}

          {isFeedbackModalOpen && selectedMovie && (
            <FeedbackModal
              movie={selectedMovie}
              id={selectedMovieId}
              onClose={closeFeedbackModal}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MoviesScreen;
