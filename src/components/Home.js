import React, { useState, useRef, useEffect } from "react";
import ArrowDown from "../images/arrow-down.svg";
import CryptoImage from "../images/crypto-illustration.png";
import CryptoContent from "../images/crypto-content-img.png";
import CardGif from "../images/card-gif.gif";
import TabOpen from "../images/tab-open.png";
import GreenTree from "../images/green-tree.png";
import MotionArt from "../images/motionArt.png";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToTopAfterPageRender } from "../utils/scrollToTop";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Home = () => {
  useEffect(() => {
    scrollToTopAfterPageRender();
  }, []);

  const scrollDownPage = () => {
    window.scrollBy({
      top: 650,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const isSmallScreen = () => window.innerWidth < 768;
    if (isSmallScreen()) return;

    const line1 = document.querySelector(".creative-developer");
    const line2 = document.querySelectorAll(".crypto-head");
    const line3 = document.querySelector(".last-para");
    const line4 = document.querySelectorAll(".line-4");
    const line5 = document.querySelector(".moscow-text");
    const line6 = document.querySelectorAll(".line-6");
    const line7 = document.querySelector(".line-7");
    const line8 = document.querySelectorAll(".line-8");

    const images = Array.from(document.querySelectorAll(".image"));
    const tl = new gsap.timeline();

    const imagestl = new gsap.timeline({ delay: 0.8 });
    const image2tl = new gsap.timeline({ delay: 0.8 });
    const image3tl = new gsap.timeline({ delay: 1.2 });
    const image4tl = new gsap.timeline({ delay: 1.2 });

    gsap.to(".content", 0, { css: { visibility: "visible" } });

    imagestl
      .from(images[0], 1, {
        x: -300,
        ease: Power3.easeIn,
        opacity: 0,
      })
      .from(images[0].children, 2, { scale: 1.2, ease: Power3.easeOut }, 0);

    image2tl
      .from(images[1], 1, {
        x: 200,
        ease: Power3.easeInOut,
        opacity: 0,
        delay: 0.5,
      })
      .from(images[1].children, 2, { scale: 1.2, ease: Power3.easeOut }, 0.1);

    ScrollTrigger.create({
      trigger: images[2],
      start: "top 100%",
      end: "bottom 20%",
      onEnter: () => {
        image3tl
          .from(images[2], 1, {
            x: -200,
            ease: Power3.easeInOut,
            opacity: 0,
          })
          .from(images[2].children, 2, { scale: 1, ease: Power3.easeInOut }, 0);
      },
    });

    ScrollTrigger.create({
      trigger: images[3],
      start: "top 100%",
      end: "bottom 20%",
      delay: 0.5,
      onEnter: () => {
        image4tl
          .from(images[3], 1, {
            x: 200,
            ease: Power3.easeInOut,
            opacity: 0,
          })
          .from(images[3].children, 2, { scale: 1, ease: Power3.easeInOut }, 0);
      },
    });

    tl.staggerFrom(
      [line1, line2, line3],
      1,
      {
        y: 57,
        opacity: 0,
        ease: Power3.easeOut,
      },
      0.15
    );

    const scrambleText =
      "Moscow, Presnenskya embankment, 10 bld 2 (IQ Apartment Tower, floor 12)";
    gsap.fromTo(
      line5,
      {
        text: scrambleText
          .split("")
          .map((char) =>
            char === " "
              ? " "
              : String.fromCharCode(Math.floor(Math.random() * 25) + 97)
          )
          .join(""),
      },
      {
        text: scrambleText,
        duration: 10,
        ease: Power3.easeInOut,
        delay: 10,
        scrollTrigger: {
          trigger: line5,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      }
    );

    ScrollTrigger.create({
      trigger: line7,
      start: "top 70%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.from(line7, 1, {
          y: 100,
          opacity: 0,
          ease: "power3.easeOut",
        });
      },
    });

    gsap.from(line4, {
      scrollTrigger: {
        trigger: line4,
        start: "top 65%",
        end: "bottom 20%",
        scrub: 1,
      },
      x: -100,
      opacity: 0,
      ease: Power3.easeOut,
      duration: 15,
      speed: 0.3,
    });

    gsap.from(line6, {
      scrollTrigger: {
        trigger: line6,
        start: "top 80%",
        end: "bottom 30%",
        scrub: 1,
      },
      x: 200,
      opacity: 0,
      ease: Power3.easeOut,
      duration: 15,
      speed: 0.3,
    });

    gsap.from(line8, {
      scrollTrigger: {
        trigger: line8,
        start: "top 100%",
        end: "bottom 50%",
        scrub: 1,
      },
      x: -100,
      opacity: 0,
      ease: Power3.easeOut,
      duration: 15,
      speed: 0.3,
    });
  }, []);

  return (
    <div className="bg-[#EBF0F6]">
      <div className="px-4 lg:px-24 flex flex-wrap justify-between py-16">
        <div className="content-container">
          <p className="creative-developer"># 1 Creative Developer</p>
          <h3 className="crypto-head">
            Crypto that <span id="change-text">change</span>
          </h3>
          <h3 className="crypto-head">the world. Is now</h3>
          <h3 className="crypto-head">
            <span id="change-text">changing</span> you.
          </h3>
          <p className="mt-7 lg:w-[600px] last-para">
            We need to explore the{" "}
            <span id="change-text-para">crypto currencies</span> because it is
            our future transactions where everything is going to be replace by{" "}
            <span id="change-text-para">crypto</span>.
          </p>
          <div onClick={scrollDownPage} className="btn-scroll-down">
            <p>Scroll Down</p>
            <div className="arrow-down">
              <img className="w-4" src={ArrowDown} alt="arrow-down" />
            </div>
          </div>
          <div className="float-right mt-4 image">
            <img
              className="w-[500px]"
              src={CryptoContent}
              alt="crypto-down-img"
            />
          </div>
        </div>
        <div className="image-container image">
          <img
            className="img-crypto"
            src={CryptoImage}
            alt="crypto-illustration"
          />
        </div>
      </div>

      <div className="px-4 py-16 lg:px-24 lg:py-48 bg-[#1755FF] flex flex-wrap justify-between">
        <div>
          <h2 className="discover-head line-4">Open new tabs is sh*t</h2>
          <img className="mt-8" src={TabOpen} alt="tab-open" />
          <p className="mt-4 w-full lg:w-[500px] text-white line-4">
            A solution to for Every Student's who are interested in the world of
            cryptocurrencies in details.
          </p>
        </div>
        <img src={CardGif} alt="card-gif" />
      </div>

      <div className="px-4 py-20 lg:px-24 lg:py-48 bg-[#000000] flex flex-wrap flex-col-reverse lg:flex-row lg:justify-between">
        <div className="motion-art-div">
          <div className="image">
            <img src={MotionArt} alt="" />
          </div>
        </div>
        <div className="motion-art-content">
          <h3 className="moscow-text">
            Moscow, Presnenskya embankment, 10 bld 2 (IQ Apartment Tower, floor
            12)
          </h3>
          <p className="contact-info mt-8 line-6">(+91) 845-927-169</p>
          <p className="contact-info line-6">aniket.raikwar.101@gmail.com</p>
          <p className={`card-para-1 line-6`}>
            Solution for all people who want to use crypto currency for trade,
            invest, transaction, etc. (Track & trade your coin portfolio now).
          </p>
          <a
            href="https://www.linkedin.com/in/aniketraikwar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1 className="change-text-3 line-6">How to get to us _</h1>
          </a>
        </div>
      </div>
      <div className="bg-[#3a37cd] px-4 py-16 lg:px-24 lg:py-32 ">
        <div className="flex flex-wrap justify-between">
          <div className="green-1">
            <h1 className="text-white font-medium lg:font-semibold lg:leading-snug text-2xl lg:text-5xl w-[350px] lg:w-[550px] line-7">
              Get & Collect all your money from Friends, Family, Store on Every
              Transactions.
            </h1>
            <p className="mt-6 lg:mt-15 font-normal lg:leading-normal text-white text-sm w-[350px] lg:text-lg lg:w-[550px] green-text line-8">
              Crypto Verse is for all the Users and this is the emerging trend
              that can be changed the transaction history of the World.
            </p>
          </div>
          <div className="green-1 image">
            <img className="green-tree" src={GreenTree} alt="img" />
          </div>
        </div>
        <div>
          <p className="text-white text-sm lg:text-base font-thin lg:mt-0 mt-4 green-text line-8">
            creator: Aniket A. Raikwar
          </p>
          <p className="text-white text-sm lg:text-base font-thin lg:mb-0 mb-8 line-8">
            © all right reserved to their respective owner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
