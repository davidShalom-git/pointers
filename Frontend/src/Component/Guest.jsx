import React, { useEffect, useRef } from 'react';
import { TextPlugin } from 'gsap/TextPlugin';
import gsap from 'gsap';
import cse from '../assets/R.png';
import it from '../assets/SSJ.jpg';
import ai from '../assets/Jiren.jpg';
import broly from '../assets/Broly.png';
import beerus from '../assets/Beerus.jpg';
import android from '../assets/a17.jpg';
import Nav from './Nav';

gsap.registerPlugin(TextPlugin);

const Non_Tech = () => {
  const imageref = useRef(null);
  const textRef = useRef(null);
  const h1Ref = useRef(null);
  const cardRefs = useRef([]);

  const topics = [
    { title: 'Goku', imgSrc: it },
    { title: 'Vegeta', imgSrc: cse },
    { title: 'Jiren', imgSrc: ai },
  ];


  const topics1 = [
    { title: 'Android 17', imgSrc: android },
    { title: 'Broly', imgSrc: broly },
    { title: 'Beerus', imgSrc: beerus },
  ];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(max-width: 1023px)",
        isMobile: "(max-width: 768px)",
      },
      (context) => {
        const { isDesktop, isTablet, isMobile } = context.conditions;

        const timeline = gsap.timeline();
        if (imageref.current && textRef.current && h1Ref.current) {
          timeline
            .from(imageref.current, {
              x: isMobile ? 0 : isTablet ? -100 : -200,
              opacity: 0,
              duration: 1.5,
              ease: "power2.out",
            })
            .from(
              textRef.current,
              {
                y: isMobile ? 50 : 200,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
              },
              "-=1"
            )
            .to(
              h1Ref.current,
              {
                text: "Smart Learning...",
                duration: 2,
                ease: "power2.inOut",
              },
              "-=1"
            );
        }

        const validCardRefs = cardRefs.current.filter(Boolean);
        if (validCardRefs.length > 0) {
          gsap.from(validCardRefs, {
            y: isMobile ? 100 : 200,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.3,
          });
        }

        return () => {
          timeline.kill();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <>
    <Nav  />
      <div className="container mx-auto my-10">
        <div className="bg-white p-6 w-[90%] sm:p-10  md:w-1/2 mx-auto mb-10 rounded-[40px] ">
          <h1 className="text-black text-center text-lg sm:text-2xl font-bold italic leading-relaxed">
            Chief Guests
          </h1>
        </div>

        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto mt-10 mb-20">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-[300px] h-[400px] bg-[#272524] rounded-[24px] mx-auto p-8 space-y-6"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <img
                src={topic.imgSrc}
                className="w-full h-[200px] object-cover rounded-[24px]"
                alt={topic.title}
              />
              <div className="mt-4 text-center">
                <h2 className="text-[24px] font-normal text-white mb-2">
                  {topic.title}
                </h2>
                <h3 className="text-[16px] font-normal opacity-75 text-gray-300 mb-2">
                  Subject
                </h3>
                <p className="text-[14px] font-normal opacity-50 text-gray-400 mb-4">
                  Warrior
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 w-[90%] sm:p-10 md:w-1/2 mx-auto mb-10 rounded-[40px] ">
          <h1 className="text-black text-center text-lg sm:text-2xl font-bold italic leading-relaxed">
            Institution Guests
          </h1>
        </div>

        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto mt-10 mb-20">
          {topics1.map((topic, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-[300px] h-[400px] bg-[#272524] rounded-[24px] mx-auto p-8 space-y-6"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <img
                src={topic.imgSrc}
                className="w-full h-[200px] object-cover rounded-[24px]"
                alt={topic.title}
              />
              <div className="mt-4 text-center">
                <h2 className="text-[24px] font-normal text-white mb-2">
                  {topic.title}
                </h2>
                <h3 className="text-[16px] font-normal opacity-75 text-gray-300 mb-2">
                  Subject
                </h3>
                <p className="text-[14px] font-normal opacity-50 text-gray-400 mb-4">
                  Warrior
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Non_Tech;
