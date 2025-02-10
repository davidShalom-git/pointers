import { useEffect, useRef, useState } from "react";
import bk from "../assets/Nature.gif";
import { Link } from "react-router-dom";
import gsap from "gsap";
import galaxy from "../assets/galaxy.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const h1Ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!navRef.current || !imageRef.current || !textRef.current || !h1Ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center px-4 bg-fixed bg-center bg-cover w-full" style={{ backgroundImage: `url(${bk})` }}>
      
      {/* Navigation Bar */}
      <nav ref={navRef} className="w-full fixed top-0 left-0  bg-opacity-80 text-white py-4 px-6 shadow-lg z-50">
        <div className="container mx-auto flex items-center justify-between relative">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img ref={imageRef} src={galaxy} alt="Galaxy Icon" className="h-10 w-10 animate-spin" />
           
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <ul className="flex space-x-6 text-lg">
              <li><Link to="/home" className="hover:text-gray-400">Home</Link></li>
              <li><Link to="/technical" className="hover:text-gray-400">Events</Link></li>
              <li><Link to="/video" className="hover:text-gray-400">Video</Link></li>
              <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
  <div className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 w-full bg-opacity-90 p-4">
    <ul className="flex flex-col items-center space-y-4 text-lg">
      <li><Link to="/home" className="hover:text-gray-400" onClick={closeMenu}>Home</Link></li>
      <li><Link to="/technical" className="hover:text-gray-400" onClick={closeMenu}>Events</Link></li>
      <li><Link to="/card" className="hover:text-gray-400" onClick={closeMenu}>Guest</Link></li>
      <li><Link to="/about" className="hover:text-gray-400" onClick={closeMenu}>About</Link></li>
    </ul>
  </div>
)}

      </nav>

      {/* Form Container */}
      <div className="relative w-full h-full flex items-center justify-center bg-fixed bg-cover bg-center lg:mt-20 mt-64">
        <div className="max-w-md w-full p-8 rounded-lg shadow-white bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300">Name</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 bg-transparent text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Email</label>
              <input
                type="email"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 bg-transparent text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Mobile No</label>
              <input
                type="tel"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 bg-transparent text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Events</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 bg-transparent text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Name of the Event</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 bg-transparent text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-gray-300">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
