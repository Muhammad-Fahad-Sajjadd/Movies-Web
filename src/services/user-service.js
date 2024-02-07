import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const UserService = {
    getUserProfile: async (token) => {
        try {
            const response = await axios.get(`${baseUrl}/user-controller/getUserProfile`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('error:', error);
            return { message: 'Something went wrong' };
        }
    },
    updateUserProfile: async (formData, token) => {
        console.log('Form data', formData)
        try {
            const response = await axios.put(`${baseUrl}/user-controller/updateUserProfile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('error:', error);
            return { message: 'Something went wrong' };
        }
    },
    giveMovieRating: async (token, movieId, rating) => {
        try {
            const response = await axios.post(`${baseUrl}/user-controller/giveMovieRating`, { movieId, rating }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error giving movie rating:', error);
            return { status: 0, message: 'Something went wrong' };
        }
    }
};

export default UserService;
