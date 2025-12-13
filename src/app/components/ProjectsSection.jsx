"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "E-Learning Frontend",
    description: "This project is a modern and responsive E-Learning Platform frontend developed using React and Tailwind CSS. It provides a seamless learning experience for students and educators with clearly organized dashboards, interactive course pages, and intuitive navigation.",
    image: "/images/projects/lms.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/nilupul-madhusanka/nms-e-learning-frontend.git",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Library Management System",
    description: "This project is a modern, responsive frontend application for a Library Management System, developed using React and Tailwind CSS. It provides an intuitive user interface for managing books, users, loans, and reservations, offering a seamless experience across all devices.",
    image: "/images/projects/library.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/nilupul-madhusanka/nms-library-frontend.git",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Flutter Chat App",
    description: "This project is a real-time chat application built using Flutter for a smooth, cross-platform mobile experience and Firebase as the backend for authentication, messages storage, and instant message syncing. The app provides a fast, secure, and modern messaging experience with a clean and user-friendly interface.",
    image: "/images/projects/chatapp.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/nilupul-madhusanka/nms-chat-app.git",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "E-commerce Mini Store",
    description: "This project is a simple yet functional Mini Store Frontend built using React and Bootstrap 5, designed to demonstrate clean UI components, product display layouts, and basic e-commerce interactions. It provides a fast, responsive, and user-friendly shopping interface suitable for learning and portfolio purposes.",
    image: "/images/projects/store.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/nilupul-madhusanka/nms-mini-store-frontend.git",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "This is my portfolio website built with Next.js and Tailwind CSS. It showcases my skills, projects, and achievements in an elegant and responsive design.",
    image: "/images/projects/portfolio.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/nilupul-madhusanka/nms-portfolio-website.git",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Business Workflow App",
    description: "This project is a Business Workflow Mobile Application developed using Flutter and Firebase. It streamlines business processes by providing features such as task management, team collaboration, and real-time notifications, all within a user-friendly mobile interface.",
    image: "/images/projects/business.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/nilupul-madhusanka/nms-business-workflow-app.git",
    previewUrl: "/",
  },
  // {
  //   id: 7,
  //   title: "Demo 7",
  //   description: "Description for Demo 7 project goes here.",
  //   image: "/images/projects/1.png",
  //   tag: ["All", "Mobile"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },
  // {
  //   id: 8,
  //   title: "Demo 8",
  //   description: "Description for Demo 8 project goes here.",
  //   image: "/images/projects/1.png",
  //   tag: ["All", "Web"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },
  // {
  //   id: 9,
  //   title: "Demo 9",
  //   description: "Description for Demo 9 project goes here.",
  //   image: "/images/projects/1.png",
  //   tag: ["All", "Web"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12 text-justify">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
