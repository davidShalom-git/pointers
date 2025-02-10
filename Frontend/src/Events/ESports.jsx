import { useEffect, useRef, useState } from "react";
import bk from "../assets/Nature.gif";
import { Link } from "react-router-dom";

import galaxy from "../assets/galaxy.png";
import axios from "axios";

const Esports = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone_No: "",
    Has_Paid: false, // Payment status
  });

  const [isPaid, setIsPaid] = useState(false); // Track payment status
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status
  const [isOpen, setIsOpen] = useState(false);

  const isFormFilled = formData.Name && formData.Email && formData.Phone_No; // Check if form is filled

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://pointers.onrender.com/api/cse/esports", formData);
      console.log("Registration Successful:", response.data);
      setIsRegistered(true); // Hide button and show success message
    } catch (error) {
      console.error("Registration Failed:", error);
    }
  };

  // Handle Payment Processing
  const handlePayment = async () => {
    try {
      const options = {
        key: "rzp_live_LODynINQB1J1t5",
        amount: 1000, // Amount in paise (₹500)
        currency: "INR",
        name: "Event Registration",
        description: "PPT Registration Fee",
        handler: function (response) {
          console.log("Payment Successful!", response);
          setIsPaid(true);
          setFormData((prev) => ({ ...prev, Has_Paid: true }));
        },
        prefill: {
          name: formData.Name,
          email: formData.Email,
          contact: formData.Phone_No,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentInstance = new window.Razorpay(options);
      paymentInstance.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-fixed bg-center bg-cover w-full"
      style={{ backgroundImage: `url(${bk})` }}
    >
      {/* Navigation Bar */}
     <nav className="w-full fixed top-0 left-0 bg-opacity-80 text-white py-4 px-6 shadow-lg z-50">
           <div className="container mx-auto flex items-center justify-between relative">
             {/* Logo */}
             <div className="flex items-center space-x-3">
               <img src={galaxy} alt="Galaxy Icon" className="h-10 w-10 animate-spin" />
             </div>
   
             {/* Desktop Menu */}
             <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
               <ul className="flex space-x-6 text-lg">
                 <li><Link to="/home" className="hover:text-gray-400">Home</Link></li>
                 <li><Link to="/technical" className="hover:text-gray-400">Events</Link></li>
                 <li><Link to="/card" className="hover:text-gray-400">Guest</Link></li>
                 <li><Link to="/contact" className="hover:text-gray-400">About</Link></li>
               </ul>
             </div>
   
             {/* Mobile Menu Button */}
             <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
               </svg>
             </button>
           </div>
   
           {/* Mobile Menu (Dropdown) */}
           {isOpen && (
             <div className="absolute top-16 left-0 w-full  bg-opacity-90 text-white flex flex-col items-center space-y-4 py-4 md:hidden">
               <Link to="/home" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link>
               <Link to="/technical" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Events</Link>
               <Link to="/card" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Guest</Link>
               <Link to="/contact" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>About</Link>
             </div>
           )}
         </nav>

      {/* Form Container */}
      <div className="relative w-full h-full flex items-center justify-center bg-fixed bg-cover bg-center lg:mt-20 mt-64">
        <div className="max-w-md w-full mb-20 p-8 rounded-lg shadow-lg" style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 6px rgba(255, 255, 255, 0.1)",
          padding: "2rem",
          color: "white"
        }}>
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Registration</h2>

          {!isRegistered ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300">Name</label>
                <input
                  type="text"
                  value={formData.Name}
                  onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-transparent text-white"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300">Email</label>
                <input
                  type="email"
                  value={formData.Email}
                  onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-transparent text-white"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300">Mobile No</label>
                <input
                  type="tel"
                  value={formData.Phone_No}
                  onChange={(e) => setFormData({ ...formData, Phone_No: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-transparent text-white"
                  required
                />
              </div>

              {/* Dynamic Button */}
              {!isPaid ? (
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={!isFormFilled} // Disable if form is not filled
                  className={`w-full py-2 rounded text-white ${isFormFilled ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"}`}
                >
                  Proceed to Payment
                </button>
              ) : (
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                  Register
                </button>
              )}
            </form>
          ) : (
            <p className="text-center text-green-400 font-bold">🎉 Registration Successful!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Esports;
