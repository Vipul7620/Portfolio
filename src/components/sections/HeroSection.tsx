
import TypedText from "@/components/TypedText";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
  handleResumeDownload: () => void;
}

const HeroSection = ({ scrollToSection, handleResumeDownload }: HeroSectionProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 relative pt-20">
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block mb-2">Hi, I'm</span>
            <span className="gradient-text">Vipul Vadhe</span>
          </h1>

          <div className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
            <TypedText
              text="Developer | Designer | Innovator"
              speed={80}
              delay={500}
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              onClick={handleResumeDownload}
              className="btn btn-primary flex items-center gap-2 animate-pulse-glow"
            >
              <Download size={18} />
              Download Resume
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="btn border-2 border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple hover:text-white dark:text-portfolio-purple dark:hover:text-white transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{
              opacity: loaded ? 1 : 0,
              scale: loaded ? 1 : 0.8,
              rotate: loaded ? 0 : -5
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.3
            }}
            className="relative w-64 h-64 md:w-80 md:h-80"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-portfolio-purple via-portfolio-blue to-portfolio-teal rounded-full opacity-30 blur-lg animate-pulse-slow"></div>
            <motion.img
              src="/lovable-uploads/3c21791e-75dd-4a55-8975-662c5b48bf75.png"
              alt="Vipul Vadhe"
              className="w-full h-full object-cover rounded-xl shadow-xl relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-portfolio-purple rounded-xl z-0"></div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
