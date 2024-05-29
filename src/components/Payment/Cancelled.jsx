import React from 'react';
import { Link } from 'react-router-dom';

const PaymentUnsuccessful = () => {
  return (
    <div className="max-w-xl mt-64 mx-auto py-10 px-8 bg-white rounded-lg shadow-lg border border-red-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-red-500 text-white rounded-full p-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <p className="ml-4 text-lg font-semibold text-red-500">Payment Unsuccessful</p>
        </div>
        <Link to="/allEvents" className="text-blue-500 hover:underline">Return Home</Link>
      </div>
      <p className="mt-4 text-gray-700">There was an error processing your payment. Please try again later.</p>
    </div>
  );
};

export default PaymentUnsuccessful;
