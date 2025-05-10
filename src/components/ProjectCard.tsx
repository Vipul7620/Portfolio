
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Tech {
  name: string;
  color: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: Tech[];
  image?: string;
  delay: number;
}

const ProjectCard = ({ title, description, techStack, image, delay }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "animated-border group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-1 h-full transition-all duration-300",
        "animate-fade-in opacity-0",
        "hover:shadow-xl hover:-translate-y-1"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg h-full overflow-hidden p-5 z-10 relative">
        <div className="flex flex-col h-full">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{ backgroundColor: tech.color + '30', color: tech.color }}
                >
                  {tech.name}
                </span>
              ))}
            </div>


          </div>
        </div>

        {/* Animated particles */}
        <div className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="particle animate-particle-move"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: [
                  "#8b5cf6", "#3b82f6", "#14b8a6", "#ec4899", "#f97316", "#eab308"
                ][Math.floor(Math.random() * 6)],
                animationDuration: `${Math.random() * 5 + 10}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
