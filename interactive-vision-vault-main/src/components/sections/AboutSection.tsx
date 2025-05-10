
import { Github, Linkedin } from "lucide-react";

interface Skill {
  name: string;
  color: string;
}

interface AboutSectionProps {
  skills: Skill[];
}

const AboutSection = ({ skills }: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="section-container">
        <h2 className="section-title mx-auto">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 card animate-slide-in-left">
            <h3 className="text-2xl font-bold mb-4 gradient-text">MCA Student & Creative Developer</h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              I'm currently pursuing my Master's in Computer Applications at MIT-WPU, 
              where I combine my technical knowledge with creative design principles to build
              innovative solutions.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              With experience in AI tools, web development, and game design, I specialize in creating
              engaging and functional digital experiences. My background in graphic design enhances
              my technical work with a keen eye for aesthetics and user experience.
            </p>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">Technologies I work with:</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: skill.color + '20', 
                      color: skill.color,
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="card p-0 overflow-hidden animate-slide-in-right">
            <div className="h-full bg-gradient-to-br from-portfolio-purple to-portfolio-blue flex items-center justify-center p-8">
              <div className="text-white text-center">
                <h3 className="text-xl font-bold mb-4">Let's Connect!</h3>
                <p className="mb-6">I'm always interested in new projects and opportunities.</p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://github.com/Vipul7620" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Github size={24} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/vipul-vadhe/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
