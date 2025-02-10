import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import galaxy from "../assets/galaxy.png";

gsap.registerPlugin(TextPlugin);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const h1Ref = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!navRef.current || !imageRef.current || !textRef.current || !h1Ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );

      gsap.timeline()
        .from(imageRef.current, {
          x: window.innerWidth < 768 ? 0 : -200,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        })
        .from(textRef.current, {
          y: 200,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        }, "-=1")
        .to(h1Ref.current, {
          text: "Smart Learning...",
          duration: 2,
          ease: "power2.inOut",
        }, "-=1");
    });

    return () => ctx.revert(); 
  }, []);

  return (
    <>
      <div className="container mx-auto lg:px-10 px-3">
      
        <div
          className="container flex flex-col md:flex-row justify-between items-center text-white px-6 py-5 rounded-[40px] mx-auto bg-black mt-5"
          ref={navRef}
        >

          <div className="flex justify-between w-full md:w-auto">
            <img ref={imageRef} src={galaxy} alt="Galaxy Icon" className="h-10 w-10 animate-spin" />
            <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          
          <div className={`flex-1 md:flex ${isOpen ? "block" : "hidden"} md:block justify-center mt-4 md:mt-0`}>
            <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <li><Link to="/home" className="text-xl text-white hover:text-gray-400">Home</Link></li>
              <li><Link to="/technical" className="text-xl text-white hover:text-gray-400">Events</Link></li>
              <li><Link to="/card" className="text-xl text-white hover:text-gray-400">Guest</Link></li>
              <li><Link to="/contact" className="text-xl text-white hover:text-gray-400">About</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
