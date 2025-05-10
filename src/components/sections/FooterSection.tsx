
import { Download, Github, Linkedin } from "lucide-react";

interface FooterSectionProps {
  handleResumeDownload: () => void;
}

const FooterSection = ({ handleResumeDownload }: FooterSectionProps) => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text mb-2">Vipul Vadhe</h3>
            <p className="text-gray-400 text-sm">Developer • Designer • Innovator</p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/Vipul7620"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/vipul-vadhe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <button
              onClick={handleResumeDownload}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Download size={20} />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Vipul Vadhe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
