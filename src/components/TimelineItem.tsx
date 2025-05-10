
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  title: string;
  duration: string;
  description: string;
  index: number;
  isLeft?: boolean;
}

const TimelineItem = ({ title, duration, description, index, isLeft = false }: TimelineItemProps) => {
  return (
    <div className={cn(
      "relative mb-8 md:mb-0 md:flex w-full",
      isLeft ? "md:justify-end" : "md:justify-start"
    )}>
      {/* Timeline dot */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-portfolio-purple z-10"></div>
      
      {/* Timeline line */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 dark:bg-gray-700 -z-10"></div>
      
      {/* Content card */}
      <div 
        className={cn(
          "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md w-full md:w-[calc(50%-20px)]",
          "animate-fade-in opacity-0",
          isLeft ? "md:mr-6" : "md:ml-6"
        )}
        style={{ animationDelay: `${index * 200}ms`, animationFillMode: "forwards" }}
      >
        <div className="flex flex-col">
          <h3 className="font-bold text-xl mb-1">{title}</h3>
          <span className="text-sm text-portfolio-purple dark:text-portfolio-purple mb-3">{duration}</span>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
