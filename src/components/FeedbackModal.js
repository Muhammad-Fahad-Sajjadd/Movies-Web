import React, { useState } from 'react';
import Modal from 'react-modal';
import UserService from '../services/user-service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '400px', // Adjust the max-width as needed
    background: 'rgba(255, 255, 255, 0.95)', // Slightly increase opacity
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.7)', // Slightly increase opacity
    zIndex: 1000,
  },
};

const FeedbackModal = ({ movie, onClose }) => {
  const [rating, setRating] = useState(1);

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };

  const handleFeedbackSubmit = async () => {
    try {
      const token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).jwt : null;
      if (!token) {
        toast.error('Authorization token not found. Please log in again.');
        console.error('Authorization token not found. Please log in again.');
        return;
      }

      const response = await UserService.giveMovieRating(token, movie._id, rating);
      console.log('RES',response)
      if (response.status === 1) {
        console.log('Feedback submitted successfully');
        toast.success('Rating submitted successfully');
        onClose();
      } else {
        console.error(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <Modal
      isOpen={true} // You would use state to control modal visibility
      onRequestClose={onClose}
      contentLabel="Feedback Modal"
      style={modalStyles}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">{`Give Feedback for ${movie.name}`}</h2>
      <label className="block mb-4 text-center">
        Rating:
        <select value={rating} onChange={handleRatingChange} className="ml-2 px-2 py-1 border rounded-md">
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <div className="flex justify-center space-x-2">
        <button
          onClick={handleFeedbackSubmit}
          className="bg-gray-500 text-white py-1 px-5 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Submit Rating
        </button>
        <button
          onClick={onClose}
          className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300"
        >
          Close
        </button>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default FeedbackModal;
