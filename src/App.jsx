import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css';

const App = () => {
  const [showContent, setShowContent] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!showContent || !mainRef.current) return;

    const mainElement = mainRef.current;
    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    };

    mainElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      mainElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showContent]);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    })
      .to(".vi-mask-group", {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: "Expo.easeInOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            setShowContent(true);
            this.kill();
          }
        }
      });
  }, []);

  useGSAP(() => {
    if (!showContent) return;
    if (!mainRef.current) return;

    gsap.to(mainRef.current, {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });
  }, { scope: mainRef, dependencies: [showContent] });

  return (
    <>
      {!showContent && (
        <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <defs>
              <mask id="viMask">
                <rect width="100%" height="100%" fill="black" />
                <g className="vi-mask-group">
                  <text
                    x="50%"
                    y="50%"
                    fontSize="250"
                    textAnchor="middle"
                    fill="white"
                    dominantBaseline="middle"
                    fontFamily="Arial Black"
                  >
                    VI
                  </text>
                </g>
              </mask>
            </defs>
            <image
              href="/bg.png"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#viMask)"
            />
          </svg>
        </div>
      )}
  
      {showContent && (
        <div ref={mainRef} className="main w-full rotate-[-10deg] scale-[1.7] sm:scale-[1.3] md:scale-[1.1] lg:scale-100">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            {/* Navbar */}
            <div className="navbar absolute top-0 left-0 z-10 w-full py-6 px-6 sm:py-8 sm:px-10">
              <div className="logo flex gap-4 items-center">
                <div className="lines flex flex-col gap-[4px]">
                  <div className="line w-8 h-[4px] bg-white"></div>
                  <div className="line w-6 h-[4px] bg-white"></div>
                  <div className="line w-4 h-[4px] bg-white"></div>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-bold">Rockstar</h3>
              </div>
            </div>
  
            {/* Images Section */}
            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.4] sm:scale-[1.3] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="/sky.png"
                alt="Sky"
              />
              <img
                className="absolute bg scale-[1.6] sm:scale-[1.4] rotate-[-3deg] top-0 left-0 w-full h-full object-cover"
                src="/bg.png"
                alt="Background"
              />
              <div className="text text-white flex flex-col gap-2 absolute top-24 left-[35vw] scale-100 rotate-[-10deg] text-center">
                <h1 className="text-[4rem] mr-40 sm:text-[6rem] md:text-[8rem] capitalize font-black leading-none">Grand</h1>
                <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] capitalize font-black leading-none">Theft</h1>
                <h1 className="text-[4rem] mr-50 sm:text-[6rem] md:text-[8rem] capitalize font-black leading-none">auto</h1>
              </div>
              <img
                className="absolute character bottom-[-130%] top-100 sm:bottom-[-100%] left-1/2 -translate-x-1/2 scale-[2.5] sm:scale-[2] rotate-[-20deg] max-h-[80vh] object-contain"
                src="/girlbg.png"
                alt="Character"
              />
            </div>
  
            {/* Bottom Bar */}
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-6 sm:py-8 px-6 sm:px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
                <i className="text-2xl sm:text-3xl md:text-4xl ri-arrow-down-line"></i>
                <h3 className="text-lg sm:text-xl md:text-2xl font-[Helvetica_Now_Display,sans-serif]">Scroll Down</h3>
              </div>
              <img
                className="absolute h-[30px] sm:h-[45px] md:h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="/ps5.png"
                alt="PS5"
              />
            </div>
          </div>
  
          {/* About Section */}
          <div className="about w-full min-h-screen px-4 sm:px-8 lg:px-20 flex items-center justify-center bg-black py-10 sm:py-20">
            <div className="cntnr w-full max-w-7xl flex flex-col lg:flex-row items-center gap-10">
              {/* Left Image */}
              <div className="limg w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px] relative">
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain scale-[.8] sm:scale-[1.3]"
                  src="/imag.png"
                  alt="About"
                />
              </div>
              {/* Right Text */}
              <div className="rg w-full lg:w-1/2 text-white text-center lg:text-left">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">Still Running</h1>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">Not Hunting</h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-[Helvetica_Now_Display,sans-serif]">
                  Grand Theft Auto VI is set to return players to the neon-soaked streets of Vice City. The game promises a vast, dynamic world packed with new features, enhanced realism, and a gripping story.
                </p>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-[Helvetica_Now_Display,sans-serif]">
                  Rockstar Games has confirmed GTA 6 will feature dual protagonists, improved AI, and expanded character interactions. The game’s release has generated massive anticipation across the gaming community.
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-400 transition px-5 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-black mt-6 sm:mt-10 text-xl sm:text-2xl md:text-3xl rounded-md font-semibold">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;