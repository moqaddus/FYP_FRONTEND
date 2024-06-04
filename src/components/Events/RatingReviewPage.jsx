import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const RatingReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const history = useHistory();
  const {attendeeId}=useParams();

  const handleRatingChange = (event) => {
    // Ensure rating is within the range of 0 to 5
    const newRating = Math.min(Math.max(parseInt(event.target.value), 0), 5);
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSave = async () => {
    try {
      // Make API call to save rating and review
      await axios.post(`${import.meta.env.VITE_API_KEY}/attendees/post-review/${attendeeId}`, {
        rating: rating,
        review: review
      });
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Rating and review saved successfully',
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate back to user profile page
          history.goBack();
        }
      });
    } catch (error) {
      console.error('Error saving rating and review:', error);
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save rating and review. Please try again later.',
      });
    }
  };

  return (
    <div className="mt-8 mx-auto max-w-lg">
      <h1 className="text-4xl font-bold mt-24 mb-10 text-center text-green-500">Rating & Review</h1>
      <div className="mb-4">
        <label htmlFor="rating" className="block font-semibold mb-2">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="0"
          max="5"
          value={rating.toString()}
          onChange={handleRatingChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="review" className="block font-semibold mb-2">Review:</label>
        <textarea
          id="review"
          name="review"
          value={review}
          onChange={handleReviewChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          rows="2"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button onClick={handleSave} className="bg-orange-400 text-white font-bold px-4 py-2 rounded-md hover:bg-orange-500 transition focus:outline-none focus:bg-orange-600">Save</button>
      </div>  
    </div>
  );
};

export default RatingReviewPage;
