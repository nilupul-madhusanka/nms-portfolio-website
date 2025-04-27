"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/github-color-svgrepo-com.svg";
import LinkedinIcon from "../../../public/linkedin-svgrepo-com.svg";
import FacebookIcon from "../../../public/facebook-svgrepo-com.svg";
import InstagramIcon from "../../../public/instagram-svgrepo-com.svg";
import WhatsappIcon from "../../../public/whatsapp-svgrepo-com.svg";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, subject, message } = formData;

    const mailtoLink = `mailto:nilupul.madhu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Email: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">Let&apos;s Connect</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com">
            <Image src={GithubIcon} alt="Github Icon" width={50} height={50} className="hover:scale-110 transition-all duration-300" />
          </Link>
          <Link href="https://linkedin.com">
            <Image src={LinkedinIcon} alt="Linkedin Icon" width={50} height={50} className="hover:scale-110 transition-all duration-300" />
          </Link>
          <Link href="https://facebook.com">
            <Image src={FacebookIcon} alt="Facebook Icon" width={50} height={50} className="hover:scale-110 transition-all duration-300" />
          </Link>
          <Link href="https://instagram.com">
            <Image src={InstagramIcon} alt="Instagram Icon" width={50} height={50} className="hover:scale-110 transition-all duration-300" />
          </Link>
          <Link href="https://whatsapp.com">
            <Image src={WhatsappIcon} alt="Whatsapp Icon" width={50} height={50} className="hover:scale-110 transition-all duration-300" />
          </Link>
        </div>
      </div>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-white block mb-2 text-sm font-medium"
            >
              Your email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="abc@gmail.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="text-white block text-sm mb-2 font-medium"
            >
              Subject
            </label>
            <input
              name="subject"
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Just saying hi"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="text-white block text-sm mb-2 font-medium"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Let&apos;s talk about..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
  
};

export default EmailSection;
