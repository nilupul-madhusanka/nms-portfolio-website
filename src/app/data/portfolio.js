// Edit portfolio content here. Omit links and screenshots that are unavailable.
export const profile = {
  name: "Nilupul Madhusanka",
  role: "Web & Mobile Developer",
  email: "nilupul.madhu@gmail.com",
  introduction: "I’m a Bachelor of Applied Information Technology graduate from SLTC Research University. I build web and mobile experiences, and explore desktop applications and AI automation.",
  bio: [
    "I’m a Web and Mobile Developer who enjoys building responsive, user-friendly digital experiences. I work with React, Next.js, and Flutter, connecting thoughtful interfaces with practical backend services.",
    "My recent projects span a Sri Lankan recipe-to-cart platform, a Windows finance application, and an AI-assisted customer support workflow. I enjoy learning new technologies and turning ideas into useful software.",
  ],
  cv: "/nms-cv.pdf",
  socials: [
    { name: "GitHub", url: "https://github.com/nilupul-madhusanka", icon: "/github-color-svgrepo-com.svg" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/nilupul-madhusanka-0a2055284", icon: "/linkedin-svgrepo-com.svg" },
    { name: "Facebook", url: "https://www.facebook.com/nilupulmadhu2126", icon: "/facebook-svgrepo-com.svg" },
    { name: "WhatsApp", url: "https://wa.me/94774213504", icon: "/whatsapp-svgrepo-com.svg" },
  ],
};

export const aboutTabs = [
  { id: "languages", title: "Languages", items: ["HTML & CSS", "JavaScript & TypeScript", "Dart / Flutter", "Python", "Java"] },
  { id: "education", title: "Education", items: ["Bachelor of Applied Information Technology — SLTC Research University, Sri Lanka"] },
  { id: "certifications", title: "Certifications", items: ["Web Design for Beginners — CODL at UOM", "Python for Beginners — CODL at UOM"] },
];

export const skills = [
  { name: "React & Next.js", detail: "Web applications", icon: "/images/skills/react-svgrepo-com.svg" },
  { name: "Flutter & Dart", detail: "Cross-platform mobile apps", icon: "/images/skills/flutter-svgrepo-com.svg" },
  { name: "HTML & CSS", detail: "Responsive interfaces", icon: "/images/skills/html-5-svgrepo-com.svg" },
  { name: "Tailwind CSS", detail: "Interface styling", icon: "/images/skills/tailwindcss-svgrepo-com.svg" },
  { name: "Node.js", detail: "Backend services & APIs", icon: "/images/skills/node-js-svgrepo-com.svg" },
  { name: "Git & GitHub", detail: "Version control", icon: "/images/skills/github-color-svgrepo-com.svg" },
];

// Recent descriptions come from public READMEs or owner-supplied details.
// Edirisinghe's source is private/unavailable; omit the broken public link.
export const projects = [
  {
    id: "ai-support", title: "AI Customer Support Automation", category: "AI & Automation", featured: true,
    description: "A Python workflow that reads inquiries from Google Sheets, uses Gemini to draft replies, and provides a Streamlit dashboard for human review and approval before optional Gmail delivery.",
    technologies: ["Python", "Gemini", "Streamlit", "Google Sheets"], image: "/images/projects/ai-support.webp",
    links: [{ label: "Source code", url: "https://github.com/nilupul-madhusanka/ai-customer-support-automation" }],
  },
  {
    id: "fintrack", title: "FinTrack for Windows 11", category: "Desktop", featured: true,
    description: "An offline personal finance app for Windows 11. Track LKR income, expenses, transfers, and budgets with local SQLite storage, CSV exports, and verified backup and restore tools.",
    technologies: ["Rust", "Tauri 2", "SQLite"], image: "/images/projects/fintrack.webp",
    links: [{ label: "Source code", url: "https://github.com/nilupul-madhusanka/fintrack-windows-11" }],
  },
  {
    id: "hela-eats", title: "Hela Eats", category: "Web", categories: ["Web", "Mobile"], featured: true,
    description: "A team-built Sri Lankan recipe-to-cart platform spanning a React frontend, Node.js backend, and Flutter mobile app. Explore recipes, scale ingredients, plan meals, and turn them into a shopping cart.",
    technologies: ["React", "TypeScript", "Node.js", "Flutter"], image: "/images/projects/hela-eats.webp",
    links: [
      { label: "Frontend", url: "https://github.com/nilupul-madhusanka/hela-eats-frontend" },
      { label: "Backend", url: "https://github.com/nilupul-madhusanka/hela-eats-backend" },
      { label: "Mobile", url: "https://github.com/nilupul-madhusanka/hela-eats-mobile" },
    ],
  },
  {
    id: "curtain-service", title: "Edirisinghe Curtain Service", category: "Web", featured: true,
    description: "An interactive website for a Sri Lankan custom curtain service, with a curtain configurator, fabric collections, before-and-after comparisons, installation galleries, and a consultation booking flow.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "GSAP"], image: "/images/projects/curtain-service.webp",
    links: [], availability: "Private project",
  },
  {
    id: "chat", title: "NMS Chat App", category: "Mobile", featured: true,
    description: "A real-time messaging application built with Flutter and Firebase, with authentication, stored conversations, and instant message syncing across devices.",
    technologies: ["Flutter", "Dart", "Firebase"], image: "/images/projects/chat-app.png",
    links: [{ label: "Source code", url: "https://github.com/nilupul-madhusanka/nms-chat-app" }],
  },
  {
    id: "learning", title: "E-Learning Platform", category: "Web",
    description: "A responsive learning frontend with student and educator dashboards, organized course pages, and clear navigation.",
    technologies: ["React", "Tailwind CSS"], image: "/images/projects/lms.png",
    links: [{ label: "Source code", url: "https://github.com/nilupul-madhusanka/nms-e-learning-frontend" }],
  },
  {
    id: "library", title: "Library Management System", category: "Web",
    description: "A responsive library frontend for browsing and managing books, users, loans, and reservations.",
    technologies: ["React", "Tailwind CSS"], image: "/images/projects/library.png",
    links: [{ label: "Source code", url: "https://github.com/nilupul-madhusanka/nms-library-frontend" }],
  },
  {
    id: "store", title: "E-commerce Mini Store", category: "Web",
    description: "A mini storefront with reusable product displays and basic shopping interactions, built as a frontend learning project.",
    technologies: ["React", "Bootstrap 5"], image: "/images/projects/store.png",
    links: [{ label: "Source code", url: "https://github.com/nilupul-madhusanka/nms-mini-store-frontend" }],
  },
  {
    id: "portfolio", title: "Portfolio Website", category: "Web",
    description: "My personal portfolio for web, mobile, desktop, and automation projects, with accessible navigation and responsive layouts.",
    technologies: ["Next.js", "React", "Tailwind CSS"], image: "/images/projects/portfolio.png",
    links: [{ label: "Source code", url: "https://github.com/nilupul-madhusanka/nms-portfolio-website" }],
  },
  {
    id: "family-finance", title: "Family Finance Tracker", category: "Mobile",
    description: "A mobile app for tracking family expenses, managing budgets, and exploring financial data through charts and reports.",
    technologies: ["Flutter", "Firebase"], image: "/images/projects/fft-app.png",
    links: [{ label: "Source code", url: "https://github.com/nilupul-madhusanka/nms-fft-app" }],
  },
  {
    id: "igi-web", title: "NMS IGI Web", category: "Web",
    description: "A small, unofficial browser FPS inspired by Project IGI, with a 3D train depot, patrol guards, radar, and a military infiltration mission ending in extraction.",
    technologies: ["JavaScript", "Three.js", "Vite"], image: "/images/projects/nms-igi-web.webp",
    links: [{ label: "Source code", url: "https://github.com/nilupul-madhusanka/nms-igi-web" }],
  },
];

export const projectCategories = ["All", "Web", "Mobile", "Desktop", "AI & Automation"];

export function filterProjects(category) {
  return projects.filter((project) => category === "All" || (project.categories ?? [project.category]).includes(category));
}
