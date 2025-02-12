import { useState } from "react";
import bk from "../assets/Nature.gif";
import { Link } from "react-router-dom";
import galaxy from "../assets/galaxy.png";
import axios from "axios";

const Code = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone_No: "",
    College: ""
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("https://pointers.onrender.com/api/cse/web", formData);
      console.log("Registration Successful:", response.data);
      setIsRegistered(true);
      setFormData({ Name: "", Email: "", Phone_No: "", College: "" });
    } catch (error) {
      console.error("Registration Failed:", error);
      setErrorMessage("Registration failed. Please try again.");
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
          <div className="flex items-center space-x-3">
            <img src={galaxy} alt="Galaxy Icon" className="h-10 w-10 animate-spin" />
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <ul className="flex space-x-6 text-lg">
              <li><Link to="/home" className="hover:text-gray-400">Home</Link></li>
              <li><Link to="/technical" className="hover:text-gray-400">Events</Link></li>
              <li><Link to="/card" className="hover:text-gray-400">Guest</Link></li>
              <li><Link to="/contact" className="hover:text-gray-400">About</Link></li>
            </ul>
          </div>

          <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-opacity-90 text-white flex flex-col items-center space-y-4 py-4 md:hidden">
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

          {isRegistered ? (
            <p className="text-center text-green-400 font-bold text-lg">🎉 Registration Successful! 🎉</p>
          ) : (
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

              <div className="mb-4">
                <label className="block text-gray-300">College</label>
                <input
                  type="text"
                  value={formData.College}
                  onChange={(e) => setFormData({ ...formData, College: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-transparent text-white"
                  required
                />
              </div>

              {errorMessage && <p className="text-red-400 text-center mb-4">{errorMessage}</p>}

              <div className="flex justify-center">
                <button type="submit" className="relative group border-2 px-10 py-2 rounded-xl border-white text-white font-bold text-lg transition-all hover:bg-white hover:text-black">
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Code;
