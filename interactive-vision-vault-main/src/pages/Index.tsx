import { useEffect, useRef, useState } from "react";

// Components
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";

// Section Components
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ResearchSection from "@/components/sections/ResearchSection";

// Add Three.js dependency
import "three";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Define all sections
  const sections = ["home", "about", "projects", "experience", "research", "contact"];

  const scrollToSection = (id: string) => {
    setIsScrolling(true);
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        setIsScrolling(false);
        setActiveSection(id);
      }, 600);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      // Find which section is currently in view
      const scrollPosition = window.scrollY + 100; // Add offset to account for navbar

      let currentSection = sections[0];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          currentSection = section;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  // Project data
  const projects = [
    {
      title: "Cloud Classroom",
      description: "Web application for course management and feedback collection with user-friendly interface.",
      techStack: [
        { name: "HTML", color: "#e34c26" },
        { name: "PHP", color: "#8892bf" },
        { name: "MySQL", color: "#4479a1" },
      ],
    },
    {
      title: "AI Healthcare Bot",
      description: "Django-based chatbot designed for providing healthcare guidance in rural areas.",
      techStack: [
        { name: "Python", color: "#3776ab" },
        { name: "Django", color: "#092e20" },
        { name: "AI/ML", color: "#ff6f00" },
      ],
    },
    {
      title: "BookStore Website",
      description: "Online book store with comprehensive admin dashboard and user management.",
      techStack: [
        { name: "PHP", color: "#8892bf" },
        { name: "MySQL", color: "#4479a1" },
        { name: "JavaScript", color: "#f7df1e" },
      ],
    },
    {
      title: "ESports Tournament App",
      description: "Android application for tournament registrations and match management using Firebase.",
      techStack: [
        { name: "Java", color: "#007396" },
        { name: "Firebase", color: "#ffca28" },
        { name: "Android", color: "#3ddc84" },
      ],
    },
  ];

  // Skills data
  const skills = [
    { name: "Python", color: "#3776ab" },
    { name: "Java", color: "#007396" },
    { name: "PHP", color: "#8892bf" },
    { name: "HTML/CSS", color: "#e34c26" },
    { name: "JavaScript", color: "#f7df1e" },
    { name: "MySQL", color: "#4479a1" },
    { name: "Power BI", color: "#f2c811" },
    { name: "Adobe Creative Suite", color: "#ff0000" },
  ];

  const handleResumeDownload = () => {
    const resumeUrl = "/VIPUL_VADHE_FINAL.pdf";
    window.open(resumeUrl, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <ParticleBackground />

      {/* Hero Section */}
      <HeroSection
        scrollToSection={scrollToSection}
        handleResumeDownload={handleResumeDownload}
      />

      {/* About Section */}
      <AboutSection skills={skills} />

      {/* Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Research Section */}
      <ResearchSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <FooterSection handleResumeDownload={handleResumeDownload} />
    </div>
  );
};

export default Index;
