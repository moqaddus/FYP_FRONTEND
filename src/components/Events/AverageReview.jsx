import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AverageReview = ({id}) => {
    const [rating, setRating] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/attendees/averageRating/${id}`);
                setRating(response.data.averageRating);
            } catch (error) {
                console.error('Error fetching the rating:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRating();
    }, [id]);

    const roundToNearestHalf = (num) => {
        return Math.round(num * 2) / 2;
    };

    const renderStars = () => {
        if (loading) {
            return <span>Loading...</span>;
        }

        if (rating === null) {
            return <span>Error loading rating</span>;
        }

        const roundedRating = roundToNearestHalf(rating);
        const totalStars = 5;
        const fullStars = Math.floor(roundedRating);
        const halfStar = roundedRating % 1 !== 0;
        const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fas fa-star text-orange-400 hover:text-orange-500" />);
        }

        if (halfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt text-orange-400  hover:text-orange-500"  />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star text-gray-300" />);
        }

        return stars;
    };

    return (
      <div className="flex items-center justify-center mt-10">
      <div className="flex items-center bg-white shadow-md rounded-lg p-4">
          <div className="mr-4">
              <h1 className="text-2xl font-semibold">Rating:</h1>
          </div>
          <div className="flex items-center">
              <p className="text-xl font-medium text-gray-700 mr-2">{rating !== null ? roundToNearestHalf(rating).toFixed(1) : '0.0'}</p>
              <div className="flex text-2xl">
                  {renderStars()}
              </div>
          </div>
      </div>
  </div>
    );
};

export default AverageReview;
