import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const MovieService = {
  getAllMovies: async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/movies-controller/getAllmovies`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Fetch Movies Error:', error);
      return { message: 'Something went wrong' };
    }
  },
  getRecommededMovies: async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/movies-controller/userRecommendedMovies`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Fetch Recommended Movies Error:', error);
      return { message: 'Something went wrong' };
    }
  }
};

export default MovieService;
