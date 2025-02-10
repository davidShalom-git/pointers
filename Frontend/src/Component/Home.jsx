import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import cse from '../assets/cse.png';
import it from '../assets/it.png';
import cyber from '../assets/cyber.png';
import Nav from './Nav';

const Home = () => {
  const pointerRef = useRef(null);
  const k25Ref = useRef(null);
  const pointerMobileRef = useRef(null);
  const k25MobileRef = useRef(null);

  useEffect(() => {
    // For large screens
    gsap.fromTo(pointerRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo(k25Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 });
    // For small screens
    gsap.fromTo(pointerMobileRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo(k25MobileRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 });
  }, []);

  return (
    <>
      <Nav />
      <div className="container mx-auto px-3">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-full h-[100vh] flex items-center justify-center bg-black overflow-hidden">
            <h1 ref={pointerRef} className="absolute left-10 md:left-20 lg:left-5 top-1/2 transform -translate-y-1/2 text-5xl md:text-8xl lg:text-8xl text-white font-bold opacity-70 hidden lg:block">
              POINTER
            </h1>
            <h1 ref={k25Ref} className="absolute right-10 md:right-20 lg:right-20 top-1/2 transform -translate-y-1/2 text-5xl md:text-8xl lg:text-8xl text-white font-bold opacity-70 hidden lg:block">
              2K25
            </h1>
            <h1 ref={pointerMobileRef} className="absolute top-12 mt-6 text-5xl md:text-8xl lg:text-8xl text-white font-bold opacity-70 lg:hidden space-y-3">
              POINTER
            </h1>
            <h1 ref={k25MobileRef} className="absolute top-32  text-5xl md:text-8xl lg:text-8xl text-white font-bold opacity-70 lg:hidden space-y-2">
              2K25
            </h1>
            <Spline scene="https://prod.spline.design/echVvdtq9JHAKrMx/scene.splinecode" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-2 mt-20 mx-auto mb-10">
          <div className="shadow-xl text-black p-20 flex flex-col items-center justify-center h-[80%] lg:h-[100%] w-[80%] lg:w-[80%] md:w-[50%] mx-auto bg-white shadow-black rounded-full">
            <img src={cse} className="lg:h-[150px] md:h-[150px] mx-auto" />
            <p className="mt-5 text-xl"><Link to="/cse" className="text-black">CSE</Link></p>
          </div>
          <div className="shadow-xl text-white p-20 flex flex-col items-center justify-center w-[80%] lg:w-[80%] h-[80%] lg:h-[100%] md:w-[50%] mx-auto shadow-white rounded-full">
            <img src={it} className="lg:h-[150px] md:h-[150px] mx-auto" />
            <p className="mt-5 text-xl text-white"><Link to="/">IT</Link></p>
          </div>
          <div className="shadow-xl text-black p-20 flex flex-col items-center justify-center w-[80%] h-[80%] lg:h-[100%] lg:w-[80%] md:w-[50%] mx-auto shadow-black bg-white rounded-full">
            <img src={cyber} className="lg:h-[150px] md:h-[150px] mx-auto" />
            <p className="mt-5 text-xl"><Link to="" className="text-black">AIDS</Link></p>
          </div>
        </div>

        <div className="flex flex-col mx-auto md:flex-col lg:flex-row lg:space-x-2 mt-20 mb-10 justify-evenly md:border lg:border lg:border-white border border-white md:border-black p-5 md:p-10 lg:p-5 md:mx-auto rounded-xl shadow-lg lg:w-[90%]">
          {/* Image Section */}
          <div className="flex justify-center mb-6 md:mb-0">
            <img src={cse} className="h-[300px] md:h-[440px] w-auto mx-auto rounded-lg" alt="Learn" />
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center items-center h-auto w-[103%] md:w-[100%] mt-5 lg:w-[50%] mx-auto bg-white border border-white lg:p-7 p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black text-center md:text-left mb-4">
              Learn What Matters
            </h2>
            <p className="text-base md:text-lg text-black leading-relaxed">
              Education is not just about acquiring knowledge; it is about learning what truly matters in life. Whether you're exploring new skills or diving deeper into your passions, the journey of learning shapes the future. Focus on what excites you, what sparks curiosity, and what has the power to impact your life and the world around you. With the right tools and mindset, anything is possible. Start learning today and discover the true power of education.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 w-[95%] sm:p-10 sm:w-3/4 md:w-1/2 mx-auto mb-10 rounded-[40px]">
          <h1 className="text-black text-center text-lg sm:text-2xl font-bold italic leading-relaxed">
            Events
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-1 space-y-3 grid-cols-1 gap-2 mt-20 mx-auto mb-10">
          <div className="shadow-xl text-black p-20 flex flex-col items-center justify-center w-[80%] lg:w-[80%] md:w-[50%] mx-auto bg-white shadow-black rounded-xl">
            <img src={cse} className="lg:h-[150px] md:h-[150px] mx-auto" />
            <p className="mt-5 text-xl"><Link to="/technical" className="text-black">Technical</Link></p>
          </div>
          <div className="shadow-xl text-white p-20 flex flex-col items-center justify-center w-[80%] lg:w-[80%] md:w-[50%] mx-auto border border-white rounded-xl">
            <img src={it} className="lg:h-[150px] md:h-[150px] mx-auto" />
            <p className="mt-5 text-xl text-black"><Link to="/nont" className='text-white'>Non-Technical</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
