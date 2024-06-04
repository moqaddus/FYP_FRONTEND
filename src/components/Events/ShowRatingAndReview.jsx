import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const ShowRatingAndReview = () => {
  const { eventId } = useParams();
  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState('');
  const [reviewsAndRatings, setReviewsAndRatings] = useState([]);

  useEffect(() => {
    // Fetch reviews and ratings for the event
    const fetchReviewsAndRatings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/attendees/reviewOfEvent/${eventId}`);
        setEventName(response.data.eventName);
        setReviewsAndRatings(response.data.reviewsAndRatings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews and ratings:', error);
        setLoading(false);
      }
    };

    fetchReviewsAndRatings();
  }, [eventId]);

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center text-green-500 mt-10">{eventName}</h1>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <ClipLoader size={50} color={"#123abc"} loading={true} />
        </div>
      ) : !reviewsAndRatings || reviewsAndRatings.length === 0 ? (
        <p className="text-lg text-center">No reviews available for this event.</p>
      ) : (
        <div className="grid gap-3">
          {reviewsAndRatings.map((review, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
  <div className="flex items-center">
    <h1 className='font-bold text-xl mr-2'>Rating:</h1>
    <p className="text-lg font-semibold"> {review.Rating}</p>
  </div>
  <div className="flex items-center mt-2">
    <h1 className='font-bold text-xl mr-2'>Review:</h1>
    <p className="text-lg font-semibold"> {review.Review}</p>
  </div>
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowRatingAndReview;
