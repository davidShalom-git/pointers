import React, { useState, useEffect, useRef } from 'react';
import gsap from "gsap";
import galaxy from "../assets/galaxy.png";

import bk from '../assets/net.gif';
import Typewriter from 'react-typewriter-effect';
import { Link } from 'react-router-dom';


const Home1 = () => {
    const [key, setKey] = useState(0); 
    const navRef = useRef(null);
      const imageRef = useRef(null);
      const textRef = useRef(null);
      const h1Ref = useRef(null);
      const [isOpen, setIsOpen] = useState(false);
    
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

    useEffect(() => {
        const interval = setInterval(() => {
            setKey(prevKey => prevKey + 1); 
        }, 8000);

        return () => clearInterval(interval); 
    }, []);

    return (
        <>
        
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
                     <li><Link to="/card" className="hover:text-gray-400">Guest</Link></li>
                     <li><Link to="/contact" className="hover:text-gray-400">About</Link></li>
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
             <li><Link to="/video" className="hover:text-gray-400" onClick={closeMenu}>Video</Link></li>
             <li><Link to="/about" className="hover:text-gray-400" onClick={closeMenu}>About</Link></li>
           </ul>
         </div>
       )}
       
             </nav>
        <div className="bg-fixed bg-center min-h-screen w-full" style={{ backgroundImage: `url(${bk})` }}>
            <div className="flex flex-col lg:flex-row md:flex-col justify-center items-center text-4xl min-h-screen">
                <div className='mx-auto text-center'>
                    <Typewriter
                        key={key}  
                        textStyle={{
                            fontFamily: 'sans-serif',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.5em',
                            lineHeight: '1.2em',
                            marginLeft: 30, // Adjust the line height as needed
                        }}
                        startDelay={100}
                        cursorColor="#3F3D56"
                        multiText={[
                            "Arunai Engineering College....",
                            "Learn What Matters...!"
                        ]}
                        multiTextDelay={100}
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                        loop={false} 
                    />
                    <h1 className='mt-5 text-white'>Study Well.. Grow Well...</h1>
                    <button className='mt-5 bg-white text-black px-9 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-200'>
                        <Link to='/home' className='text-2xl'>Explore</Link>
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Home1;
