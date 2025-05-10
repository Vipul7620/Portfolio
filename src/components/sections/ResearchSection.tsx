
const ResearchSection = () => {
  return (
    <section id="research" className="py-20 px-4">
      <div className="section-container">
        <h2 className="section-title mx-auto">Research</h2>
        
        <div className="mt-12">
          <div className="card max-w-3xl mx-auto animated-border animate-scale-up">
            <h3 className="text-2xl font-bold mb-3">AI-Driven Personalized Healthcare with Wearables</h3>
            <span className="text-sm text-portfolio-purple dark:text-portfolio-purple mb-4 inline-block">In Publishing Stage</span>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Research on integrating artificial intelligence with wearable technology for health monitoring 
              and disease prediction. This work explores how AI can process data from wearable devices to 
              provide personalized healthcare insights while maintaining privacy standards.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm rounded-full">Data privacy</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm rounded-full">AI insights</span>
              <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-sm rounded-full">Real-time analytics</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
