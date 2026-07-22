import { useState, useEffect, FormEvent } from "react";
import emailjs from "emailjs-com";
import {
  Github,
  Linkedin,
  Mail,
  BookOpen,
  Cpu,
  Award,
  Briefcase,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  Play,
  Sun,
  Moon,
  Search,
  Menu,
  X,
  CheckCircle,
  Download,
  Terminal,
  Code,
  Layers,
  Phone,
  ArrowUpRight,
  User,
  Youtube,
  Book
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project, Experience, SkillCategory, Handbook, Certification, Achievement } from "./types";
import InteractiveHandbooks from "./components/InteractiveHandbooks";

// ==========================================
// PORTFOLIO CONFIGURATION DATA
// UPDATE THESE VALUES TO EASILY UPDATE THE WEBSITE!
// ==========================================
const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Burhan Shaheen",
    role: "Full Stack Engineer",
    subRole: "Specialized in High-Performance Reactive Systems",
    email: "hafiz.burhan834@gmail.com",
    phone: "+92 333 9216466",
    location: "Islamabad, Pakistan",
    status: "Open to Opportunities",
    experienceYears: "4+",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600", // Fallback, will display stylized avatar if fails
    bioParagraphs: [
      "I am a passionate Full Stack Engineer with 4+ years of professional experience building elegant, highly performant web and mobile systems. My expertise covers both frontend architectures (Angular, React, Next.js) and robust backend layers (Node.js/Express, Rest/GraphQL APIs, Firebase).",
      "Currently at Scala Teams, I own and refine critical storefront components and middleware pipelines powering a high-traffic e-commerce portal. I focus on optimizing render times, implementing state-driven caching, and writing clean, scalable services.",
      "Beyond building production code, I am active in the developer ecosystem as a technical writer and content creator, producing open-source frameworks handbooks and publishing interactive video tutorials on YouTube."
    ],
    education: {
      degree: "Bachelor of Science in Computer Science (BSCS)",
      university: "International Islamic University Islamabad",
      duration: "August 2022 Graduate",
      highlights: "GPA: 3.79 (Distinction • 2nd Position Holder)"
    }
  },
  socialLinks: {
    github: "https://github.com/burhanrepos",
    linkedin: "https://www.linkedin.com/in/burhan-shaheen-49b3aa1b0/",
    youtube: "https://www.youtube.com/@bstech8675",
    portfolio: "https://burhanrepos.github.io/burhan-portfolio",
    // Can point directly to a PDF in your portfolio repo or local folder
    resumePdf: "https://burhanrepos.github.io/burhan-portfolio/Burhan-Shaheen-Resume.pdf"
  },
  // The exactly requested contributed & featured projects list
  projects: [
    {
      id: "one-diamond-marketing",
      title: "One Diamond Marketing",
      description: "A revolutionary web marketing client boasting seamless Syncfusion Calendar integrations, dynamic real-time charts, automated JSON-to-PDF reports, and robust authentication layers.",
      longDescription: "Crafted on an Angular core incorporating Angular Material UI elements and robust SCSS styling. Leveraged complex RxJS streams to pipe clean asynchronous actions into custom marketing dashboards, enabling clients to schedule, configure, and analyze campaign behaviors instantly.",
      tech: ["Angular", "SCSS", "Angular Material", "RxJS", "Syncfusion Calendar", "Charts.js"],
      githubUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "one-diamond-mobile",
      title: "One Diamond (Mobile Application)",
      description: "The mobile companion application enabling corporate clients to view marketing metrics, synchronize calendars, export PDF records, and view rich dashboards on the go.",
      longDescription: "Engineered from a single clean codebase using Flutter and Dart. Integrates highly customized mobile calendar widgets, fast client-side performance, local cache configurations, and robust JWT validation protocols corresponding to backend auth services.",
      tech: ["Flutter", "Dart", "REST APIs", "Syncfusion", "PDF Generator", "JWT Authentication"],
      githubUrl: "",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "pak-foods",
      title: "Pak Foods! (e-commerce website)",
      description: "An exciting gourmet e-commerce portal built for culinary enthusiasts. Explore a curated catalog of exquisite Pakistani cuisine, add items to cart, and proceed with secure checkouts.",
      longDescription: "A full-stack personal showcase integrating robust Stripe integration for secure credit card payments. Includes user registration flow, order tracking, responsive dynamic cart computations, and a modular Firebase data model linked with Node.js/Express middlewares.",
      tech: ["Angular", "Bootstrap", "Stripe", "Firebase", "NodeJS", "ExpressJS"],
      githubUrl: "https://github.com/burhanrepos",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "multi-tasker-mobile",
      title: "Multi-Tasker (Mobile App)",
      description: "A decentralized mobile marketplace bridging tradesmen with current open local tasks. Solves salary dependency dilemmas by allowing workers to easily post, find, and bid on micro-jobs.",
      longDescription: "Built with React-Native-CLI and powered by Node.js. Incorporates features like user reviews/ratings, direct secure chat channels, automated stripe escrow payments, comprehensive history tracking, and active geo-alerts.",
      tech: ["React-Native-CLI", "React", "Stripe", "Firebase", "NodeJS", "ExpressJS"],
      githubUrl: "https://github.com/burhanrepos",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "multi-tasker-admin",
      title: "Multi-Tasker - Admin Panel",
      description: "The complete enterprise administration suite designed to manage users, tasks, stripe transaction routing, security credentials, and system support tickets for the Multi-Tasker platform.",
      longDescription: "Leverages Angular material tables, SCSS animations, and Bootstrap grids. Built to offer support managers clear analytic dashboards, direct action buttons to flag user reviews, audit escrow payments, and update roles and permissions.",
      tech: ["Angular", "SCSS", "Bootstrap", "Material UI", "Firebase", "NodeJS"],
      githubUrl: "https://github.com/burhanrepos",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
    }
  ] as Project[],
  handbooks: [
    {
      id: "angular-handbook",
      title: "Angular Architecture Handbook",
      tech: "Angular, RxJS, NgRx, TypeScript",
      description: "An advanced, production-oriented guide covering NgRx facade patterns, customized RxJS state caching, lazy-loading routes, and unit testing strategies.",
      coverColor: "from-red-600 to-rose-800",
      githubUrl: "https://burhanrepos.github.io/angular-handbook/",
      chaptersCount: 12
    },
    {
      id: "nextjs-handbook",
      title: "Next.js Deep-Dive Blueprint",
      tech: "React, Next.js, Next Auth, Server Actions",
      description: "A complete framework reference dissecting App Router behaviors, server-side caching mechanics, middleware filters, and SEO optimization metrics.",
      coverColor: "from-zinc-800 to-black",
      githubUrl: "https://burhanrepos.github.io/nextjs-handbook/",
      chaptersCount: 15
    },
    {
      id: "node-visual-handbook",
      title: "Node.js & Express API Guide",
      tech: "Node.js, Express, SQL, GraphQL, JWT",
      description: "A step-by-step masterclass in constructing highly modular RESTful and GraphQL backend endpoints, robust JWT authentication layers, and PostgreSQL schema definitions.",
      coverColor: "from-emerald-600 to-teal-800",
      githubUrl: "https://burhanrepos.github.io/node-visual-handbook/",
      chaptersCount: 10
    }
  ] as Handbook[],
  experiences: [
    {
      company: "Scala Teams LLC",
      role: "Full Stack Engineer",
      location: "Islamabad (Hybrid)",
      duration: "May 2024 - Present",
      highlights: [
        "Develop and maintain high-performance e-commerce portal utilizing Angular and TypeScript, enhancing rendering speed by ~30% with RxJS lazy loading.",
        "Own middleware endpoints and storefront layers, ensuring robust end-to-end telemetry and safe execution under heavy customer traffic spike conditions.",
        "Integrate Sanity Studio, ML-powered recommendation models, client-side lazy loads, audio-based voice searches, and Cloudinary media optimization libraries.",
        "Implement complex GraphQL structures, unified payments (Google Pay, PayPal), and automated SendGrid transactional flows decreasing failed checkout rates.",
        "Architect clean GET/POST/PUT REST wrappers abstracting legacy downstream APIs under NgRx store structures using the Facade Pattern.",
        "Establish 100% component code coverage leveraging Vitest and Jest, boosting system regression detection confidence ahead of production deployments."
      ],
      techUsed: ["Angular", "TypeScript", "RxJS", "NgRx", "GraphQL", "Node.js", "Express", "Sanity Studio", "Cloudinary", "OpenSearch", "Jest", "Vitest"]
    },
    {
      company: "ASM Associates LLC",
      role: "Frontend Developer",
      location: "Islamabad (On-site)",
      duration: "Feb 2023 - Apr 2024",
      highlights: [
        "Built the web interface of a comprehensive Tax Filing Suite from the ground up utilizing Angular and Angular Material structures across 15+ complex screens.",
        "Engineered modular dynamic Reactive Forms featuring nested arrays, custom validation routines, and state triggers, reducing user workflow friction and validation slips by 40%.",
        "Leveraged RxJS to streamline asynchronous stream compositions and web socket synchronization, securing continuous reliability on massive data feeds.",
        "Integrated custom RESTful API interceptors and centralized exception handlers, streamlining clean DRY API interactions and decreasing redundant catch statements by 50%."
      ],
      techUsed: ["Angular", "Angular Material", "TypeScript", "RxJS", "Reactive Forms", "REST APIs", "CSS3", "HTML5"]
    },
    {
      company: "Trillo Inc.",
      role: "Software Engineer",
      location: "Rawalpindi (On-site)",
      duration: "Apr 2022 - Feb 2023",
      highlights: [
        "Constructed custom Angular dashboards for 5+ scalable client applications, securing design consistency and cutting cross-team UI development timelines.",
        "Engineered cross-platform mobile apps for iOS and Android using Flutter and Dart from a unified workspace, saving over 40% in maintenance overhead.",
        "Overhauled custom enterprise dashboard widgets, including an interactive Syncfusion schedule calendar adapted for bespoke enterprise timing flows.",
        "Implemented secure frontend chatbot scripts linked to client APIs, improving active user session retention rates."
      ],
      techUsed: ["Angular", "Flutter", "Dart", "REST APIs", "JavaScript", "HTML5", "CSS3", "Syncfusion"]
    }
  ] as Experience[],
  skillCategories: [
    {
      title: "Frontend Development",
      icon: "Code",
      skills: ["Angular (latest)", "TypeScript", "RxJS", "NgRx", "React", "Next.js", "Angular Material", "Reactive Forms", "SCSS", "Bootstrap", "Tailwind CSS", "HTML5 / CSS3"]
    },
    {
      title: "Backend & Databases",
      icon: "Layers",
      skills: ["Node.js", "Express.js", "Firebase", "SQL (PostgreSQL / MySQL)", "GraphQL", "RESTful APIs", "JWT Authentication", "Stripe Payment Gateway", "Sanity Studio", "SendGrid"]
    },
    {
      title: "Mobile & Testing",
      icon: "Cpu",
      skills: ["Flutter", "Dart", "React Native", "Vitest", "Jest", "Component Testing", "Snapshot Verification"]
    },
    {
      title: "Tools & Architectures",
      icon: "Terminal",
      skills: ["Git / GitHub", "Docker", "CI/CD Pipelines", "OpenSearch", "Facade Pattern", "State Caching", "Cloudinary APIs"]
    }
  ] as SkillCategory[],
  achievements: [
    {
      title: "Superstar of the Month",
      description: "Recognized for exceptional engineering performance and delivery contributions on major client releases.",
      icon: "Award"
    },
    {
      title: "Ambassador at Opportunities Circle",
      description: "Awarded for active community building efforts and assisting tech professionals in accessing global training options.",
      icon: "User"
    },
    {
      title: "Star of IIUI",
      description: "Distinguished academic honor for finishing in the absolute top tier of the Computer Science graduating cohort.",
      icon: "GraduationCap"
    }
  ] as Achievement[],
  certifications: [
    { title: "RAG Bootcamp (LAB)", issuer: "KodeKloud", date: "March 2026", link: "https://certificates.kodekloud.com/8713775a-1361-49a3-8c2c-bb938bf0549d/13652a75-40c1-415f-8eea-9d540767a127/7c0af577-d6b6-43ca-842f-ec09bea16150.pdf" },
    { title: "Next.js 14 & React – The Complete Guide", issuer: "Udemy", date: "September 2024", link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-e2091004-a966-4750-ac63-e7f025f2405c.pdf" },
    { title: "NgRx (with NgRx Data) – The Complete Guide (Angular 18)", issuer: "Udemy", date: "July 2024", link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-a77e2c83-08e2-46dc-b64b-24a7fdf29d30.pdf" },
    { title: "Advanced React", issuer: "Coursera", date: "October 2023", link: "https://www.coursera.org/account/accomplishments/certificate/FY6GXVWNUDH2" },
    { title: "Frontend Development using Angular", issuer: "Coursera", date: "September 2023", link: "https://www.coursera.org/account/accomplishments/certificate/VA9SMMZHPQ4R" },
    { title: "MEAN/MERN Stack Development Bootcamp", issuer: "SOFTOO", date: "December 2022", link: "https://drive.google.com/file/d/12L3WiH0GjmHIZinUo-CU4BEjsPEW6B9y/view" }
  ] as Certification[]
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [projectSearch, setProjectSearch] = useState<string>("");
  const [activeSkillTab, setActiveSkillTab] = useState<string>("All");
  
  // Experience Details expand states
  const [expandedJob, setExpandedJob] = useState<string | null>("Scala Teams LLC");

  // Color theme (light / dark). Initial value comes from the inline script in
  // index.html, which has already set the class on <html> before first paint.
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("light")
      ? "light"
      : "dark"
  );

  // Form submit state
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Keep the <html> class and localStorage in sync with the selected theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Ignore storage errors (e.g. private mode)
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, [publicKey]);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormError("");
    setIsSubmitting(true);

    try {
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS credentials are not configured.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || `Portfolio inquiry from ${formData.name}`,
          message: formData.message,
          to_email: PORTFOLIO_DATA.personalInfo.email,
        },
        publicKey
      );

      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setFormSubmitted(false);
      }, 4000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setFormError("Unable to send the message right now. Please email me directly at " + PORTFOLIO_DATA.personalInfo.email + " instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter projects based on search query
  const filteredProjects = PORTFOLIO_DATA.projects.filter(p => 
    p.title.toLowerCase().includes(projectSearch.toLowerCase()) || 
    p.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.tech.some(t => t.toLowerCase().includes(projectSearch.toLowerCase()))
  );

  const allSkills = PORTFOLIO_DATA.skillCategories.flatMap(c => c.skills);
  const activeSkillsList = activeSkillTab === "All" 
    ? allSkills 
    : PORTFOLIO_DATA.skillCategories.find(c => c.title === activeSkillTab)?.skills || [];

  return (
    <div className="min-h-screen font-sans bg-zinc-950 text-zinc-100">
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-10%] left-[20%] w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-[15%] left-[60%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[90px]"></div>
      </div>

      {/* Sticky Header with Glassmorphism */}
      <header id="header" className="sticky top-0 w-full z-50 border-b border-zinc-200/10 bg-zinc-950/75 backdrop-blur-md glass-panel transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center space-x-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg font-display shadow-md shadow-violet-500/20">
              B
            </span>
            <span className="font-display font-bold text-lg tracking-tight group-hover:text-violet-500 transition-colors">
              Burhan<span className="text-violet-500 font-mono">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-sm font-medium hover:text-violet-500 transition-colors">About</a>
            <a href="#skills" className="text-sm font-medium hover:text-violet-500 transition-colors">Skills</a>
            <a href="#handbooks" className="text-sm font-medium hover:text-violet-500 transition-colors">Handbooks</a>
            <a href="#experience" className="text-sm font-medium hover:text-violet-500 transition-colors">Experience</a>
            <a href="#projects" className="text-sm font-medium hover:text-violet-500 transition-colors">Projects</a>
            <a href="#certifications" className="text-sm font-medium hover:text-violet-500 transition-colors">Credentials</a>
            <a href="#contact" className="text-sm font-medium hover:text-violet-500 transition-colors">Contact</a>
          </nav>

          {/* Resume and Menu controls */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-zinc-200/10 text-zinc-400 hover:text-violet-500 hover:border-violet-500/30 transition-all cursor-pointer"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Resume Call-to-action */}
            <a
              href={PORTFOLIO_DATA.socialLinks.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-2 text-xs font-semibold bg-zinc-900 text-zinc-100 px-4 py-2.5 rounded-xl border border-zinc-200/10 hover:border-violet-500/30 hover:shadow-lg transition-all"
            >
              <Download size={14} />
              <span>Resume PDF</span>
            </a>

            {/* Mobile menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-violet-500 transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sidebar Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-16 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col justify-start p-6 space-y-6 border-t border-zinc-200/10 shadow-2xl"
          >
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold py-2 hover:text-violet-500 border-b border-zinc-200/5">About</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold py-2 hover:text-violet-500 border-b border-zinc-200/5">Skills</a>
            <a href="#handbooks" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold py-2 hover:text-violet-500 border-b border-zinc-200/5">Handbooks</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold py-2 hover:text-violet-500 border-b border-zinc-200/5">Experience</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold py-2 hover:text-violet-500 border-b border-zinc-200/5">Projects</a>
            <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold py-2 hover:text-violet-500 border-b border-zinc-200/5">Credentials</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold py-2 hover:text-violet-500 border-b border-zinc-200/5">Contact</a>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between text-lg font-semibold py-2 border-b border-zinc-200/5 hover:text-violet-500 transition-colors cursor-pointer"
            >
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a
              href={PORTFOLIO_DATA.socialLinks.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white py-3.5 rounded-xl shadow-lg shadow-violet-600/20"
            >
              <Download size={16} />
              <span>Download Resume PDF</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Intro Section */}
      <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 grid-bg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* Hero Left Column Details */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 bg-violet-500/10 border border-violet-500/20 px-3.5 py-1.5 rounded-full text-violet-400 text-xs font-semibold tracking-wide uppercase">
              <Terminal size={14} className="animate-pulse" />
              <span>{PORTFOLIO_DATA.personalInfo.subRole}</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
                Hi, I'm <span className="text-violet-400">{PORTFOLIO_DATA.personalInfo.name}</span>
              </h1>
              <h2 className="font-display text-xl sm:text-2xl text-zinc-400 font-medium">
                Designing scalable web systems & building high-fidelity client environments.
              </h2>
            </div>

            <p className="text-zinc-400 max-w-xl text-base sm:text-lg leading-relaxed">
              I'm a full-stack engineer with <span className="text-zinc-200 font-semibold">{PORTFOLIO_DATA.personalInfo.experienceYears} of professional experience</span>. 
              Currently refining core middleware systems and frontends at <span className="text-violet-400 font-semibold">Scala Teams LLC</span>. I compile interactive developer tutorials and construct production-grade digital storefronts.
            </p>

            {/* Quick social & connection grid */}
            <div className="flex flex-wrap gap-4 items-center pt-2">
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-violet-600/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>View Featured Projects</span>
                <ChevronRight size={16} />
              </a>

              <a
                href={PORTFOLIO_DATA.socialLinks.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-zinc-900 text-zinc-100 border border-zinc-800 px-6 py-3.5 rounded-xl font-semibold transition-all hover:border-violet-500/30"
              >
                <Download size={16} />
                <span>Download Resume (PDF)</span>
              </a>

              <div className="flex items-center space-x-2 border-l border-zinc-850 pl-4 ml-2">
                <a
                  href={PORTFOLIO_DATA.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-zinc-400 hover:text-violet-400 hover:bg-zinc-900 rounded-xl transition-all"
                  aria-label="GitHub Profile Link"
                >
                  <Github size={20} />
                </a>
                <a
                  href={PORTFOLIO_DATA.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-zinc-400 hover:text-violet-400 hover:bg-zinc-900 rounded-xl transition-all"
                  aria-label="LinkedIn Profile Link"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={PORTFOLIO_DATA.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-zinc-400 hover:text-red-500 hover:bg-zinc-900 rounded-xl transition-all"
                  aria-label="YouTube Channel Link"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Hero Right Column Visual Mesh */}
          <div className="lg:col-span-5 flex justify-center relative mt-8 lg:mt-0">
            {/* Ambient Background Sphere Glow */}
            <div className="absolute inset-0 bg-violet-500/10 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>

            <div className="relative group max-w-sm w-full">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 rounded-3xl blur opacity-35 group-hover:opacity-50 transition duration-1000"></div>

              {/* Central Premium Profile card */}
              <div className="relative glass-panel rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl">
                <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-violet-500/30 mb-6 bg-zinc-900 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=600"
                    alt="Burhan Shaheen"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById('profile-svg-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div
                    id="profile-svg-fallback"
                    className="hidden absolute inset-0 bg-gradient-to-br from-violet-900 to-indigo-950 flex-col items-center justify-center"
                  >
                    <span className="font-display font-extrabold text-white text-5xl">BS</span>
                    <span className="text-zinc-500 text-xs font-mono mt-2">&lt;code_mode&gt;</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xl">{PORTFOLIO_DATA.personalInfo.name}</h3>
                  <p className="text-sm font-mono text-violet-400">&lt;FullStackEngineer /&gt;</p>
                </div>

                <div className="w-full border-t border-zinc-200/10 my-4"></div>

                {/* Info Pills */}
                <div className="grid grid-cols-2 gap-3 w-full text-left text-xs mb-4">
                  <div className="bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-200/5">
                    <span className="text-zinc-500 block mb-1">Status</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Available
                    </span>
                  </div>
                  <div className="bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-200/5">
                    <span className="text-zinc-500 block mb-1">Experience</span>
                    <span className="font-semibold text-zinc-200">{PORTFOLIO_DATA.personalInfo.experienceYears} Years</span>
                  </div>
                </div>

                <div className="w-full flex items-center justify-center space-x-3 text-xs bg-violet-500/5 border border-violet-500/10 p-2.5 rounded-xl text-violet-300">
                  <Cpu size={14} className="text-violet-400" />
                  <span>Angular • React • Flutter • Node</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="border-y border-zinc-200/10 bg-zinc-900/30 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <span className="block font-display text-4xl sm:text-5xl font-extrabold text-violet-500">{PORTFOLIO_DATA.personalInfo.experienceYears}</span>
            <span className="text-xs sm:text-sm text-zinc-500 uppercase tracking-wider font-semibold">Years Experience</span>
          </div>
          <div className="space-y-1">
            <span className="block font-display text-4xl sm:text-5xl font-extrabold text-indigo-400">15+</span>
            <span className="text-xs sm:text-sm text-zinc-500 uppercase tracking-wider font-semibold">Production Screens Built</span>
          </div>
          <div className="space-y-1">
            <span className="block font-display text-4xl sm:text-5xl font-extrabold text-purple-400">3+</span>
            <span className="text-xs sm:text-sm text-zinc-500 uppercase tracking-wider font-semibold">Dev Handbooks Written</span>
          </div>
          <div className="space-y-1">
            <span className="block font-display text-4xl sm:text-5xl font-extrabold text-teal-400">2nd</span>
            <span className="text-xs sm:text-sm text-zinc-500 uppercase tracking-wider font-semibold">IIUI Position Distinction</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">About Me</h2>
          <div className="w-12 h-1 bg-violet-600 mx-auto rounded-full"></div>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm">
            Educated in computer science, specialized in high-performance application loops.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* About Bio Block */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              {PORTFOLIO_DATA.personalInfo.bioParagraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            {/* Education block */}
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-200/5 flex items-start space-x-4">
              <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl">
                <GraduationCap size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-semibold text-zinc-200">{PORTFOLIO_DATA.personalInfo.education.university}</h4>
                <p className="text-xs text-zinc-400">{PORTFOLIO_DATA.personalInfo.education.degree} • {PORTFOLIO_DATA.personalInfo.education.duration}</p>
                <p className="text-xs font-mono text-emerald-400">{PORTFOLIO_DATA.personalInfo.education.highlights}</p>
              </div>
            </div>
          </div>

          {/* Quick achievements list */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            {PORTFOLIO_DATA.achievements.map((item, index) => (
              <div key={index} className="glass-panel rounded-2xl p-5 flex items-start space-x-4 hover:border-violet-500/30 transition-all group">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:bg-violet-600/10 group-hover:text-violet-400 transition-all">
                  {item.icon === "Award" ? <Award size={22} /> : item.icon === "User" ? <User size={22} /> : <GraduationCap size={22} />}
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="font-display font-bold text-zinc-200 group-hover:text-violet-400 transition-colors">{item.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grouped by Category */}
      <section id="skills" className="bg-zinc-900/30 border-y border-zinc-200/10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Technical Skills</h2>
            <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm">
              Highly specialized technical stack built across professional production years.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveSkillTab("All")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                activeSkillTab === "All"
                  ? "bg-violet-600 border-violet-600 text-white shadow-md"
                  : "bg-zinc-900/50 border-zinc-200/5 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              All Skills
            </button>
            {PORTFOLIO_DATA.skillCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveSkillTab(cat.title)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  activeSkillTab === cat.title
                    ? "bg-violet-600 border-violet-600 text-white shadow-md"
                    : "bg-zinc-900/50 border-zinc-200/5 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Render Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {PORTFOLIO_DATA.skillCategories.map((cat, i) => {
              const isDimmed = activeSkillTab !== "All" && activeSkillTab !== cat.title;
              if (isDimmed) return null;

              return (
                <div
                  key={i}
                  className="glass-panel rounded-2xl p-6 flex flex-col space-y-4 hover:border-violet-500/20 transition-all relative overflow-hidden group text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="p-2.5 bg-violet-500/10 text-violet-400 rounded-xl">
                      {cat.icon === "Code" && <Code size={20} />}
                      {cat.icon === "Layers" && <Layers size={20} />}
                      {cat.icon === "Cpu" && <Cpu size={20} />}
                      {cat.icon === "Terminal" && <Terminal size={20} />}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 group-hover:text-violet-400">
                      // {cat.skills.length} skills
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-zinc-200">{cat.title}</h3>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {cat.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-zinc-900 border border-zinc-200/5 text-zinc-300 text-xs rounded-lg font-medium hover:border-violet-500/30 hover:text-violet-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open-Source Handbooks Section */}
      <section id="handbooks" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Open-Source Handbooks</h2>
          <div className="w-12 h-1 bg-violet-600 mx-auto rounded-full"></div>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm">
            Step-by-step framework books drafted to streamline enterprise designs and patterns. Explore details in our interactive e-reader.
          </p>
        </div>

        <InteractiveHandbooks />

        {/* Youtube lectures promo block */}
        <div className="bg-gradient-to-r from-red-950/10 to-violet-950/10 border border-red-500/10 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 mt-12 text-left">
          <div className="flex items-start space-x-4">
            <div className="p-4 bg-red-500/10 text-red-500 rounded-2xl">
              <Youtube size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-lg text-zinc-100">YouTube Programming Lectures</h4>
              <p className="text-zinc-400 text-sm max-w-xl">
                I produce deep-dive video courses focusing on Angular Material schemas, RxJS async operators, advanced TypeScript modules, and state design patterns.
              </p>
            </div>
          </div>
          <a
            href={PORTFOLIO_DATA.socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-red-600/20 transition-colors whitespace-nowrap text-sm cursor-pointer"
          >
            <Play size={16} fill="white" />
            <span>Watch Lectures</span>
          </a>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="bg-zinc-900/30 border-y border-zinc-200/10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Work Experience</h2>
            <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm">
              My engineering progression timeline inside enterprise products.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-200/10">
            {PORTFOLIO_DATA.experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedJob === exp.company;

              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""} group`}>
                  {/* Timeline node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-[9px] md:-translate-x-1/2 w-5 h-5 rounded-full border-4 border-zinc-950 bg-violet-600 group-hover:scale-110 group-hover:bg-indigo-400 transition-all z-10"></div>

                  {/* Empty spacer side for desktop symmetry */}
                  <div className="hidden md:block w-1/2"></div>

                  {/* Content card side */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div
                      onClick={() => setExpandedJob(isExpanded ? null : exp.company)}
                      className={`glass-panel rounded-2xl p-6 text-left cursor-pointer transition-all border ${
                        isExpanded ? "border-violet-500/30 shadow-xl" : "hover:border-zinc-200/20"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div>
                          <h3 className="font-display font-extrabold text-lg text-zinc-100 group-hover:text-violet-400 transition-colors">
                            {exp.company}
                          </h3>
                          <p className="text-sm text-zinc-400 font-medium">{exp.role}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="inline-block px-3 py-1 bg-violet-500/10 text-violet-400 text-xs font-semibold rounded-md">
                            {exp.duration}
                          </span>
                          <p className="text-[10px] text-zinc-500 font-mono mt-1">{exp.location}</p>
                        </div>
                      </div>

                      {/* Expandable highlights container */}
                      <div className={`space-y-3.5 transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="w-full h-[1px] bg-zinc-200/5 my-3"></div>
                        <ul className="space-y-2.5">
                          {exp.highlights.map((hl, k) => (
                            <li key={k} className="text-xs sm:text-sm text-zinc-400 flex items-start space-x-2">
                              <span className="text-violet-500 font-bold mt-0.5">•</span>
                              <span className="leading-relaxed">{hl}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-4 flex flex-wrap gap-1.5 border-t border-zinc-200/5 mt-4">
                          {exp.techUsed.map((tech, t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 bg-zinc-900 text-zinc-400 text-[10px] rounded border border-zinc-200/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Click trigger indicator */}
                      <div className="flex items-center justify-between pt-3 text-xs text-zinc-500 font-mono mt-3 border-t border-zinc-200/5">
                        <span>Click to {isExpanded ? "collapse" : "expand highlights"}</span>
                        <ChevronRight size={14} className={`transform transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-left">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Featured Projects</h2>
            <div className="w-12 h-1 bg-violet-600 rounded-full"></div>
            <p className="text-zinc-400 max-w-lg text-sm">
              Explore custom systems I have architected, developed, and launched.
            </p>
          </div>

          {/* Project search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="Search by tech or keyword..."
              value={projectSearch}
              onChange={(e) => setProjectSearch(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-200/10 rounded-xl py-2.5 pl-11 pr-4 text-sm text-zinc-200 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            />
          </div>
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between hover:border-violet-500/30 transition-all group hover:shadow-2xl hover:shadow-violet-600/5 text-left"
            >
              <div>
                {/* Project Feature Banner Image */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-900 border-b border-zinc-200/5">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  {/* Category overlay tags (sit on the image, so kept dark in both themes) */}
                  <div className="absolute top-4 right-4 flex gap-1.5">
                    {p.tech.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="bg-black/60 border border-white/15 px-2.5 py-1 rounded-md text-[10px] font-semibold text-white tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-display font-bold text-xl text-zinc-100 group-hover:text-violet-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                  
                  {/* Technical long detail excerpt in tooltip/info container */}
                  <p className="text-zinc-500 text-xs leading-relaxed italic border-l-2 border-violet-500/30 pl-3">
                    {p.longDescription}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                {/* Full technology pill stack */}
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-zinc-900 text-zinc-400 text-[10px] font-mono rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500">
              No matching projects found. Try checking another term!
            </div>
          )}
        </div>
      </section>

      {/* Certifications & Credentials */}
      <section id="certifications" className="bg-zinc-900/30 border-y border-zinc-200/10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Credentials & Certifications</h2>
            <div className="w-12 h-1 bg-violet-600 mx-auto rounded-full"></div>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm">
              Continuous validation of technical excellence and paradigm updates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.link || '#'}
                target={cert.link ? '_blank' : undefined}
                rel={cert.link ? 'noopener noreferrer' : undefined}
                className="glass-panel rounded-2xl p-5 hover:border-violet-500/20 transition-all flex flex-col justify-between group text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Verified Credential</span>
                    <h3 className="font-display font-bold text-zinc-200 group-hover:text-violet-400 transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                  <span className="p-2 bg-violet-500/5 text-violet-400 rounded-lg shrink-0">
                    <Award size={18} />
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-zinc-200/5 mt-4 text-[11px] text-zinc-500">
                  <span>{cert.issuer}</span>
                  <span className="font-mono">{cert.date}</span>
                </div>
              </a>
            ))}

            <a
              href="https://www.linkedin.com/in/burhan-shaheen-49b3aa1b0/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-violet-500/40 px-4 py-2 text-sm font-semibold text-violet-300 transition hover:border-violet-400 hover:bg-violet-500/10 col-span-full mx-auto"
            >
              View All
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Get In Touch</h2>
          <div className="w-12 h-1 bg-violet-600 mx-auto rounded-full"></div>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm">
            Interested in collaboration, scheduling an interview, or discussing complex systems? Leave a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Left Column info cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 space-y-4 text-left">
              <h3 className="font-display font-bold text-lg text-zinc-200">Contact Details</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Reach out to schedule a discovery call. I typically respond to all inquiries within 24 business hours.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail size={16} className="text-violet-400" />
                  <a href={`mailto:${PORTFOLIO_DATA.personalInfo.email}`} className="text-zinc-300 hover:text-violet-400 transition-colors">
                    {PORTFOLIO_DATA.personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone size={16} className="text-violet-400" />
                  <span className="text-zinc-300">{PORTFOLIO_DATA.personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <GraduationCap size={16} className="text-violet-400" />
                  <span className="text-zinc-300">{PORTFOLIO_DATA.personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Quick response commitment badge */}
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-200/5 flex items-center space-x-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <p className="text-xs text-zinc-400 text-left">
                <span className="text-zinc-200 font-semibold">Current zone:</span> active during EMEA / APAC / US business hours.
              </p>
            </div>
          </div>

          {/* Right Column Form wrapper */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 relative">
              {formSubmitted ? (
                /* Success message panel */
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fade-in-up">
                  <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-full animate-bounce">
                    <CheckCircle size={44} />
                  </div>
                  <h4 className="font-display font-bold text-xl text-zinc-100">Message Dispatched!</h4>
                  <p className="text-zinc-400 text-sm max-w-sm">
                    Thank you, your message has been delivered safely. I will review it and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name-input" className="text-xs font-semibold text-zinc-400">Name</label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-200/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email-input" className="text-xs font-semibold text-zinc-400">Email Address</label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-200/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject-input" className="text-xs font-semibold text-zinc-400">Subject</label>
                    <input
                      id="subject-input"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-200/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message-input" className="text-xs font-semibold text-zinc-400">Message Body</label>
                    <textarea
                      id="message-input"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-200/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
                    />
                  </div>

                  {formError ? (
                    <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                      {formError}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-violet-600/20 transition-all transform hover:-translate-y-0.5 text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Professional Footer */}
      <footer className="border-t border-zinc-200/10 bg-zinc-950 py-12 text-center text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2.5">
            <span className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm">
              B
            </span>
            <span className="font-display font-bold text-zinc-300">
              Burhan Shaheen
            </span>
          </div>

          <p className="text-zinc-500 text-center md:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} Burhan Shaheen | Full Stack Engineer. All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            <a href={PORTFOLIO_DATA.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href={PORTFOLIO_DATA.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href={PORTFOLIO_DATA.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors" aria-label="YouTube">
              <Youtube size={16} />
            </a>
            <a href={`mailto:${PORTFOLIO_DATA.personalInfo.email}`} className="hover:text-zinc-300 transition-colors" aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
