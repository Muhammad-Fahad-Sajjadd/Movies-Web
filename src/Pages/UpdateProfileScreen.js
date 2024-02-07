import React, { useState } from 'react';
import SideNav from '../components/SideNav';
import UserService from '../services/user-service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfileScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    image: null,
    dob: '',
    genres: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      genres: checked
        ? [...prevData.genres, name]
        : prevData.genres.filter((category) => category !== name),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).jwt : null;
  
      if (!token) {
        toast.error('Authorization token not found. Please log in again.');
        return;
      }
  
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('dob', formData.dob);
      formData.genres.forEach(genre => formDataToSend.append('genres', genre));
      formDataToSend.append('image', formData.image); // Make sure formData.image is not null
      console.log('form Data screen',formData)
  
      const response = await UserService.updateUserProfile(formDataToSend, token);
  
      if(response.status===1){
        toast.success('Profile Updated Successfully');
      }else{
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      console.error('Update Profile Error:', error);
    }
  };
  

  const sideNavLinks = [
    { to: '/movies', label: 'All Movies' },
    { to: '/recommendedMovies', label: 'Recommended Movies' },
    { to: '/updateUserProfile', label: 'Update Profile' },
  ];

  return (
    <div className="flex">
      <SideNav links={sideNavLinks} />

      <div className="flex-1 ml-64"> {/* Adjust margin to match your side nav width */}
        <div className="container mx-auto py-20">
          <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-3xl font-semibold mb-4 text-center">Update User Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Your address"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-600">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Movie Categories</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="action"
                      checked={formData.genres.includes('action')}
                      onChange={handleCategoryChange}
                      className="form-checkbox text-blue-500 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Action</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="comedy"
                      checked={formData.genres.includes('comedy')}
                      onChange={handleCategoryChange}
                      className="form-checkbox text-blue-500 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Comedy</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="horror"
                      checked={formData.genres.includes('horror')}
                      onChange={handleCategoryChange}
                      className="form-checkbox text-blue-500 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Horror</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="adventure"
                      checked={formData.genres.includes('adventure')}
                      onChange={handleCategoryChange}
                      className="form-checkbox text-blue-500 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Adventure</span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 w-full"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfileScreen;
