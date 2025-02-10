import React, { useRef } from "react";
import { FaUsers, FaCheckCircle, FaPhoneAlt } from "react-icons/fa";
import Spline from '@splinetool/react-spline';
import cse from '../assets/R.png';
import it from '../assets/SSJ.jpg';
import broly from '../assets/Broly.png';
import beerus from '../assets/Beerus.jpg';

const AboutUs = () => {
  const pointerRef = useRef(null);
    const k25Ref = useRef(null);
    const pointerMobileRef = useRef(null);
    const k25MobileRef = useRef(null);
  
  return (
    <div className="container mx-auto px-5 py-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-full h-[100vh] flex items-center justify-center bg-black overflow-hidden">
            <h1 ref={pointerRef} className="absolute left-10 md:left-20 lg:left-30 top-1/2 transform -translate-y-1/2 text-5xl md:text-8xl lg:text-8xl text-white font-bold opacity-70 hidden lg:block">
              CSE
            </h1>
            <h1 ref={k25Ref} className="absolute right-10 md:right-20 lg:right-20 top-1/2 transform -translate-y-1/2 text-5xl md:text-8xl lg:text-8xl text-white font-bold opacity-70 hidden lg:block">
              2K25
            </h1>
            <h1 ref={pointerMobileRef} className="absolute top-12 mt-6 text-5xl md:text-8xl lg:text-8xl text-white font-bold opacity-70 lg:hidden space-y-3">
              CSE
            </h1>
            <h1 ref={k25MobileRef} className="absolute top-32  text-5xl md:text-8xl lg:text-8xl text-white font-bold opacity-70 lg:hidden space-y-2">
              2K25
            </h1>
            <Spline scene="https://prod.spline.design/Cq1X8AJ0NqvKastE/scene.splinecode" />
          </div>
        </div>
      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center justify-between py-16 gap-10">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white">Computer Science Engineers</h2>
          <p className="text-lg text-gray-500 mt-4">
          We are a passionate community of CSE students, driven by innovation and a thirst for knowledge. At Arunai Engineering College, we embrace technology to create impactful solutions, shaping the future through creativity, collaboration, and excellence."
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img src={broly} alt="Team" className="rounded-lg shadow-lg w-full" />
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-300">Organizers</h2>
        <p className="text-lg text-gray-700 mt-4">A passionate group of experts driving success.</p>
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {[{ img: it, name: "David", role: "III Year" },
            { img:cse,name: "Mohan", role: "IV YEAR" },
            { img: beerus,name: "Kannadhasan", role: "III Year" }].map((member, index) => (
            <div key={index} className="w-64 text-center shadow-lg p-5 rounded-lg bg-white">
              <img src={member.img} alt={member.name} className="w-48 h-32 rounded-full mx-auto" />
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
        <p className="text-lg text-gray-700 mt-4">We bring the best solutions tailored for your success.</p>
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {[{ icon: <FaUsers size={40} />, title: "Experienced Team", desc: "A team with years of expertise and innovation." },
            { icon: <FaCheckCircle size={40} />, title: "Quality Services", desc: "We deliver top-notch solutions with precision." },
            { icon: <FaPhoneAlt size={40} />, title: "24/7 Support", desc: "We're always here to assist you." }].map((feature, index) => (
            <div key={index} className="w-64 text-center shadow-lg p-5 rounded-lg bg-white">
              <div className="text-blue-600">{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
        <p className="text-lg text-gray-700 mt-4">We’d love to hear from you!</p>
        <a href="mailto:contact@yourcompany.com" className="mt-5 inline-block px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-bold">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
