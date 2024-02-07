import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const AuthService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${baseUrl}/login-controller/userLogin`, credentials);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      return {message:'Something went wrong'};
    }
  },
  
  signup: async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/register-controller/createUser`, userData);
      return response.data;
    } catch (error) {
      console.error('Signup failed:', error);
      return {message:'Something went wrong'};
    }
  },
};

export default AuthService;
