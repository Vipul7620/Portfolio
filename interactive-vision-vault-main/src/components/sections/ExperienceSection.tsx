
import TimelineItem from "@/components/TimelineItem";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="section-container">
        <h2 className="section-title mx-auto">Experience</h2>
        
        <div className="mt-12">
          <div className="relative">
            {/* Timeline container */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700"></div>
            
            {/* Timeline items */}
            <div className="space-y-8 md:space-y-16 relative">
              <TimelineItem 
                title="Design and Development Intern"
                duration="January 2025 - June 2025 • Koushiki Innovision"
                description="Designed interactive dice themes, implemented multi-dice mechanics, and added educational value to game projects. Worked closely with the development team to ensure smooth integration of design elements."
                index={0}
                isLeft={false}
              />
              
              {/* Add more timeline items here if needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
