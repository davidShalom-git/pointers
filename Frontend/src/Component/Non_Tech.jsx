import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextPlugin } from 'gsap/TextPlugin';
import gsap from 'gsap';
import cse from '../assets/cse.png';
import it from '../assets/it.png';
import Nav from './Nav';


gsap.registerPlugin(TextPlugin);

const NonTechPage = () => { // ✅ Rename component
  const imageref = useRef(null);
  const textRef = useRef(null);
  const h1Ref = useRef(null);
  const cardRefs = useRef([]);
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    { title: 'IPL', imgSrc: cse, direc: '/ipl' },
    { title: 'ESports', imgSrc: it, direc: '/esports' },
    { title: 'Story', imgSrc: cse, direc: '/story' },
    { title: 'GoogleMap', imgSrc: it, direc: '/google' },
  ];

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <Nav />
      <div className="container mx-auto my-10 px-3">
        <div className="bg-white p-6 w-[95%] sm:p-10  sm:w-3/4 md:w-1/2 mx-auto mb-10 rounded-[40px]">
          <h1 className="text-black text-center text-lg sm:text-2xl font-bold italic leading-relaxed">
            Non-Technical
          </h1>
        </div>
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mx-auto mt-10 mb-20 px-4">
          {filteredTopics.map((topic, index) => (
            <div
              key={index}
              className="shadow-lg shadow-black p-6 md:p-8 mb-10 rounded-full bg-white lg:w-[70%] md:w-[90%] w-[100%] mx-auto"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <img
                src={topic.imgSrc}
                className="h-[150px] md:h-[180px] mx-auto"
                alt={topic.title}
              />
              <h1 className="text-center mt-6 text-lg md:text-xl text-black">
                <Link to={`${topic.direc}`} className="text-black hover:text-gray-400">
                  {topic.title}
                </Link>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NonTechPage; // ✅ Use new name
