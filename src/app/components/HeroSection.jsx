"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
            Hello, I&apos;m{" "}
          </span>


            <br></br>
            <TypeAnimation
              sequence={[
                "Nilupul",
                1000,
                "Web Developer",
                1000,
                "Programmer",
                1000,
                "Tech Enthusiast",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
              I am an undergraduate at SLTC Research University in Sri Lanka<br></br>and passionate about software and full-stack development.
          </p>
          <div>
              <div className="group inline-block">
                  <Link
                      href="/#contact"
                      className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 text-white bg-gradient-to-br from-primary-500 to-secondary-500 group-hover:from-blue-500 group-hover:to-green-500 transition-all duration-300 ease-in-out"
                  >
                      Hire Me
                  </Link>
              </div>
              <a
                href="/cv.pdf"
                download="NMS_CV.pdf"
                className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3"
              >
                <span className="block bg-[#121212] hover:bg-inherit rounded-full px-5 py-2">
                  Download CV
                </span>
              </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0">
          <div className="relative w-[250px] h-[250px] lg:w-[400px] lg:h-[400px]">
            {/* Glowing rotating ring */}
          <div className="absolute inset-0 z-0 rounded-full custom-rotating-ring"></div>

            {/* Profile image */}
          <div className="absolute inset-4 rounded-full bg-[#181818] flex items-center justify-center">
            <Image
              src="/images/profile.png"
              alt="hero image"
              className="rounded-full"
              width={300}
              height={300}/>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
