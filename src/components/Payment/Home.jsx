import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Home = (props) => {
  const { event } = props.location.state;
  const itemName = event.Name;
  const itemPrice = event.TicketPrice; //will be taken from backend
  const [quantity, setquantity] = useState(1);
  const [finalAmount, setfinalAmount] = useState(itemPrice);
  const { eventId } = useParams();

  const checkout = async () => {
    try {
      // const res=await fetch(`${import.meta.env.VITE_API_KEY}/payment/checkout",{
      //   method:"POST",
      //   headers:{
      //     "Content-Type":"application/json"
      //   },
      //   mode:"cors",
      //   body:JSON.stringify({
      //     items:[
      //       {
      //         id:1,
      //         quantity:quantity,
      //         price:itemPrice,
      //         name:itemName
      //       }
      //     ]
      //   }
      // )
      // });
      const res = await axios.post(
        `${import.meta.env.VITE_API_KEY}/payment/checkout`,
        {
          items: [
            {
              id: 1,
              quantity: quantity,
              price: itemPrice,
              name: itemName,
            },
          ],
          eventId: event._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      window.location = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mt-48 mx-auto  p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-4">{itemName}</h1>
      <p className="text-lg font-semibold mb-4">Price: ${itemPrice}</p>
      <div className="flex items-center justify-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md mr-4"
          onClick={checkout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Home;
