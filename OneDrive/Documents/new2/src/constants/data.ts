import type { Project, Service, SkillItem, TimelineItem } from "@/types";

export const skills: SkillItem[] = [
  { name: "HTML", level: "Expert", category: "Frontend" },
  { name: "CSS", level: "Expert", category: "Frontend" },
  { name: "JavaScript", level: "Advanced", category: "Frontend" },
  { name: "TypeScript", level: "Advanced", category: "Frontend" },
  { name: "React", level: "Advanced", category: "Frontend" },
  { name: "Next.js", level: "Advanced", category: "Frontend" },
  { name: "Tailwind CSS", level: "Advanced", category: "Frontend" },
  { name: "Bootstrap", level: "Intermediate", category: "Frontend" },
  { name: "Node.js", level: "Advanced", category: "Backend" },
  { name: "Express.js", level: "Advanced", category: "Backend" },
  { name: "REST API", level: "Advanced", category: "Backend" },
  { name: "MongoDB", level: "Advanced", category: "Database" },
  { name: "Mongoose", level: "Advanced", category: "Database" },
  { name: "Git", level: "Advanced", category: "Tools" },
  { name: "GitHub", level: "Advanced", category: "Tools" },
  { name: "VS Code", level: "Advanced", category: "Tools" },
  { name: "Postman", level: "Advanced", category: "Tools" },
  { name: "Vercel", level: "Advanced", category: "Tools" },
  { name: "Figma", level: "Intermediate", category: "Tools" },
];

export const projectCategories = ["All", "React", "Next.js", "MERN", "API", "Full Stack"] as const;

export const projects: Project[] = [
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    description: "A premium portfolio experience built with Next.js, TypeScript, and Tailwind CSS.",
    category: "Next.js",
    image: "/project-portfolio.svg",
    featured: true,
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    features: [
      "Animated hero and section reveal",
      "Filterable project showcase",
      "Light / dark theme support",
      "SEO and accessible design",
    ],
    liveUrl: "#portfolio",
    repoUrl: "https://github.com/rija-azeem/portfolio",
    problem:
      "Recruiters and clients needed a polished showcase and better storytelling for real-world projects.",
    solution:
      "Designed a modular portfolio to highlight skills, featured work, and a modern contact experience.",
    challenges: [
      "Balancing performance with rich motion.",
      "Creating a responsive yet premium visual system.",
      "Keeping the codebase modular and scalable.",
    ],
  },
  {
    slug: "restaurant-management-system",
    title: "Restaurant Management System",
    description: "A modern full stack application for menu management, orders, and team workflows.",
    category: "MERN",
    image: "/project-restaurant.svg",
    featured: true,
    tech: ["React", "Node", "Express", "MongoDB"],
    features: [
      "Admin dashboard with order tracking",
      "Menu and reservation management",
      "Performance-focused UI",
      "REST API integration",
    ],
    liveUrl: "#portfolio",
    repoUrl: "https://github.com/rija-azeem/restaurant-management",
    problem:
      "Restaurant teams needed a unified system for digital orders and staff coordination.",
    solution:
      "Built a scalable MERN application with intuitive dashboards and real-time data flows.",
    challenges: [
      "Designing a clean UX for complex workflows.",
      "Ensuring data integrity across user roles.",
      "Optimizing API response times.",
    ],
  },
  {
    slug: "pakclassified",
    title: "PakClassified",
    description: "A classified listings platform with search, categories, and premium listing options.",
    category: "React",
    image: "/project-marketplace.svg",
    featured: false,
    tech: ["React", "TypeScript", "Tailwind CSS", "API"],
    features: [
      "Search and filter experience",
      "Responsive item listings",
      "Category-driven navigation",
      "Clean marketplace visuals",
    ],
    liveUrl: "#portfolio",
    repoUrl: "https://github.com/rija-azeem/pakclassified",
    problem:
      "Users needed a searchable marketplace with modern browsing and listing features.",
    solution:
      "Implemented a responsive interface with smart filters and clear call-to-actions.",
    challenges: [
      "Designing an accessible search flow.",
      "Optimizing grid layouts for mobile and desktop.",
      "Maintaining fast load times.",
    ],
  },
  {
    slug: "smart-hostel-management",
    title: "Smart Hostel Management System",
    description: "An operations platform for hostel reservations, payments, and student services.",
    category: "Full Stack",
    image: "/project-hostel.svg",
    featured: false,
    tech: ["Next.js", "MongoDB", "Node.js", "Tailwind"],
    features: [
      "Reservation and billing dashboard",
      "Student profile management",
      "Secure admin controls",
      "Analytics-driven reporting",
    ],
    liveUrl: "#portfolio",
    repoUrl: "https://github.com/rija-azeem/smart-hostel",
    problem:
      "Hostels required a central application to manage bookings, tenants, and payments.",
    solution:
      "Created a next-gen platform with role-based access and intuitive controls.",
    challenges: [
      "Building secure authorization flows.",
      "Handling dynamic reservation states.",
      "Maintaining responsive dashboards.",
    ],
  },
  {
    slug: "heart-disease-prediction",
    title: "Heart Disease Prediction",
    description: "A medical insights dashboard with predictive analytics and patient visualization.",
    category: "API",
    image: "/project-health.svg",
    featured: false,
    tech: ["React", "Express", "MongoDB", "API"],
    features: [
      "Prediction result visualizations",
      "Patient summary cards",
      "Secure form submission",
      "API-powered analytics",
    ],
    liveUrl: "#portfolio",
    repoUrl: "https://github.com/rija-azeem/heart-disease-prediction",
    problem:
      "Healthcare teams needed a simple interface to visualize diagnostic predictions.",
    solution:
      "Developed a lightweight dashboard with meaningful patient insights and API support.",
    challenges: [
      "Representing medical data clearly.",
      "Protecting sensitive form submissions.",
      "Balancing precision and usability.",
    ],
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description: "A modern weather app with location-based forecasts and animated conditions.",
    category: "React",
    image: "/project-weather.svg",
    featured: false,
    tech: ["React", "OpenWeather API", "Tailwind", "TypeScript"],
    features: [
      "Live forecasts and temperature cards",
      "Searchable city reports",
      "Responsive weather widgets",
      "Animated state transitions",
    ],
    liveUrl: "#portfolio",
    repoUrl: "https://github.com/rija-azeem/weather-dashboard",
    problem:
      "Weather apps often lacked modern design and fast access to forecasts.",
    solution:
      "Created a polished dashboard with quick-search weather summaries and visuals.",
    challenges: [
      "Integrating external forecast APIs.",
      "Ensuring quick updates for location changes.",
      "Delivering consistent styles across viewports.",
    ],
  },
];

export const services: Service[] = [
  {
    title: "Frontend Development",
    description:
      "Pixel-perfect interfaces with responsive, scalable React and Next.js applications.",
  },
  {
    title: "Full Stack Development",
    description:
      "Complete MERN solutions from API design to database architecture and deployment.",
  },
  {
    title: "Responsive Websites",
    description:
      "Mobile-first design with performance, accessibility, and modern layouts.",
  },
  {
    title: "REST API Development",
    description:
      "Robust backend endpoints with validation, secure request handling, and data flow.",
  },
  {
    title: "Website Optimization",
    description:
      "Performance tuning for fast load times, effective caching, and SEO-friendly pages.",
  },
  {
    title: "Modern UI Development",
    description:
      "Beautiful interfaces with glassmorphism, premium spacing, and smooth animations.",
  },
];

export const experience: TimelineItem[] = [
  {
    year: "2026",
    title: "Full Stack MERN Developer",
    subtitle: "Freelance & Contract Work",
    description:
      "Delivered end-to-end projects for clients using React, Next.js, and MongoDB.",
  },
  {
    year: "2026",
    title: "MERN Stack Intern",
    subtitle: "Growth-stage startup",
    description:
      "Built internal dashboards and reusable UI components in React and Node.",
  },
  {
    year: "2022",
    title: "Projects & Freelance Work",
    subtitle: "Freelance work",
    description:
      "Created responsive marketing sites and optimized web experiences for clients.",
  },
];

export const education: TimelineItem[] = [
  {
    year: "2024 -present",
    title: "B.Sc. Computer Science",
    subtitle: "University of Central Punjab",
    description:
      "Specialization in software engineering, data structures, and web systems.",
  },
  {
    year: "2026",
    title: "MERN Stack Development Course",
    subtitle: "EVS Certification",
    description:
      "Completed a hands-on MERN development course with practical applications.",
  },
];
