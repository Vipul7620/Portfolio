
import ProjectCard from "@/components/ProjectCard";

interface Tech {
  name: string;
  color: string;
}

interface Project {
  title: string;
  description: string;
  techStack: Tech[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="section-container">
        <h2 className="section-title mx-auto">My Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
